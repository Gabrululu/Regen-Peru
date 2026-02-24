import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getProposals } from "@/lib/snapshot";
import PropuestasClient from "./PropuestasClient";

// Force dynamic rendering if we want fresh data on every request,
// or let Next.js cache it based on the fetch config in snapshot.ts (ISR 60s)
export const dynamic = "force-dynamic";

export default async function PropuestasPage() {
    // Fetch proposals from Snapshot API
    const proposals = await getProposals();

    return (
        <>
            <Navbar />
            <PropuestasClient initialProposals={proposals} />
            <Footer />
        </>
    );
}
