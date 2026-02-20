"use client";

import { useAccount, useReadContract, useSwitchChain, useChainId } from "wagmi";
import { useState } from "react";
import { ArrowLeft, Users, Clock, CheckCircle2, ExternalLink, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import Link from "next/link";
import { REGEN_NFT_ABI, CONTRACT_ADDRESSES } from "@/lib/contracts"; // Uses 0xE078...
import { NetworkGuard } from "@/components/web3/NetworkGuard";
import { formatAddress } from "@/lib/utils";
import { SnapshotProposal, SnapshotVote, castVote } from "@/lib/snapshot";
import { useEthersSigner } from "@/lib/ethers-adapter";
import { toast } from "sonner";

// Helper to calculate vote percentage
const getVotePct = (proposal: SnapshotProposal, index: number) =>
    proposal.scores_total
        ? Math.round((proposal.scores[index] / proposal.scores_total) * 100)
        : 0;

export default function ProposalDetailClient({ proposal, votes }: { proposal: SnapshotProposal; votes: SnapshotVote[] }) {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const { switchChain } = useSwitchChain();
    const signer = useEthersSigner({ chainId }); // Adapter for snapshot.js (requires Ethers signer)

    const [voted, setVoted] = useState<number | null>(null);
    const [voting, setVoting] = useState(false);

    // Check membership on Base Sepolia (84532)
    const { data: isMember } = useReadContract({
        address: CONTRACT_ADDRESSES.base,
        abi: REGEN_NFT_ABI,
        functionName: "isMember",
        args: address ? [address] : undefined,
        chainId: 84532,
        query: { enabled: !!address },
    });

    const daysLeft = Math.max(0, Math.ceil((proposal.end - Date.now() / 1000) / 86400));

    const handleVote = async (choiceIndex: number) => {
        if (!isConnected) return;

        // Ensure user is on Base Sepolia before voting? 
        // Snapshot voting is off-chain (signature), so chain ID technically doesn't matter for the signature itself 
        // BUT we need the signer.

        if (!isMember) {
            toast.error("No eres miembro de la DAO", {
                description: "Necesitas el NFT de membresía para votar.",
            });
            return;
        }

        if (!signer) {
            toast.error("Error de conexión", {
                description: "No se pudo obtener el firmante. Intenta reconectar tu wallet.",
            });
            return;
        }

        setVoting(true);
        const toastId = toast.loading("Registrando tu voto...");
        try {
            // choiceIndex is 1-based in Snapshot for single-choice
            await castVote(signer.provider, address!, proposal.id, choiceIndex + 1);
            setVoted(choiceIndex);
            toast.success("¡Voto registrado!", {
                id: toastId,
                description: `Has votado por: ${proposal.choices[choiceIndex]}`,
            });
        } catch (err: any) {
            console.error("Voting failed:", err);
            toast.error("Error al votar", {
                id: toastId,
                description: err.message || "Ocurrió un error inesperado.",
            });
        } finally {
            setVoting(false);
        }
    };

    // Check if user already voted in the fetched votes list
    // (Optimization: we could check this on mount)
    // const userVote = votes.find(v => v.voter.toLowerCase() === address?.toLowerCase());

    return (
        <div className="min-h-screen bg-cream pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back */}
                <Link
                    href="/propuestas"
                    className="inline-flex items-center gap-2 text-sm text-charcoal/90 hover:text-forest-600 transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver a Propuestas
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main content */}
                    <div className="lg:col-span-2">
                        {/* Header */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-forest-50 text-forest-700 border border-forest-100">
                                Propuesta
                            </span>
                            {proposal.state === "active" ? (
                                <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    Votación activa
                                </span>
                            ) : (
                                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                                    {proposal.state === "closed" ? "Cerrada" : "Pendiente"}
                                </span>
                            )}
                        </div>

                        <h1 className="font-outfit font-bold text-3xl sm:text-4xl text-charcoal mb-6 leading-tight">
                            {proposal.title}
                        </h1>

                        {/* Metadata bar */}
                        <div className="flex flex-wrap gap-4 mb-8 py-4 border-y border-gray-100 text-sm text-charcoal/80">
                            <span className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                {proposal.votes} votos
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {daysLeft > 0 ? `${daysLeft} días restantes` : "Cerrada"}
                            </span>
                            <a
                                href={`https://snapshot.box/#/${process.env.NEXT_PUBLIC_SNAPSHOT_SPACE}/proposal/${proposal.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-forest-600 transition-colors ml-auto"
                            >
                                Ver en Snapshot <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>

                        {/* Body - Basic Markdown Rendering */}
                        <div className="prose prose-sm prose-forest max-w-none text-charcoal/80 leading-relaxed whitespace-pre-wrap">
                            {proposal.body}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        {/* Vote results */}
                        <div className="bg-white rounded-3xl border border-forest-100 p-6">
                            <h2 className="font-outfit font-semibold text-charcoal mb-5 text-lg">
                                Resultados
                            </h2>
                            <div className="space-y-4">
                                {proposal.choices.map((choice, idx) => {
                                    const pct = getVotePct(proposal, idx);
                                    return (
                                        <div key={choice}>
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span className="flex items-center gap-1.5 text-sm text-charcoal/90">
                                                    {/* Simple icon logic based on index or labels could be added here */}
                                                    {choice}
                                                </span>
                                                <span className="text-sm font-semibold text-charcoal">
                                                    {pct}%
                                                </span>
                                            </div>
                                            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full bg-forest-500 transition-all duration-700`}
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="text-xs text-charcoal/80 mt-4 text-center">
                                {proposal.votes} votos totales
                            </p>
                        </div>

                        {/* Vote buttons */}
                        <div className="bg-white rounded-3xl border border-forest-100 p-6">
                            <h2 className="font-outfit font-semibold text-charcoal mb-2 text-lg">
                                Emitir voto
                            </h2>
                            {!isConnected ? (
                                <p className="text-sm text-charcoal/80">
                                    Conecta tu wallet para votar.
                                </p>
                            ) : !isMember ? (
                                <p className="text-sm text-charcoal/80">
                                    Necesitas un NFT de membresía para votar.{" "}
                                    <a href="https://t.me/RegenPeru" target="_blank" className="text-forest-600 hover:underline">
                                        Solicitar →
                                    </a>
                                </p>
                            ) : voted !== null ? (
                                <div className="flex items-center gap-2 text-forest-700 bg-forest-50 rounded-2xl p-4">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <div>
                                        <p className="font-semibold text-sm">¡Voto registrado!</p>
                                        <p className="text-xs text-charcoal/90">
                                            Votaste: {proposal.choices[voted]}
                                        </p>
                                    </div>
                                </div>
                            ) : proposal.state !== "active" ? (
                                <p className="text-sm text-charcoal/80">
                                    La votación está cerrada.
                                </p>
                            ) : (
                                <div className="space-y-2.5 mt-4">


                                    {proposal.choices.map((choice, idx) => (
                                        <button
                                            key={choice}
                                            onClick={() => handleVote(idx)}
                                            disabled={voting}
                                            className="w-full py-3 px-4 rounded-2xl text-sm font-semibold transition-all border bg-white border-gray-200 text-charcoal hover:bg-forest-50 hover:border-forest-200 hover:text-forest-700 disabled:opacity-50"
                                        >
                                            {voting ? "Firmando..." : choice}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Author info */}
                        <div className="bg-white rounded-3xl border border-forest-100 p-6 space-y-4 text-sm">
                            <div>
                                <p className="text-xs text-charcoal/80 uppercase tracking-wider mb-0.5">Propuesto por</p>
                                <p className="text-charcoal/80 break-all">{formatAddress(proposal.author)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-charcoal/80 uppercase tracking-wider mb-0.5">Inicio</p>
                                <p className="text-charcoal/80">{new Date(proposal.start * 1000).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-charcoal/80 uppercase tracking-wider mb-0.5">Fin</p>
                                <p className="text-charcoal/80">{new Date(proposal.end * 1000).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
