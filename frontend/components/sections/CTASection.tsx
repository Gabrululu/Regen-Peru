import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export function CTASection() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-green-50/30">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="bg-gradient-to-br from-green-50 via-emerald-50/50 to-white rounded-[2.5rem] p-12 sm:p-20 relative overflow-hidden shadow-2xl border border-green-100">
                    {/* Orbs decorativos verdes */}
                    <div className="orb w-96 h-96 bg-green-400/20 rounded-full blur-3xl absolute -top-32 -right-32" />
                    <div className="orb w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl absolute -bottom-20 -left-20" />
                    <div className="orb w-64 h-64 bg-green-300/10 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                    <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30">
                            <Leaf className="w-8 h-8 text-white" />
                        </div>

                        <h2 className="font-outfit font-black text-4xl sm:text-6xl text-gray-900 mb-6 leading-tight">
                            Empieza a cambiar
                            <br />
                            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                el Perú hoy.
                            </span>
                        </h2>

                        <p className="text-gray-700 text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                            Únete a la comunidad que está construyendo un Perú más justo,
                            verde y próspero — sin necesitar experiencia en tecnología.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/aprender"
                                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-outfit font-bold text-base hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/40"
                            >
                                Cómo participar
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/propuestas"
                                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border-2 border-green-600 bg-white text-green-700 font-outfit font-semibold text-base hover:bg-green-50 hover:border-green-700 transition-all shadow-md hover:shadow-lg"
                            >
                                Ver propuestas activas
                            </Link>
                        </div>

                        {/* Trust indicators */}
                        <div className="mt-12 pt-8 border-t border-green-200/50 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-gray-600">
                            {[
                                "🔗 Construido en Base",
                                "🗳️ Votación gasless",
                                "🔒 Open source",
                                "🇵🇪 100% peruano",
                            ].map((t) => (
                                <span key={t} className="flex items-center gap-2">{t}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
