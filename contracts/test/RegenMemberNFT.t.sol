// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import {RegenMemberNFT} from "../src/RegenMemberNFT.sol";

contract RegenMemberNFTTest is Test {
    RegenMemberNFT public nft;

    address public owner = address(0x1);
    address public alice = address(0x2);
    address public bob = address(0x3);
    address public carol = address(0x4);

    string constant BASE_URI = "ipfs://QmTestHash/";

    function setUp() public {
        vm.prank(owner);
        nft = new RegenMemberNFT(owner, BASE_URI);
    }

    // ─────────────────────────────────────────────
    //  Deployment
    // ─────────────────────────────────────────────

    function test_Deployment() public view {
        assertEq(nft.name(), "Regen Peru Member");
        assertEq(nft.symbol(), "REGEN");
        assertEq(nft.owner(), owner);
        assertEq(nft.totalMinted(), 0);
        assertEq(nft.totalSupply(), 0);
    }

    // ─────────────────────────────────────────────
    //  Mint
    // ─────────────────────────────────────────────

    function test_Mint() public {
        vm.prank(owner);
        uint256 tokenId = nft.mint(alice);

        assertEq(tokenId, 1);
        assertEq(nft.ownerOf(1), alice);
        assertEq(nft.balanceOf(alice), 1);
        assertEq(nft.totalMinted(), 1);
        assertEq(nft.totalSupply(), 1);
        assertTrue(nft.isMember(alice));
    }

    function test_MintIncrements() public {
        vm.startPrank(owner);
        uint256 id1 = nft.mint(alice);
        uint256 id2 = nft.mint(bob);
        uint256 id3 = nft.mint(carol);
        vm.stopPrank();

        assertEq(id1, 1);
        assertEq(id2, 2);
        assertEq(id3, 3);
        assertEq(nft.totalMinted(), 3);
    }

    function test_Mint_RevertIfNotOwner() public {
        vm.prank(alice);
        vm.expectRevert();
        nft.mint(bob);
    }

    function test_Mint_RevertIfZeroAddress() public {
        vm.prank(owner);
        vm.expectRevert(RegenMemberNFT.InvalidRecipient.selector);
        nft.mint(address(0));
    }

    // ─────────────────────────────────────────────
    //  Batch Mint
    // ─────────────────────────────────────────────

    function test_MintBatch() public {
        address[] memory recipients = new address[](3);
        recipients[0] = alice;
        recipients[1] = bob;
        recipients[2] = carol;

        vm.prank(owner);
        nft.mintBatch(recipients);

        assertEq(nft.totalMinted(), 3);
        assertEq(nft.ownerOf(1), alice);
        assertEq(nft.ownerOf(2), bob);
        assertEq(nft.ownerOf(3), carol);
        assertTrue(nft.isMember(alice));
        assertTrue(nft.isMember(bob));
        assertTrue(nft.isMember(carol));
    }

    function test_MintBatch_RevertIfEmpty() public {
        address[] memory empty = new address[](0);
        vm.prank(owner);
        vm.expectRevert(RegenMemberNFT.EmptyBatch.selector);
        nft.mintBatch(empty);
    }

    function test_MintBatch_RevertIfNotOwner() public {
        address[] memory recipients = new address[](1);
        recipients[0] = bob;
        vm.prank(alice);
        vm.expectRevert();
        nft.mintBatch(recipients);
    }

    // ─────────────────────────────────────────────
    //  Soulbound: transfers must revert
    // ─────────────────────────────────────────────

    function test_Soulbound_TransferReverts() public {
        vm.prank(owner);
        nft.mint(alice);

        vm.prank(alice);
        vm.expectRevert(RegenMemberNFT.Soulbound__TransferNotAllowed.selector);
        nft.transferFrom(alice, bob, 1);
    }

    function test_Soulbound_SafeTransferReverts() public {
        vm.prank(owner);
        nft.mint(alice);

        vm.prank(alice);
        vm.expectRevert(RegenMemberNFT.Soulbound__TransferNotAllowed.selector);
        nft.safeTransferFrom(alice, bob, 1);
    }

    function test_Soulbound_ApproveAndTransferReverts() public {
        vm.prank(owner);
        nft.mint(alice);

        vm.startPrank(alice);
        nft.approve(bob, 1);
        vm.stopPrank();

        vm.prank(bob);
        vm.expectRevert(RegenMemberNFT.Soulbound__TransferNotAllowed.selector);
        nft.transferFrom(alice, bob, 1);
    }

    // ─────────────────────────────────────────────
    //  isMember
    // ─────────────────────────────────────────────

    function test_IsMember_False() public view {
        assertFalse(nft.isMember(alice));
    }

    function test_IsMember_True() public {
        vm.prank(owner);
        nft.mint(alice);
        assertTrue(nft.isMember(alice));
    }

    // ─────────────────────────────────────────────
    //  Token URI
    // ─────────────────────────────────────────────

    function test_TokenURI() public {
        vm.prank(owner);
        nft.mint(alice);

        string memory uri = nft.tokenURI(1);
        assertEq(uri, string(abi.encodePacked(BASE_URI, "1.json")));
    }

    function test_TokenURI_RevertForNonExistent() public {
        vm.expectRevert();
        nft.tokenURI(999);
    }

    function test_SetBaseURI() public {
        string memory newURI = "ipfs://QmNewHash/";
        vm.prank(owner);
        nft.setBaseURI(newURI);

        vm.prank(owner);
        nft.mint(alice);

        assertEq(nft.tokenURI(1), string(abi.encodePacked(newURI, "1.json")));
    }

    function test_SetBaseURI_RevertIfNotOwner() public {
        vm.prank(alice);
        vm.expectRevert();
        nft.setBaseURI("ipfs://hack/");
    }

    // ─────────────────────────────────────────────
    //  Enumerable
    // ─────────────────────────────────────────────

    function test_EnumerableTokenOfOwnerByIndex() public {
        vm.startPrank(owner);
        nft.mint(alice);
        nft.mint(alice);
        vm.stopPrank();

        assertEq(nft.tokenOfOwnerByIndex(alice, 0), 1);
        assertEq(nft.tokenOfOwnerByIndex(alice, 1), 2);
    }

    // ─────────────────────────────────────────────
    //  Supports Interface
    // ─────────────────────────────────────────────

    function test_SupportsERC721Interface() public view {
        assertTrue(nft.supportsInterface(0x80ac58cd)); // ERC721
        assertTrue(nft.supportsInterface(0x780e9d63)); // ERC721Enumerable
    }
}
