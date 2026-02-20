
import {
    EAS,
    Offchain,
    SchemaEncoder,
    SchemaRegistry,
} from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";

export const EAS_CONTRACT_ADDRESS = "0x4200000000000000000000000000000000000021"; // Base Mainnet
export const SCHEMA_REGISTRY_CONTRACT_ADDRESS =
    "0x4200000000000000000000000000000000000020";

// Schema UID for "Volunteer Certificate"
// Schema: string eventName, string role, uint256 hours, uint256 date
export const VOLUNTEER_SCHEMA_UID =
    "0x0000000000000000000000000000000000000000000000000000000000000000"; // TODO: Register real schema

export async function getEAS(signer?: ethers.Signer) {
    const eas = new EAS(EAS_CONTRACT_ADDRESS);
    if (signer) {
        eas.connect(signer);
    }
    return eas;
}

export async function createAttestation(
    signer: ethers.Signer,
    recipient: string,
    eventName: string,
    role: string,
    hours: number,
    date: number
) {
    const eas = await getEAS(signer);
    const schemaEncoder = new SchemaEncoder(
        "string eventName, string role, uint256 hours, uint256 date"
    );
    const encodedData = schemaEncoder.encodeData([
        { name: "eventName", value: eventName, type: "string" },
        { name: "role", value: role, type: "string" },
        { name: "hours", value: hours, type: "uint256" },
        { name: "date", value: date, type: "uint256" },
    ]);

    const tx = await eas.attest({
        schema: VOLUNTEER_SCHEMA_UID,
        data: {
            recipient,
            expirationTime: BigInt(0),
            revocable: true,
            data: encodedData,
        },
    });

    return await tx.wait();
}
