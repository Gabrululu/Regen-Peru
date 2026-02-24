"use client";

import { useState } from "react";
import { ChevronDown, BookOpen, Wallet, Vote, Globe, HelpCircle, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const FAQ = [
    {
        q: "¿Qué es Regen Peru?",
        a: "Regen Peru es una DAO (Organización Autónoma Descentralizada) que usa tecnología blockchain para que la comunidad vote democráticamente por proyectos de voluntariado e impacto social en Perú. No necesitas ser experto en tecnología para participar.",
    },
    {
        q: "¿Qué es un NFT de membresía?",
        a: "Es un certificado digital único guardado en la blockchain que prueba que eres miembro de Regen Peru. Funciona como una tarjeta de membresía digital. Con él puedes votar por proyectos. Es 'soulbound', lo que significa que está permanentemente vinculado a tu wallet y no se puede transferir.",
    },
    {
        q: "¿Cómo consigo mi NFT de membresía?",
        a: "Únete a nuestra comunidad en Telegram (@RegenPeru) o asiste a uno de nuestros eventos. El equipo revisará tu aplicación y te enviará tu NFT gratuitamente. No necesitas comprar nada.",
    },
    {
        q: "¿Qué es una wallet (billetera)?",
        a: "Una wallet es una aplicación que te permite manejar tus activos digitales. Actúa como tu identidad en la blockchain. Las más populares son MetaMask (extensión de navegador) y Coinbase Wallet (app móvil). Crear una es gratis.",
    },
    {
        q: "¿Necesito comprar criptomonedas para participar?",
        a: "¡No! Las votaciones en Regen Peru son 'gasless' (sin costo de gas) gracias a Snapshot. Solo necesitas una wallet y tu NFT de membresía. Votar es completamente gratuito.",
    },
    {
        q: "¿Qué es la red Base?",
        a: "Base es una red blockchain de segunda generación (Layer 2) construida sobre Ethereum. Es más rápida, más económica y ecológica que la red principal. Regen Peru opera en Base para minimizar costos.",
    },
    {
        q: "¿Qué es Snapshot?",
        a: "Snapshot es la plataforma que usamos para las votaciones. Permite votar usando tu NFT de membresía sin pagar tarifas de transacción. Es la herramienta de gobernanza más usada por DAOs en el mundo.",
    },
    {
        q: "¿Cómo se ejecutan las decisiones votadas?",
        a: "Cuando una propuesta es aprobada, el equipo de Regen Peru (guiado por un multisig) ejecuta los fondos y coordina las acciones. Toda la documentación y gastos son públicos y transparentes en la blockchain.",
    },
    {
        q: "¿Quién puede crear propuestas?",
        a: "Por ahora, cualquier holder de NFT puede proponer proyectos en nuestro canal de Telegram o Discord. Las propuestas pasan por un proceso de revisión comunitaria antes de publicarse en Snapshot para votación formal.",
    },
    {
        q: "¿La DAO tiene fondos? ¿De dónde vienen?",
        a: "Regen Peru se financia a través de donaciones, grants de ecosistemas Web3 (como Gitcoin), partnerships con organizaciones locales y eventos comunitarios. Todos los fondos son manejados transparentemente.",
    },
];

const GLOSARIO = [
    { term: "DAO", def: "Organización Autónoma Descentralizada. Una organización gobernada por reglas codificadas en la blockchain, sin una autoridad central." },
    { term: "Blockchain", def: "Una base de datos distribuida e inmutable donde se registran todas las transacciones. Es como un libro contable público que nadie puede manipular." },
    { term: "NFT", def: "Token No Fungible. Un certificado digital único en la blockchain. En Regen Peru, tu NFT es tu membresía." },
    { term: "Wallet", def: "Billetera digital. Aplicación que guarda tus activos digitales y es tu identidad en la blockchain." },
    { term: "Gas", def: "Tarifa que se paga para procesar transacciones en la blockchain. Regen Peru usa Snapshot para que las votaciones sean sin gas (gratis)." },
    { term: "Base", def: "Red blockchain Layer 2 sobre Ethereum. Es más rápida y económica. Regen Peru opera en Base." },
    { term: "Snapshot", def: "Plataforma de votación off-chain (fuera de la blockchain) que permite votar gratis usando NFTs." },
    { term: "Soulbound", def: "Tipo de NFT que no se puede transferir ni vender. Tu membresía Regen Peru es soulbound — es tuya para siempre." },
    { term: "Multisig", def: "Billetera que requiere la aprobación de múltiples personas para ejecutar transacciones. Usad para mayor seguridad en la gestión de fondos." },
    { term: "Smart Contract", def: "Contrato inteligente. Código que se ejecuta automáticamente en la blockchain cuando se cumplen ciertas condiciones." },
    { term: "Layer 2", def: "Solución construida encima de una blockchain existente para hacer transacciones más rápidas y baratas." },
    { term: "Quórum", def: "Número mínimo de votos necesarios para que una decisión sea válida. En Regen Peru es el 30% de NFTs activos." },
];

const TUTORIAL_STEPS = [
    {
        step: 1,
        icon: Wallet,
        title: "Crea tu wallet",
        description: "Instala MetaMask en tu navegador o Coinbase Wallet en tu teléfono. Es gratis y toma 5 minutos.",
        tip: "Usa MetaMask si votas desde computadora, Coinbase Wallet si votas desde celular.",
        link: "https://metamask.io/download",
        linkLabel: "Descargar MetaMask →",
    },
    {
        step: 2,
        icon: Globe,
        title: "Agrega la red Base",
        description: "Regen Peru funciona en la red Base. Tu wallet debe estar conectada a Base para ver tu NFT y votar.",
        tip: "Al conectar tu wallet en Regen Peru, te pediremos automáticamente cambiar a Base.",
        link: "https://chainlist.org/chain/8453",
        linkLabel: "Agregar Base a MetaMask →",
    },
    {
        step: 3,
        icon: Sparkles,
        title: "Solicita tu NFT",
        description: "Únete a nuestro Telegram y solicita tu NFT de membresía. El equipo lo enviará a tu wallet gratuitamente.",
        tip: "El proceso de verificación toma 24-48 horas. Solo necesitas tu dirección de wallet.",
        link: "https://t.me/RegenPeru",
        linkLabel: "Unirse al Telegram →",
    },
    {
        step: 4,
        icon: Vote,
        title: "¡Vota y participa!",
        description: "Con tu wallet conectada y tu NFT activo, ve a la sección de Propuestas y emite tu voto. ¡Es gratis!",
        tip: "Cada propuesta incluye toda la información del proyecto. Tómate tiempo para leerla.",
        link: "/propuestas",
        linkLabel: "Ver propuestas activas →",
    },
];

export default function AprenderPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-cream pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <span className="text-xs font-semibold uppercase tracking-widest text-forest-500 bg-forest-50 px-3 py-1.5 rounded-full border border-forest-100">
                        Onboarding
                    </span>
                    <h1 className="font-outfit font-bold text-4xl sm:text-5xl text-charcoal mt-4 mb-3">
                        Aprende Web3
                    </h1>
                    <p className="text-charcoal/80 text-lg max-w-xl mx-auto">
                        No necesitas experiencia previa. Te guiamos paso a paso para que
                        puedas participar en Regen Peru.
                    </p>
                </div>

                {/* Tutorial steps */}
                <section id="tutorial" className="mb-16">
                    <h2 className="font-outfit font-bold text-2xl text-charcoal mb-6">
                        Cómo empezar en 4 pasos
                    </h2>
                    <div className="space-y-4">
                        {TUTORIAL_STEPS.map(({ step, icon: Icon, title, description, tip, link, linkLabel }) => (
                            <div
                                key={step}
                                className="bg-white rounded-3xl border border-forest-100 p-6 flex gap-6 hover:border-forest-300 hover:shadow-card transition-all"
                            >
                                <div className="shrink-0">
                                    <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-200 flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-forest-600" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-forest-500 uppercase tracking-widest">
                                            Paso {step}
                                        </span>
                                    </div>
                                    <h3 className="font-outfit font-bold text-lg text-charcoal mb-1">
                                        {title}
                                    </h3>
                                    <p className="text-sm text-charcoal/70 mb-3">{description}</p>
                                    <div className="bg-forest-50 rounded-xl px-3 py-2 text-xs text-forest-700 mb-3">
                                        💡 <strong>Tip:</strong> {tip}
                                    </div>
                                    <a
                                        href={link}
                                        target={link.startsWith("http") ? "_blank" : undefined}
                                        rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="text-sm font-semibold text-forest-600 hover:text-forest-800 transition-colors"
                                    >
                                        {linkLabel}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Glosario */}
                <section id="glosario" className="mb-16">
                    <h2 className="font-outfit font-bold text-2xl text-charcoal mb-6 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-forest-500" />
                        Glosario Web3
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {GLOSARIO.map(({ term, def }) => (
                            <div
                                key={term}
                                className="bg-white rounded-2xl border border-forest-100 p-5 hover:border-forest-200 transition-colors"
                            >
                                <p className="font-outfit font-bold text-forest-700 mb-1">{term}</p>
                                <p className="text-sm text-charcoal/70 leading-relaxed">{def}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section id="faq">
                    <h2 className="font-outfit font-bold text-2xl text-charcoal mb-6 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-forest-500" />
                        Preguntas Frecuentes
                    </h2>
                    <div className="space-y-3">
                        {FAQ.map(({ q, a }, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl border border-forest-100 overflow-hidden"
                            >
                                <button
                                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-forest-50 transition-colors"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                >
                                    <span className="font-outfit font-semibold text-charcoal text-sm sm:text-base">
                                        {q}
                                    </span>
                                    <ChevronDown
                                        className={`w-4 h-4 text-forest-500 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                {openFaq === i && (
                                    <div className="px-6 pb-5">
                                        <p className="text-sm text-charcoal/70 leading-relaxed">{a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 text-center bg-gradient-to-br from-forest-600 to-forest-900 rounded-3xl p-10 relative overflow-hidden">
                    <div className="orb w-64 h-64 bg-forest-400 -top-16 -right-16" />
                    <div className="relative z-10">
                        <p className="text-forest-600 text-sm mb-2">¿Listo para empezar?</p>
                        <h2 className="font-outfit font-bold text-3xl text-black mb-4">
                            Únete a la comunidad
                        </h2>
                        <p className="text-forest-200/90 mb-8 max-w-md mx-auto text-sm">
                            Entra a nuestro Telegram y solicita tu NFT de membresía. Es
                            gratuito y la comunidad te ayudará en cada paso.
                        </p>
                        <a
                            href="https://t.me/RegenPeru"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-forest-700 font-outfit font-semibold hover:bg-forest-50 transition-colors shadow-lg"
                        >
                            Unirse a Telegram
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}
