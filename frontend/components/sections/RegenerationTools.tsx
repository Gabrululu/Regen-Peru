import { Award, Layers, ExternalLink } from "lucide-react";

const TOOLS = [
    {
        icon: Award,
        title: "EAS (Ethereum Attestation Service) en Base",
        description:
            "Crea 'Certificados de Voluntariado' digitales. Cuando alguien ayuda en una limpieza de playa o reforestación, la DAO le emite una atestación (prueba digital) que vive en su billetera y le da reputación y poder de voto.",
        color: "bg-blue-50 border-blue-200",
        iconColor: "text-blue-600",
        link: "https://attest.sh/",
    },
    {
        icon: Layers,
        title: "Dework para el Voluntariado",
        description:
            "Lista las tareas de los proyectos (ej. 'Necesitamos 5 personas para el domingo en Lurín') y recompensa a quienes asistan con tokens de la DAO directamente desde la plataforma.",
        color: "bg-purple-50 border-purple-200",
        iconColor: "text-purple-600",
        link: "https://dework.xyz/",
    },
];

export function RegenerationTools() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-forest-600 bg-forest-50 px-3 py-1.5 rounded-full border border-forest-100">
                        Herramientas de Impacto
                    </span>
                    <h2 className="font-outfit font-black text-4xl sm:text-5xl text-forest-950 mt-4 mb-4">
                        Ideas para el proceso de "Regeneración"
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Dado que es un proyecto de impacto social, aquí hay dos herramientas adicionales que potenciarán la participación.
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {TOOLS.map(({ icon: Icon, title, description, color, iconColor, link }, index) => (
                        <div
                            key={title}
                            className={`rounded-3xl border border-gray-200 p-8 bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300 group relative overflow-hidden`}
                        >
                            <div className={`absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity`}>
                                <ExternalLink className="w-5 h-5 text-gray-400" />
                            </div>

                            <div className="flex items-start mb-6">
                                <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shrink-0 mr-6`}>
                                    <Icon className={`w-7 h-7 ${iconColor}`} />
                                </div>
                                <div>
                                    <h3 className="font-outfit font-bold text-2xl text-forest-900 mb-3 leading-tight">
                                        {title}
                                    </h3>
                                </div>
                            </div>

                            <p className="text-gray-600 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
