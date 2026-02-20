"use client";

import dynamic from "next/dynamic";

const IssueBadgeForm = dynamic(() => import("@/components/admin/IssueBadgeForm"), {
    ssr: false,
});

export default function IssueBadgePage() {
    return (
        <main className="min-h-screen pt-24 pb-20 bg-cream">
            <IssueBadgeForm />
        </main>
    );
}
