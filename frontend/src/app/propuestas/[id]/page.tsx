import { getProposal, getVotes } from "@/lib/snapshot";
import ProposalDetailClient from "./ProposalDetailClient";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProposalDetailPage({ params }: { params: { id: string } }) {
    const proposal = await getProposal(params.id);
    const votes = proposal ? await getVotes(proposal.id) : [];

    if (!proposal) {
        return (
            <div className="min-h-screen bg-cream pt-24 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-charcoal/70 text-lg mb-4">Propuesta no encontrada</p>
                    <Link href="/propuestas" className="text-forest-600 hover:underline">
                        ← Volver a propuestas
                    </Link>
                </div>
            </div>
        );
    }

    return <ProposalDetailClient proposal={proposal} votes={votes} />;
}
