"use client";

import { useAccount } from "wagmi";
import { useReadContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NFTCard } from "@/components/web3/NFTCard";
import { CONTRACT_ADDRESSES, REGEN_NFT_ABI } from "@/lib/contracts";
import { formatAddress } from "@/lib/utils";
import { Vote, TrendingUp, Calendar, Award } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const MOCK_VOTE_HISTORY = [
    { proposalId: "1", title: "Reforestación en los Humedales de VMT", choice: "A favor", date: "15 Feb 2026" },
    { proposalId: "2", title: "Biblioteca Comunitaria en SJM", choice: "A favor", date: "10 Feb 2026" },
    { proposalId: "4", title: "Talleres de Emprendimiento para Mujeres", choice: "A favor", date: "8 Feb 2026" },
    { proposalId: "5", title: "Limpieza de Playas en La Costa Verde", choice: "Abstención", date: "2 Feb 2026" },
];

export default function PerfilPage() {
    const { address, isConnected } = useAccount();

    const { data: isMember } = useReadContract({
        address: CONTRACT_ADDRESSES.base,
        abi: REGEN_NFT_ABI,
        functionName: "isMember",
        args: address ? [address] : undefined,
        query: { enabled: !!address },
    });

    const { data: totalMinted } = useReadContract({
        address: CONTRACT_ADDRESSES.base,
        abi: REGEN_NFT_ABI,
        functionName: "totalMinted",
    });

    if (!isConnected) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-b from-white to-green-50/30 pt-24 flex items-center justify-center px-4">
                <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50/30 rounded-3xl border-2 border-green-100 p-12 text-center max-w-md w-full shadow-2xl shadow-green-500/10">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                        <Award className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="font-outfit font-bold text-3xl text-gray-900 mb-3">
                        Conecta tu wallet
                    </h1>
                    <p className="text-gray-700 text-base mb-8 leading-relaxed">
                        Conecta tu wallet para ver tu perfil de miembro y tu historial de
                        participación.
                    </p>
                    <div className="flex justify-center">
                        <ConnectButton label="Conectar Wallet" />
                    </div>
                </div>
            </div>
            <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-cream pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile header */}
                <div className="flex items-start gap-6 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-forest-400 to-forest-700 flex items-center justify-center shadow-forest shrink-0">
                        <span className="text-white text-2xl font-outfit font-bold">
                            {address?.slice(2, 4).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <h1 className="font-outfit font-bold text-3xl text-charcoal mb-1">
                            Mi Perfil
                        </h1>
                        <p className="text-charcoal/70 font-mono text-sm">
                            {formatAddress(address!)}
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: NFT + Stats */}
                    <div className="space-y-6">
                        <NFTCard />

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Vote, label: "Votos emitidos", value: isMember ? MOCK_VOTE_HISTORY.length.toString() : "0" },
                                { icon: TrendingUp, label: "Participación", value: isMember ? "89%" : "–" },
                                { icon: Calendar, label: "Miembro desde", value: "Feb 2026" },
                                { icon: Award, label: "Total miembros", value: totalMinted?.toString() ?? "–" },
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="bg-white rounded-2xl border border-forest-100 p-4">
                                    <Icon className="w-4 h-4 text-forest-500 mb-2" />
                                    <p className="text-xl font-outfit font-bold text-charcoal">{value}</p>
                                    <p className="text-xs text-charcoal/60 mt-0.5">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Vote history */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl border border-forest-100 p-6">
                            <h2 className="font-outfit font-bold text-xl text-charcoal mb-6">
                                Historial de Votación
                            </h2>

                            {!isMember ? (
                                <div className="text-center py-8">
                                    <Vote className="w-8 h-8 text-forest-300 mx-auto mb-3" />
                                    <p className="text-charcoal/70">
                                        Necesitas un NFT de membresía para participar en votaciones.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {MOCK_VOTE_HISTORY.map((vote) => (
                                        <div
                                            key={vote.proposalId}
                                            className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-forest-50 transition-colors"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-charcoal truncate">
                                                    {vote.title}
                                                </p>
                                                <p className="text-xs text-charcoal/60 mt-0.5">{vote.date}</p>
                                            </div>
                                            <span
                                                className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${vote.choice === "A favor"
                                                    ? "bg-forest-50 text-forest-700 border border-forest-200"
                                                    : vote.choice === "En contra"
                                                        ? "bg-red-50 text-red-700 border border-red-200"
                                                        : "bg-gray-100 text-gray-600 border border-gray-200"
                                                    }`}
                                            >
                                                {vote.choice}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Impact section */}
                        {isMember && (
                            <div className="mt-6 bg-gradient-to-br from-forest-600 to-forest-900 rounded-3xl p-6 relative overflow-hidden">
                                <div className="orb w-48 h-48 bg-forest-400 -top-12 -right-12" />
                                <div className="relative z-10">
                                    <p className="text-forest-200 text-sm mb-1">Tu impacto acumulado</p>
                                    <h3 className="font-outfit font-bold text-white text-2xl mb-4">
                                        Has participado en 4 proyectos
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {["🌱 500 árboles", "📚 200 niños", "🏥 1,000 familias", "♻️ 2 toneladas"].map((tag) => (
                                            <span key={tag} className="text-xs bg-white/10 text-white px-3 py-1.5 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}
