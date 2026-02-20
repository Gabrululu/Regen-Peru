
import { Calendar, Clock, Medal, TreeDeciduous } from "lucide-react";

interface ImpactBadgeProps {
    id: string;
    eventName: string;
    role: string;
    hours: number;
    date: string; // ISO string or formatted date
    isVerified?: boolean;
}

export function ImpactBadge({
    id,
    eventName,
    role,
    hours,
    date,
    isVerified = true,
}: ImpactBadgeProps) {
    return (
        <a
            href={`https://base-sepolia.easscan.org/attestation/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative overflow-hidden rounded-2xl bg-white border border-plant-100 shadow-xl shadow-plant-500/5 transition-all hover:scale-[1.02] hover:shadow-plant-500/10 group cursor-pointer"
        >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-plant-500 to-plant-300" />

            <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-plant-50 text-plant-600 group-hover:bg-plant-100 group-hover:text-plant-700 transition-colors">
                        <TreeDeciduous className="w-6 h-6" />
                    </div>
                    {isVerified && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-plant-50 border border-plant-200 text-[10px] font-bold uppercase tracking-wider text-plant-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-plant-500 animate-pulse" />
                            Verificado
                        </span>
                    )}
                </div>

                {/* Content */}
                <h3 className="font-outfit font-bold text-lg text-forest-900 leading-tight mb-1">
                    {eventName}
                </h3>
                <div className="flex items-center gap-2 text-plant-600 text-sm font-medium mb-4">
                    <Medal className="w-4 h-4" />
                    <span>{role}</span>
                </div>

                {/* Footer / Meta */}
                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3 mt-auto">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium">{hours} horas</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{date}</span>
                    </div>
                </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-plant-50 rounded-full opacity-0 group-hover:opacity-50 transition-opacity blur-2xl pointer-events-none" />
        </a>
    );
}
