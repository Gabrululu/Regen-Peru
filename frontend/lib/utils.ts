import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatAddress(address: string): string {
    return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function formatDate(date: string | number): string {
    const d = new Date(typeof date === "number" ? date * 1000 : date);
    return d.toLocaleDateString("es-PE", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function formatRelativeTime(timestamp: number): string {
    const now = Date.now() / 1000;
    const diff = timestamp - now;
    const absDiff = Math.abs(diff);

    if (absDiff < 60) return "Ahora mismo";
    if (absDiff < 3600) return `${Math.floor(absDiff / 60)} min`;
    if (absDiff < 86400) return `${Math.floor(absDiff / 3600)} horas`;
    const days = Math.floor(absDiff / 86400);
    if (diff > 0) return `${days} día${days > 1 ? "s" : ""} restante${days > 1 ? "s" : ""}`;
    return `Hace ${days} día${days > 1 ? "s" : ""}`;
}

export function truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + "…";
}

export function getVotePercentage(forVotes: number, againstVotes: number, abstainVotes: number) {
    const total = forVotes + againstVotes + abstainVotes;
    if (total === 0) return { for: 0, against: 0, abstain: 0, total: 0 };
    return {
        for: Math.round((forVotes / total) * 100),
        against: Math.round((againstVotes / total) * 100),
        abstain: Math.round((abstainVotes / total) * 100),
        total,
    };
}

export function proposalStateLabel(state: string): {
    label: string;
    color: string;
    bg: string;
} {
    const map: Record<string, { label: string; color: string; bg: string }> = {
        active: { label: "Activa", color: "text-forest-700", bg: "bg-forest-100" },
        closed: { label: "Cerrada", color: "text-gray-600", bg: "bg-gray-100" },
        pending: { label: "Pendiente", color: "text-terra-600", bg: "bg-terra-100" },
        passed: { label: "Aprobada", color: "text-forest-700", bg: "bg-forest-100" },
        failed: { label: "Rechazada", color: "text-red-600", bg: "bg-red-50" },
    };
    return map[state] ?? { label: state, color: "text-gray-600", bg: "bg-gray-100" };
}
