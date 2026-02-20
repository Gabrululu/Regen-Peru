"use client";

import { useAccount } from "wagmi";
import { ImpactBadge } from "@/components/web3/ImpactBadge";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";
import { toast } from "sonner";

// Mock data for initial development
// In production, this would be fetched via EAS SDK / GraphQL
const MOCK_ATTESTATIONS = [
    {
        id: "0x123...",
        eventName: "Limpieza de Playa Costa Verde",
        role: "Voluntario",
        hours: 4,
        date: "2023-11-15",
    },
    {
        id: "0x456...",
        eventName: "Reforestación Lomas de Lúcumo",
        role: "Organizador",
        hours: 8,
        date: "2023-10-01",
    },
    {
        id: "0x789...",
        eventName: "Taller de Compostaje Urbano",
        role: "Asistente",
        hours: 2,
        date: "2023-09-20",
    },
];

export default function ImpactDashboard() {
    const { isConnected } = useAccount();

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        toast.success("Perfil copiado al portapapeles");
    };

    if (!isConnected) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-cream px-4">
                <div className="text-center max-w-md">
                    <h1 className="font-outfit font-bold text-3xl text-forest-900 mb-4">
                        Conecta tu wallet 🌿
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Para ver tu historial de impacto y certificados, necesitas conectar tu billetera.
                    </p>
                    <div className="flex justify-center">
                        <ConnectButton />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <Link
                        href="/perfil"
                        className="inline-flex items-center text-sm font-medium text-forest-600 hover:text-forest-800 transition-colors mb-2"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Volver al perfil
                    </Link>
                    <h1 className="font-outfit font-black text-4xl text-forest-900">
                        Mi Impacto 🌍
                    </h1>
                    <p className="text-gray-600 mt-2 max-w-xl">
                        Tus contribuciones certificadas en la cadena de bloques.
                        Estos certificados son prueba inmutable de tu compromiso con la regeneración.
                    </p>
                </div>

                <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-forest-200 rounded-xl text-forest-700 font-bold hover:bg-forest-50 transition-colors shadow-sm active:scale-95"
                >
                    <Share2 className="w-4 h-4" />
                    Compartir Perfil
                </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-2xl border border-plant-100 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                        Horas Totales
                    </p>
                    <p className="font-outfit font-black text-3xl text-plant-600">
                        14h
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-plant-100 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                        Eventos
                    </p>
                    <p className="font-outfit font-black text-3xl text-plant-600">
                        3
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-plant-100 shadow-sm">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                        Reputación
                    </p>
                    <p className="font-outfit font-black text-3xl text-plant-600">
                        Nivel 2
                    </p>
                </div>
            </div>

            {/* Certificates Grid */}
            <div>
                <h2 className="font-outfit font-bold text-2xl text-forest-900 mb-6 flex items-center gap-2">
                    Certificados Digitales
                    <span className="bg-plant-100 text-plant-700 text-xs px-2 py-0.5 rounded-full">
                        {MOCK_ATTESTATIONS.length}
                    </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_ATTESTATIONS.map((attestation) => (
                        <ImpactBadge
                            key={attestation.id}
                            id={attestation.id}
                            eventName={attestation.eventName}
                            role={attestation.role}
                            hours={attestation.hours}
                            date={attestation.date}
                        />
                    ))}
                </div>

                {MOCK_ATTESTATIONS.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                        <p className="text-gray-400 font-medium">
                            Aún no tienes certificados. ¡Participa en un evento para ganar el primero!
                        </p>
                        <Link
                            href="/voluntariado"
                            className="inline-block mt-4 px-6 py-2 bg-plant-600 text-white font-bold rounded-full hover:bg-plant-700 transition-colors"
                        >
                            Ver Oportunidades
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
