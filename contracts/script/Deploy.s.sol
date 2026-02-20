// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {RegenMemberNFT} from "../src/RegenMemberNFT.sol";

/**
 * @title Deploy
 * @notice Deployment script for RegenMemberNFT.
 *
 * Usage:
 *   # Base Sepolia (testnet)
 *   forge script script/Deploy.s.sol --rpc-url base_sepolia --broadcast --verify -vvvv
 *
 *   # Base Mainnet
 *   forge script script/Deploy.s.sol --rpc-url base_mainnet --broadcast --verify -vvvv
 *
 * Required env vars:
 *   DEPLOYER_PRIVATE_KEY  - private key of deployer wallet
 *   OWNER_ADDRESS         - address that will own the contract (can differ from deployer)
 *   BASE_URI              - IPFS base URI e.g. "ipfs://QmXxx/"
 *   BASE_SEPOLIA_RPC_URL  - Alchemy/Infura RPC
 *   BASE_MAINNET_RPC_URL  - Alchemy/Infura RPC
 *   BASESCAN_API_KEY      - for contract verification
 */
contract Deploy is Script {
    function run() external returns (RegenMemberNFT nft) {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address owner = vm.envAddress("OWNER_ADDRESS");
        string memory baseURI = vm.envString("BASE_URI");

        vm.startBroadcast(deployerPrivateKey);

        nft = new RegenMemberNFT(owner, baseURI);

        vm.stopBroadcast();

        console2.log("RegenMemberNFT deployed at:", address(nft));
        console2.log("Owner:", owner);
        console2.log("Base URI:", baseURI);
        console2.log("Chain ID:", block.chainid);
    }
}
