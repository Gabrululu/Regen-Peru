import Link from "next/link";
import { ArrowRight, Leaf, Sprout, Heart, BookOpen } from "lucide-react";

const FEATURED = [
    {
        id: "1",
        tag: "Medio Ambiente",
        tagIcon: Sprout,
        title: "Reforestación en los Humedales de Villa María del Triunfo",
        description: "500 árboles nativos para recuperar el ecosistema y proteger 70+ especies de aves migratorias.",
        votes: 42,
        forPct: 90,
        daysLeft: 5,
        state: "active",
    },
    {
        id: "2",
        tag: "Educación",
        tagIcon: BookOpen,
        title: "Biblioteca Comunitaria Digital en San Juan de Miraflores",
        description: "20 computadoras y acceso a internet para 200 niños del cono sur de Lima.",
        votes: 67,
        forPct: 89,
        daysLeft: 4,
        state: "active",
    },
    {
        id: "3",
        tag: "Salud",
        tagIcon: Heart,
        title: "Campaña de Salud Preventiva en Ventanilla",
        description: "Brigadas médicas gratuitas para 1,000 familias con atención primaria y talleres de nutrición.",
        votes: 89,
        forPct: 84,
        daysLeft: 3,
        state: "active",
    },
];

export function FeaturedProjects() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-forest-50 rounded-full blur-3xl -z-10 opacity-60" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-50 rounded-full blur-3xl -z-10 opacity-60" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                            Votación activa
                        </span>
                        <h2 className="font-outfit font-black text-4xl sm:text-5xl text-forest-950 mt-4 mb-2">
                            Proyectos destacados
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Estos proyectos necesitan tu voto hoy.
                        </p>
                    </div>
                    <Link
                        href="/propuestas"
                        className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-forest-100 text-forest-700 hover:bg-forest-50 hover:border-forest-200 transition-all text-sm font-bold shadow-sm"
                    >
                        Ver todas
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURED.map((project) => {
                        const TagIcon = project.tagIcon;
                        return (
                            <Link key={project.id} href={`/propuestas/${project.id}`} className="group block h-full">
                                <article className="bg-white rounded-3xl p-6 h-full flex flex-col border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-green-500/10 hover:border-green-200 transition-all duration-300 hover:-translate-y-1">
                                    {/* Tag */}
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-forest-700 bg-forest-50 px-3 py-1.5 rounded-full">
                                            <TagIcon className="w-3.5 h-3.5" />
                                            {project.tag}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            Activa
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-outfit font-bold text-forest-900 text-xl leading-snug mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1">
                                        {project.description}
                                    </p>

                                    {/* Vote bar */}
                                    <div className="mb-5 bg-gray-50 p-4 rounded-xl">
                                        <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
                                            <span className="text-forest-700">A favor: {project.forPct}%</span>
                                            <span>{project.votes} votos</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-green-500"
                                                style={{ width: `${project.forPct}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between text-xs font-medium text-gray-400 mt-auto pt-2 border-t border-gray-100">
                                        <span>{project.daysLeft} días restantes</span>
                                        <span className="text-green-600 group-hover:underline decoration-2 underline-offset-4">
                                            Votar →
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
