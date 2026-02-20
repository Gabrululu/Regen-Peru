"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Sprout, Leaf, Heart, BookOpen, Users } from "lucide-react";
import { SnapshotProposal } from "@/lib/snapshot";

const CATEGORIES = [
    { label: "Todas", value: "all", icon: Leaf },
    // For now, we only support "Todas" because Snapshot proposals don't have native categories
    // We could parse them from title tags e.g. [Eco] but let's keep it simple first
];

const STATE_STYLES: Record<string, { label: string; dot: string; badge: string }> = {
    active: { label: "Activa", dot: "bg-green-400", badge: "bg-green-50 text-green-700 border-green-200" },
    closed: { label: "Cerrada", dot: "bg-gray-400", badge: "bg-gray-50  text-gray-600  border-gray-200" },
    pending: { label: "Próxima", dot: "bg-amber-400", badge: "bg-amber-50 text-amber-700 border-amber-200" },
};

function ProposalCard({ proposal }: { proposal: SnapshotProposal }) {
    const forPct = proposal.scores_total
        ? Math.round((proposal.scores[0] / proposal.scores_total) * 100)
        : 0;

    // Snapshot states: 'active', 'closed', 'pending'
    const state = STATE_STYLES[proposal.state] ?? STATE_STYLES.closed;
    const daysLeft = Math.max(
        0,
        Math.ceil((proposal.end - Date.now() / 1000) / 86400)
    );

    return (
        <Link href={`/propuestas/${proposal.id}`} className="group block">
            <article className="bg-white rounded-3xl border border-forest-100 p-6 hover:border-forest-300 hover:shadow-card-hover transition-all duration-300 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-forest-50 text-forest-700 border border-forest-100">
                        Propuesta
                    </span>
                    <span
                        className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${state.badge}`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${state.dot} ${proposal.state === "active" ? "animate-pulse" : ""}`} />
                        {state.label}
                    </span>
                </div>

                {/* Title */}
                <h3 className="font-outfit font-semibold text-charcoal text-lg leading-snug mb-2 group-hover:text-forest-700 transition-colors line-clamp-2">
                    {proposal.title}
                </h3>
                <p className="text-sm text-charcoal/80 line-clamp-2 flex-1 mb-4">
                    {/* Basic markdown strip: remove hash, bold chars */}
                    {proposal.body.replace(/[#*`]/g, "").slice(0, 150)}...
                </p>

                {/* Vote bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-xs text-charcoal/80 mb-1">
                        <span>A favor: {forPct}%</span>
                        <span>{proposal.votes} votos</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-forest-400 to-forest-600 transition-all duration-700"
                            style={{ width: `${forPct}%` }}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-charcoal/80">
                    {proposal.state === "active" && daysLeft > 0 ? (
                        <span>{daysLeft} día{daysLeft !== 1 ? "s" : ""} restante{daysLeft !== 1 ? "s" : ""}</span>
                    ) : proposal.state === "pending" ? (
                        <span>Próximamente</span>
                    ) : (
                        <span>Votación cerrada</span>
                    )}
                    <span className="flex items-center gap-1 text-forest-600 font-medium group-hover:gap-2 transition-all">
                        Ver propuesta <ArrowRight className="w-3 h-3" />
                    </span>
                </div>
            </article>
        </Link>
    );
}

export default function PropuestasClient({ initialProposals }: { initialProposals: SnapshotProposal[] }) {
    const [activeState, setActiveState] = useState<"all" | "active" | "closed" | "pending">("all");

    const filtered = initialProposals.filter((p) => {
        const stateMatch = activeState === "all" || p.state === activeState;
        return stateMatch;
    });

    return (
        <div className="min-h-screen bg-cream pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 text-center sm:text-left">
                    <span className="text-xs font-semibold uppercase tracking-widest text-forest-500 bg-forest-50 px-3 py-1.5 rounded-full border border-forest-100">
                        Gobernanza
                    </span>
                    <h1 className="font-outfit font-bold text-4xl sm:text-5xl text-charcoal mt-4 mb-3">
                        Propuestas
                    </h1>
                    <p className="text-charcoal/80 max-w-xl text-lg mx-auto sm:mx-0">
                        Vota por los proyectos que transformarán comunidades en Perú. Cada
                        NFT de membresía equivale a un voto.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    {/* State filter */}
                    <div className="flex gap-2 justify-center sm:justify-start">
                        {(["all", "active", "closed", "pending"] as const).map((s) => (
                            <button
                                key={s}
                                onClick={() => setActiveState(s)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${activeState === s
                                    ? "bg-charcoal text-white"
                                    : "bg-white border border-gray-200 text-charcoal/80 hover:border-gray-400"
                                    }`}
                            >
                                {s === "all" ? "Todas" : STATE_STYLES[s]?.label ?? s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Count */}
                <p className="text-sm text-charcoal/70 mb-6">
                    {filtered.length} propuesta{filtered.length !== 1 ? "s" : ""} encontrada{filtered.length !== 1 ? "s" : ""}
                </p>

                {/* Grid */}
                {filtered.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((p) => (
                            <ProposalCard key={p.id} proposal={p} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <Leaf className="w-12 h-12 text-forest-400 mx-auto mb-4" />
                        <p className="text-charcoal/70 text-lg">
                            No hay propuestas con los filtros seleccionados.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
