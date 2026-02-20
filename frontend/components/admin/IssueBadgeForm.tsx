"use client";

import { useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { createAttestation } from "@/lib/eas";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { ethers } from "ethers";

export default function IssueBadgeForm() {
    const { isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    // Form state
    const [recipient, setRecipient] = useState("");
    const [eventName, setEventName] = useState("");
    const [role, setRole] = useState("Voluntario");
    const [hours, setHours] = useState(4);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

    const handleIssue = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!walletClient) return;

        setIsLoading(true);
        setStatus("idle");

        try {
            const provider = new ethers.BrowserProvider((window as any).ethereum);
            const signer = await provider.getSigner();

            // Format date to timestamp
            const timestamp = Math.floor(new Date(date).getTime() / 1000);

            // Mock call if no signer (for build/test without wallet) - but here we have signer
            const tx = await createAttestation(
                signer,
                recipient,
                eventName,
                role,
                hours,
                timestamp
            );

            console.log("Attestation created!", tx);
            setStatus("success");
        } catch (error) {
            console.error("Error issuing badge:", error);
            setStatus("error");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isConnected) {
        return (
            <div className="min-h-screen pt-24 flex justify-center bg-cream">
                <ConnectButton />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-3xl p-8 border border-forest-100 shadow-xl shadow-forest-900/5">
                <div className="mb-8">
                    <h1 className="font-outfit font-black text-3xl text-forest-900">
                        Emitir Certificado 🏅
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Herramienta para administradores. Emite una atestación on-chain (Soulbound) a un voluntario.
                    </p>
                </div>

                <form onSubmit={handleIssue} className="space-y-6">
                    {/* Recipient */}
                    <div>
                        <label className="block text-sm font-bold text-forest-900 mb-2">
                            Wallet del Voluntario
                        </label>
                        <input
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="0x..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-plant-500 focus:ring-2 focus:ring-plant-200 outline-none transition-all font-mono text-sm"
                            required
                        />
                    </div>

                    {/* Event Name */}
                    <div>
                        <label className="block text-sm font-bold text-forest-900 mb-2">
                            Nombre del Evento
                        </label>
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            placeholder="Ej: Limpieza de Playa..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-plant-500 focus:ring-2 focus:ring-plant-200 outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Role */}
                        <div>
                            <label className="block text-sm font-bold text-forest-900 mb-2">
                                Rol
                            </label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-plant-500 focus:ring-2 focus:ring-plant-200 outline-none transition-all"
                            >
                                <option value="Voluntario">Voluntario</option>
                                <option value="Organizador">Organizador</option>
                                <option value="Donante">Donante</option>
                                <option value="Speaker">Speaker</option>
                            </select>
                        </div>

                        {/* Hours */}
                        <div>
                            <label className="block text-sm font-bold text-forest-900 mb-2">
                                Horas
                            </label>
                            <input
                                type="number"
                                value={hours}
                                onChange={(e) => setHours(Number(e.target.value))}
                                min="1"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-plant-500 focus:ring-2 focus:ring-plant-200 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-bold text-forest-900 mb-2">
                            Fecha
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-plant-500 focus:ring-2 focus:ring-plant-200 outline-none transition-all"
                            required
                        />
                    </div>

                    {/* Status Messages */}
                    {status === "error" && (
                        <div className="p-4 rounded-xl bg-red-50 text-red-700 flex items-center gap-3">
                            <AlertCircle className="w-5 h-5" />
                            <div>
                                <p className="font-bold">Error al emitir</p>
                                <p className="text-sm">Verifica que tengas fondos en Base y seas admin.</p>
                            </div>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="p-4 rounded-xl bg-green-50 text-green-700 flex items-center gap-3">
                            <CheckCircle className="w-5 h-5" />
                            <div>
                                <p className="font-bold">¡Certificado Emitido!</p>
                                <p className="text-sm">La atestación se ha registrado correctamente.</p>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 rounded-xl bg-plant-600 text-white font-bold text-lg hover:bg-plant-700 active:scale-[0.98] transition-all shadow-lg shadow-plant-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Emitiendo...
                            </>
                        ) : (
                            "Emitir Certificado"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
