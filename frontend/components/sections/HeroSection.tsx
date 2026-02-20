"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import gsap from "gsap";


export function HeroSection() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(badgeRef.current, {
                y: -20,
                opacity: 0,
                duration: 0.8,
            })
                .from(titleRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2, // Stagger words if split, but here entire block
                }, "-=0.4")
                .from(textRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                }, "-=0.6")
                .from(buttonsRef.current, {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                }, "-=0.6");
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-white py-20">
            {/* Background Effects (Subtle High Key) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#f0faf0_0%,transparent_70%)]" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,#e8f5e8_0%,transparent_70%)] opacity-60" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center flex-grow justify-center">
                {/* Badge */}
                <div ref={badgeRef} className="mb-6 md:mb-8 flex justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-plant-50 border border-plant-200 text-xs font-bold uppercase tracking-wider text-plant-700">
                        <span className="w-2 h-2 rounded-full bg-plant-500 animate-pulse" />
                        Únete a la causa
                    </span>
                </div>

                {/* Main Heading */}
                <h1
                    ref={titleRef}
                    className="font-outfit font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-forest-950 tracking-tight leading-[1.1] mb-6 md:mb-8"
                >
                    Reforestando
                    <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-plant-600 to-plant-400">
                        el Futuro
                    </span>
                </h1>

                {/* Subtitle */}
                <p
                    ref={textRef}
                    className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed"
                >
                    Únete a la comunidad que está sembrando vida en cada rincón del Perú.
                    Restauramos ecosistemas con tecnología blockchain y acción local.
                </p>

                {/* Buttons */}
                <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 md:mb-20">
                    <Link
                        href="/propuestas"
                        className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-plant-600 px-10 text-white font-bold text-base transition-all duration-300 hover:bg-plant-700 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl shadow-plant-500/20"
                    >
                        <span className="relative z-10 mr-3">Votar Propuestas</span>
                        <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                        href="/aprender"
                        className="flex h-14 items-center justify-center gap-3 rounded-full border-2 border-plant-100 bg-white px-10 text-plant-700 font-bold text-base transition-all hover:bg-plant-50 hover:border-plant-200 hover:text-plant-800"
                    >
                        <PlayCircle className="w-5 h-5 text-plant-600" />
                        Ver Video
                    </Link>
                </div>

                {/* Stats / Social Proof - Flow content instead of absolute */}
                <div className="w-full max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <div className="px-8 py-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-100 shadow-2xl shadow-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6">
                        {/* Stat 1 */}
                        <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
                            <div className="p-3 rounded-xl bg-plant-50 text-plant-600 shrink-0">
                                <span className="text-2xl">🌳</span>
                            </div>
                            <div className="text-left">
                                <p className="text-plant-900 text-2xl font-black leading-none">500+</p>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-wide mt-1">Árboles Plantados</p>
                            </div>
                        </div>
                        <div className="hidden md:block h-10 w-px bg-gray-200" />

                        {/* Stat 2 */}
                        <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
                            <div className="p-3 rounded-xl bg-plant-50 text-plant-600 shrink-0">
                                <span className="text-2xl">👥</span>
                            </div>
                            <div className="text-left">
                                <p className="text-plant-900 text-2xl font-black leading-none">127</p>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-wide mt-1">Miembros Activos</p>
                            </div>
                        </div>
                        <div className="hidden md:block h-10 w-px bg-gray-200" />

                        {/* Stat 3 */}
                        <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
                            <div className="p-3 rounded-xl bg-plant-50 text-plant-600 shrink-0">
                                <span className="text-2xl">🗳️</span>
                            </div>
                            <div className="text-left">
                                <p className="text-plant-900 text-2xl font-black leading-none">8</p>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-wide mt-1">Propuestas Votadas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
