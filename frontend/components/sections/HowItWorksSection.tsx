import { Wallet, Leaf, Vote, CheckCircle2 } from "lucide-react";

const STEPS = [
    {
        icon: Wallet,
        number: "01",
        title: "Crea tu wallet",
        description:
            "Instala MetaMask o Coinbase Wallet en tu navegador o celular. Es gratis y toma 5 minutos.",
        color: "bg-forest-50 border-forest-200",
        iconColor: "text-forest-600",
    },
    {
        icon: Leaf,
        number: "02",
        title: "Recibe tu NFT",
        description:
            "Solicita tu NFT de membresía en nuestro Telegram. Lo enviamos gratis a tu wallet. Es tu voto.",
        color: "bg-terra-50 border-terra-200",
        iconColor: "text-terra-500",
    },
    {
        icon: Vote,
        number: "03",
        title: "Vota por proyectos",
        description:
            "Revisa las propuestas activas y vota por los proyectos que más te importan. Sin costo de gas.",
        color: "bg-forest-50 border-forest-200",
        iconColor: "text-forest-600",
    },
    {
        icon: CheckCircle2,
        number: "04",
        title: "Ve el impacto",
        description:
            "Los proyectos aprobados se ejecutan y el impacto es documentado y reportado a toda la comunidad.",
        color: "bg-terra-50 border-terra-200",
        iconColor: "text-terra-500",
    },
];

export function HowItWorksSection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                        Simple y transparente
                    </span>
                    <h2 className="font-outfit font-black text-4xl sm:text-5xl text-forest-950 mt-4 mb-4">
                        Cómo funciona
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Participar en Regen Peru es tan fácil como 4 pasos. No necesitas
                        experiencia con blockchain.
                    </p>
                </div>

                {/* Steps grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STEPS.map(({ icon: Icon, number, title, description, color, iconColor }, index) => (
                        <div
                            key={number}
                            className={`rounded-3xl border border-gray-100 p-8 bg-white hover:border-green-200 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300 group`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-14 h-14 rounded-2xl bg-forest-50 flex items-center justify-center`}>
                                    <Icon className={`w-6 h-6 text-forest-600`} />
                                </div>
                                <span className="font-outfit font-black text-4xl text-gray-100 group-hover:text-green-500/20 transition-colors">
                                    {number}
                                </span>
                            </div>

                            <h3 className="font-outfit font-bold text-xl text-forest-900 mb-3">
                                {title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
