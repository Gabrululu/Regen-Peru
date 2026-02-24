import Link from "next/link";
import { Leaf, Github, Twitter, Send } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-forest-900 text-cream/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl border-2 border-forest-600 flex items-center justify-center bg-white shadow-sm">
                                <Leaf className="w-6 h-6 text-forest-600" />
                            </div>
                            <span className="font-outfit font-bold text-slate-900 text-2xl tracking-tight">
                                Regen<span className="text-terra-600">.</span>Peru
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-cream/60 max-w-xs">
                            Una DAO para transformar el voluntariado y la regeneración en Perú
                            mediante tecnología blockchain.
                        </p>
                        <div className="flex items-center gap-4 mt-6">
                            <a
                                href="https://x.com/RegenPeru"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-forest-800 hover:bg-forest-700 flex items-center justify-center transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-4 h-4 text-cream/70" />
                            </a>
                            <a
                                href="https://t.me/RegenPeru"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-forest-800 hover:bg-forest-700 flex items-center justify-center transition-colors"
                                aria-label="Telegram"
                            >
                                <Send className="w-4 h-4 text-cream/70" />
                            </a>
                            <a
                                href="https://github.com/Gabrululu/RegenPeru"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg bg-forest-800 hover:bg-forest-700 flex items-center justify-center transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="w-4 h-4 text-cream/70" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-outfit font-semibold text-cream mb-4 text-sm uppercase tracking-widest">
                            Plataforma
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { href: "/propuestas", label: "Propuestas" },
                                { href: "/aprender", label: "Aprender Web3" },
                                { href: "/perfil", label: "Mi Membresía" },
                            ].map((l) => (
                                <li key={l.href}>
                                    <Link
                                        href={l.href}
                                        className="text-sm text-cream/60 hover:text-forest-300 transition-colors"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <a
                                    href="https://testnet.snapshot.box/#/s-tn:regenperu.eth"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-cream/60 hover:text-forest-300 transition-colors"
                                >
                                    Votar en Snapshot ↗
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-outfit font-semibold text-cream mb-4 text-sm uppercase tracking-widest">
                            Recursos
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { href: "/aprender#glosario", label: "Glosario Web3" },
                                { href: "/aprender#faq", label: "Preguntas Frecuentes" },
                                {
                                    href: "https://docs.base.org",
                                    label: "Base Network ↗",
                                    external: true,
                                },
                                {
                                    href: "https://docs.snapshot.box",
                                    label: "Snapshot Docs ↗",
                                    external: true,
                                },
                            ].map((l) => (
                                <li key={l.href}>
                                    {"external" in l && l.external ? (
                                        <a
                                            href={l.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-cream/60 hover:text-forest-300 transition-colors"
                                        >
                                            {l.label}
                                        </a>
                                    ) : (
                                        <Link
                                            href={l.href}
                                            className="text-sm text-cream/60 hover:text-forest-300 transition-colors"
                                        >
                                            {l.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-forest-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-cream/40">
                        © 2026 Regen Peru DAO · Construido sobre{" "}
                        <a
                            href="https://base.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-forest-400 transition-colors"
                        >
                            Base
                        </a>
                    </p>
                    <div className="flex items-center gap-1 text-xs text-cream/40">
                        <span>Hecho con</span>
                        <span className="text-terra-400">♥</span>
                        <span>para Perú</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
