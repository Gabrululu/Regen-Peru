"use client";

import { useAccount, useReadContract } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { Leaf, Award, ExternalLink } from "lucide-react";
import { REGEN_NFT_ABI, CONTRACT_ADDRESSES } from "@/lib/contracts";
import { formatAddress } from "@/lib/utils";

interface NFTCardProps {
    minimal?: boolean;
}

export function NFTCard({ minimal = false }: NFTCardProps) {
    const { address, chain, isConnected } = useAccount();

    const contractAddress =
        chain?.id === baseSepolia.id
            ? CONTRACT_ADDRESSES.baseSepolia
            : CONTRACT_ADDRESSES.base;

    const { data: isMember, isLoading: checkingMembership } = useReadContract({
        address: contractAddress,
        abi: REGEN_NFT_ABI,
        functionName: "isMember",
        args: address ? [address] : undefined,
        query: { enabled: !!address },
    });

    const { data: tokenId } = useReadContract({
        address: contractAddress,
        abi: REGEN_NFT_ABI,
        functionName: "tokenOfOwnerByIndex",
        args: address ? [address, BigInt(0)] : undefined,
        query: { enabled: !!address && !!isMember },
    });

    if (!isConnected) {
        return (
            <div className="rounded-3xl border-2 border-dashed border-forest-200 bg-forest-50/50 p-8 text-center">
                <Leaf className="w-10 h-10 text-forest-300 mx-auto mb-3" />
                <p className="text-charcoal/60 text-sm">
                    Conecta tu wallet para ver tu membresía
                </p>
            </div>
        );
    }

    if (checkingMembership) {
        return (
            <div className="rounded-3xl bg-gradient-to-br from-forest-100 to-forest-50 p-1 animate-pulse">
                <div className="rounded-3xl bg-white/60 p-6 h-48 flex items-center justify-center">
                    <div className="skeleton w-32 h-4 rounded-full" />
                </div>
            </div>
        );
    }

    if (!isMember) {
        return (
            <div className="rounded-3xl border-2 border-dashed border-terra-200 bg-terra-50/50 p-8 text-center">
                <Award className="w-10 h-10 text-terra-300 mx-auto mb-3" />
                <p className="font-outfit font-semibold text-charcoal mb-1">
                    Aún no eres miembro
                </p>
                <p className="text-charcoal/60 text-sm mb-4">
                    Solicita tu NFT de membresía para participar en las votaciones
                </p>
                <a
                    href="https://t.me/RegenPeru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-terra-400 hover:bg-terra-500 text-white text-sm font-medium transition-colors"
                >
                    Solicitar membresía
                    <ExternalLink className="w-3 h-3" />
                </a>
            </div>
        );
    }

    if (minimal) {
        return (
            <div className="flex items-center gap-3 bg-forest-50 rounded-2xl px-4 py-3">
                <div className="w-8 h-8 rounded-lg bg-forest-500 flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-white" />
                </div>
                <div>
                    <p className="text-xs text-charcoal/60">Miembro REGEN</p>
                    <p className="text-sm font-semibold text-forest-700">
                        #{tokenId?.toString() ?? "–"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-3xl bg-gradient-to-br from-forest-600 to-forest-900 p-1 shadow-forest">
            <div className="rounded-[22px] bg-gradient-to-br from-forest-800 to-forest-950 p-6 relative overflow-hidden">
                {/* Decorative orb */}
                <div className="orb w-48 h-48 bg-forest-400 -top-12 -right-12" />
                <div className="orb w-32 h-32 bg-terra-400 bottom-0 left-8" />

                {/* Card content */}
                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <p className="text-forest-300 text-xs uppercase tracking-widest mb-1">
                                Membresía DAO
                            </p>
                            <h3 className="font-outfit font-bold text-white text-xl">
                                Regen Peru Member
                            </h3>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                    </div>

                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-forest-400 text-xs mb-1">Titular</p>
                            <p className="text-white font-mono text-sm">
                                {address ? formatAddress(address) : "–"}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-forest-400 text-xs mb-1">Token ID</p>
                            <p className="text-white font-outfit font-bold text-2xl">
                                #{tokenId?.toString() ?? "–"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />
                        <span className="text-xs text-green-400">Membresía activa · 1 voto</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
