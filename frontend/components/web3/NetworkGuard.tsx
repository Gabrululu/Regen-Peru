"use client";

import React from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { base } from "wagmi/chains";
import { AlertTriangle, Zap } from "lucide-react";
import { CHAIN_ID } from "@/lib/contracts";

interface NetworkGuardProps {
    children: React.ReactNode;
}

export function NetworkGuard({ children }: NetworkGuardProps) {
    const { isConnected, chain } = useAccount();
    const { switchChain, isPending } = useSwitchChain();

    // If not connected or on the right chain, render children
    if (!isConnected || chain?.id === CHAIN_ID) {
        return <>{children}</>;
    }

    return (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-outfit font-semibold text-charcoal mb-1">
                Red incorrecta
            </h3>
            <p className="text-sm text-charcoal/60 mb-4">
                Regen Peru funciona en la red{" "}
                <strong className="text-charcoal">Base</strong>. Actualmente estás
                conectado a{" "}
                <strong className="text-amber-700">{chain?.name ?? "una red desconocida"}</strong>.
            </p>
            <button
                onClick={() => switchChain({ chainId: base.id })}
                disabled={isPending}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-500 hover:bg-forest-600 text-white text-sm font-semibold transition-all disabled:opacity-60 shadow-forest"
            >
                <Zap className="w-4 h-4" />
                {isPending ? "Cambiando red…" : "Cambiar a Base"}
            </button>
        </div>
    );
}
