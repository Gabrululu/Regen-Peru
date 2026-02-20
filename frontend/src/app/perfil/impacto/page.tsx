"use client";

import dynamic from "next/dynamic";

const ImpactDashboard = dynamic(() => import("@/components/web3/ImpactDashboard"), {
    ssr: false,
});

export default function ImpactoPage() {
    return (
        <main className="min-h-screen pt-24 pb-20 bg-cream">
            <ImpactDashboard />
        </main>
    );
}
