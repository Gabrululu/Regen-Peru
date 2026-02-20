// Contract ABI for RegenMemberNFT
export const REGEN_NFT_ABI = [
    // Read functions
    {
        name: "name",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "string" }],
    },
    {
        name: "symbol",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "string" }],
    },
    {
        name: "balanceOf",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "owner", type: "address" }],
        outputs: [{ name: "", type: "uint256" }],
    },
    {
        name: "ownerOf",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "tokenId", type: "uint256" }],
        outputs: [{ name: "", type: "address" }],
    },
    {
        name: "tokenURI",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "tokenId", type: "uint256" }],
        outputs: [{ name: "", type: "string" }],
    },
    {
        name: "totalSupply",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "uint256" }],
    },
    {
        name: "totalMinted",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ name: "", type: "uint256" }],
    },
    {
        name: "isMember",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "account", type: "address" }],
        outputs: [{ name: "", type: "bool" }],
    },
    {
        name: "tokenOfOwnerByIndex",
        type: "function",
        stateMutability: "view",
        inputs: [
            { name: "owner", type: "address" },
            { name: "index", type: "uint256" },
        ],
        outputs: [{ name: "", type: "uint256" }],
    },
    // Write functions (owner only)
    {
        name: "mint",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [{ name: "to", type: "address" }],
        outputs: [{ name: "tokenId", type: "uint256" }],
    },
    {
        name: "mintBatch",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [{ name: "recipients", type: "address[]" }],
        outputs: [],
    },
    {
        name: "setBaseURI",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [{ name: "baseURI_", type: "string" }],
        outputs: [],
    },
    // Events
    {
        name: "MemberMinted",
        type: "event",
        inputs: [
            { name: "to", type: "address", indexed: true },
            { name: "tokenId", type: "uint256", indexed: true },
        ],
    },
    {
        name: "Transfer",
        type: "event",
        inputs: [
            { name: "from", type: "address", indexed: true },
            { name: "to", type: "address", indexed: true },
            { name: "tokenId", type: "uint256", indexed: true },
        ],
    },
] as const;

// Contract addresses per network
export const CONTRACT_ADDRESSES = {
    base: (process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ?? "0x0000000000000000000000000000000000000000") as `0x${string}`,
    baseSepolia: (process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ?? "0x0000000000000000000000000000000000000000") as `0x${string}`,
} as const;

export const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 8453);

// Chain names
export const CHAIN_NAMES: Record<number, string> = {
    8453: "Base",
    84532: "Base Sepolia",
};
