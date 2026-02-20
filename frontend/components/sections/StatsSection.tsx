import { Users, Vote, Leaf, TrendingUp } from "lucide-react";

const STATS = [
    { value: "127+", label: "Miembros activos" },
    { value: "8", label: "Propuestas votadas" },
    { value: "500", label: "Árboles plantados" },
    { value: "3", label: "Proyectos completados" },
];

export function StatsSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {STATS.map((stat, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-forest-50/50 hover:bg-forest-50 transition-colors">
                            <div className="text-4xl md:text-5xl font-bold text-forest-600 mb-2 font-outfit">
                                {stat.value}
                            </div>
                            <div className="text-sm md:text-base text-gray-700 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
