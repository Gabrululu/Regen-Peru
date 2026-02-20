"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, MapPin, Clock, Users } from "lucide-react";

// Mock data for Dework tasks
const TASKS = [
    {
        id: "1",
        title: "Limpieza de Playa Costa Verde",
        description: "Únete a nosotros para limpiar 2km de playa. Trae guantes y buena energía.",
        location: "Costa Verde, San Miguel",
        date: "Sáb, 25 Nov - 09:00 AM",
        spots: 50,
        spotsFilled: 32,
        tokens: "50 REGEN",
        tags: ["Limpieza", "Presencial"],
        deworkUrl: "https://app.dework.xyz/", // Placeholder
    },
    {
        id: "2",
        title: "Diseño de Flyer para Evento",
        description: "Necesitamos un diseñador para crear los activos gráficos de nuestro próximo taller.",
        location: "Remoto",
        date: "Deadline: 20 Nov",
        spots: 2,
        spotsFilled: 0,
        tokens: "100 REGEN",
        tags: ["Diseño", "Remoto"],
        deworkUrl: "https://app.dework.xyz/",
    },
    {
        id: "3",
        title: "Taller Reforestación Urbana",
        description: "Ayúdanos a cavar hoyos y plantar 20 árboles nativos en el parque zonal.",
        location: "Parque Zonal Huáscar",
        date: "Dom, 26 Nov - 08:00 AM",
        spots: 20,
        spotsFilled: 15,
        tokens: "50 REGEN",
        tags: ["Reforestación", "Presencial"],
        deworkUrl: "https://app.dework.xyz/",
    },
];

export default function VoluntariadoPage() {
    return (
        <main className="min-h-screen pt-24 pb-20 bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="font-outfit font-black text-4xl sm:text-5xl text-forest-900 mb-6">
                        Voluntariado Regenerativo 🤝
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Encuentra oportunidades para contribuir tu tiempo y talento.
                        Cada tarea completada te otorga <span className="font-bold text-plant-600">certificados on-chain</span> y reputación en la DAO.
                    </p>
                </div>

                {/* Dework Embed Placeholder / Info */}
                <div className="bg-gradient-to-r from-forest-900 to-forest-800 rounded-3xl p-8 sm:p-12 text-white mb-16 relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="font-outfit font-bold text-2xl mb-2">
                                Gestionado en Dework
                            </h2>
                            <p className="text-forest-100 max-w-lg">
                                Usamos Dework Web3 para coordinar tareas y pagar recompensas de forma transparente.
                                Conecta tu wallet para aplicar.
                            </p>
                        </div>
                        <a
                            href="https://app.dework.xyz/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white text-forest-900 font-bold rounded-full hover:bg-plant-50 transition-colors inline-flex items-center gap-2"
                        >
                            Ir al Tablero Oficial
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                    {/* Abstract shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-plant-500 opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                </div>

                {/* Tasks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TASKS.map((task) => (
                        <div
                            key={task.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 rounded-full bg-plant-50 text-plant-700 text-xs font-bold uppercase tracking-wide">
                                        {task.tags[0]}
                                    </span>
                                    {task.location === "Remoto" ? (
                                        <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wide">
                                            Remoto
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wide">
                                            Presencial
                                        </span>
                                    )}
                                </div>

                                <h3 className="font-outfit font-bold text-xl text-forest-900 mb-3 group-hover:text-plant-600 transition-colors">
                                    {task.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                                    {task.description}
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        {task.location}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        {task.date}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <Users className="w-4 h-4 text-gray-400" />
                                        {task.spotsFilled} / {task.spots} Voluntarios
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                <span className="font-bold text-forest-900 text-sm">
                                    {task.tokens}
                                </span>
                                <a
                                    href={task.deworkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-plant-600 font-bold text-sm inline-flex items-center hover:gap-2 transition-all"
                                >
                                    Aplicar
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
