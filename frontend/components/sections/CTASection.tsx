import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export function CTASection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="bg-forest-900 rounded-[2.5rem] p-12 sm:p-20 relative overflow-hidden shadow-2xl shadow-forest-900/20">
                    {/* Orbs */}
                    <div className="orb w-80 h-80 bg-forest-600/30 rounded-full blur-3xl absolute -top-20 -right-20" />
                    <div className="orb w-64 h-64 bg-green-500/20 rounded-full blur-3xl absolute -bottom-10 -left-10" />

                    <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8 border border-white/10">
                            <Leaf className="w-8 h-8 text-green-400" />
                        </div>

                        <h2 className="font-outfit font-black text-4xl sm:text-6xl text-white mb-6 leading-tight">
                            Empieza a cambiar
                            <br />
                            <span className="text-green-400">el Perú hoy.</span>
                        </h2>

                        <p className="text-forest-100 text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                            Únete a la comunidad que está construyendo un Perú más justo,
                            verde y próspero — sin necesitar experiencia en tecnología.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/aprender"
                                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white text-forest-900 font-outfit font-bold text-base hover:bg-forest-50 transition-all shadow-lg hover:-translate-y-1 hover:shadow-xl"
                            >
                                Cómo participar
                                <ArrowRight className="w-5 h-5 text-green-600" />
                            </Link>
                            <Link
                                href="/propuestas"
                                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-outfit font-semibold text-base hover:border-white/40 hover:bg-white/10 transition-all"
                            >
                                Ver propuestas activas
                            </Link>
                        </div>

                        {/* Trust indicators */}
                        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-forest-300">
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
