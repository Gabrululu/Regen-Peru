// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title RegenMemberNFT
 * @author Regen Peru DAO
 * @notice Soulbound ERC-721 membership NFT for Regen Peru DAO.
 *         Each NFT represents one voting right on Snapshot.
 *         Tokens are non-transferable (soulbound) — once minted, they
 *         are permanently bound to the recipient's address.
 *
 * @dev Inherits OpenZeppelin ERC721, ERC721Enumerable, and Ownable.
 *      Transfer overrides block all transfers except mint (from == address(0)).
 */
contract RegenMemberNFT is ERC721, ERC721Enumerable, Ownable {
    using Strings for uint256;

    // ─────────────────────────────────────────────
    //  Errors
    // ─────────────────────────────────────────────

    /// @notice Thrown when someone tries to transfer a soulbound token.
    error Soulbound__TransferNotAllowed();

    /// @notice Thrown when mint target is the zero address.
    error InvalidRecipient();

    /// @notice Thrown when the batch minting array is empty.
    error EmptyBatch();

    // ─────────────────────────────────────────────
    //  Events
    // ─────────────────────────────────────────────

    /// @notice Emitted when a single membership NFT is minted.
    event MemberMinted(address indexed to, uint256 indexed tokenId);

    /// @notice Emitted after a batch mint operation.
    event BatchMinted(uint256 count, uint256 firstTokenId, uint256 lastTokenId);

    /// @notice Emitted when baseURI is updated.
    event BaseURIUpdated(string newBaseURI);

    // ─────────────────────────────────────────────
    //  State
    // ─────────────────────────────────────────────

    /// @dev Internal counter for token IDs (starts at 1).
    uint256 private _nextTokenId;

    /// @dev IPFS base URI for metadata, e.g. "ipfs://QmXxx/"
    string private _baseTokenURI;

    // ─────────────────────────────────────────────
    //  Constructor
    // ─────────────────────────────────────────────

    /**
     * @param initialOwner  Address that will control mint/admin functions
     * @param baseURI_      IPFS base URI (can be updated later)
     */
    constructor(address initialOwner, string memory baseURI_)
        ERC721("Regen Peru Member", "REGEN")
        Ownable(initialOwner)
    {
        _baseTokenURI = baseURI_;
        _nextTokenId = 1; // Token IDs start at 1
    }

    // ─────────────────────────────────────────────
    //  Mint functions
    // ─────────────────────────────────────────────

    /**
     * @notice Mint a single membership NFT to a recipient.
     * @dev Only callable by the contract owner (or future multisig).
     * @param to Recipient address.
     */
    function mint(address to) external onlyOwner returns (uint256 tokenId) {
        if (to == address(0)) revert InvalidRecipient();
        tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        emit MemberMinted(to, tokenId);
    }

    /**
     * @notice Mint membership NFTs to multiple recipients at once.
     * @dev Only callable by the contract owner.
     * @param recipients Array of recipient addresses.
     */
    function mintBatch(address[] calldata recipients) external onlyOwner {
        uint256 len = recipients.length;
        if (len == 0) revert EmptyBatch();

        uint256 firstId = _nextTokenId;
        for (uint256 i = 0; i < len; i++) {
            if (recipients[i] == address(0)) revert InvalidRecipient();
            uint256 tokenId = _nextTokenId++;
            _safeMint(recipients[i], tokenId);
            emit MemberMinted(recipients[i], tokenId);
        }
        emit BatchMinted(len, firstId, _nextTokenId - 1);
    }

    // ─────────────────────────────────────────────
    //  Admin functions
    // ─────────────────────────────────────────────

    /**
     * @notice Update the IPFS base URI for token metadata.
     * @dev Only callable by the owner.
     * @param baseURI_ New base URI (e.g. "ipfs://QmNewHash/")
     */
    function setBaseURI(string calldata baseURI_) external onlyOwner {
        _baseTokenURI = baseURI_;
        emit BaseURIUpdated(baseURI_);
    }

    // ─────────────────────────────────────────────
    //  View functions
    // ─────────────────────────────────────────────

    /**
     * @notice Returns the total number of NFTs that will ever be minted.
     *         Since supply is uncapped but owner-controlled, this returns
     *         the current total supply via ERC721Enumerable.
     */
    function totalMinted() external view returns (uint256) {
        return _nextTokenId - 1;
    }

    /**
     * @notice Check if an address holds a membership NFT.
     */
    function isMember(address account) external view returns (bool) {
        return balanceOf(account) > 0;
    }

    // ─────────────────────────────────────────────
    //  Soulbound: block all transfers
    // ─────────────────────────────────────────────

    /**
     * @dev Override _update to block transfers.
     *      Mints (from == address(0)) and burns (to == address(0)) are allowed.
     *      All other transfers revert with Soulbound__TransferNotAllowed.
     */
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        address from = _ownerOf(tokenId);
        // Block transfers: allow only mint (from == 0) or burn (to == 0)
        if (from != address(0) && to != address(0)) {
            revert Soulbound__TransferNotAllowed();
        }
        return super._update(to, tokenId, auth);
    }

    // ─────────────────────────────────────────────
    //  Required overrides (ERC721Enumerable)
    // ─────────────────────────────────────────────

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // ─────────────────────────────────────────────
    //  Metadata
    // ─────────────────────────────────────────────

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        _requireOwned(tokenId);
        string memory base = _baseURI();
        return bytes(base).length > 0
            ? string(abi.encodePacked(base, tokenId.toString(), ".json"))
            : "";
    }
}
