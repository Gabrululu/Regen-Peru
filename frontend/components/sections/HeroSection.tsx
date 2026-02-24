"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, PlayCircle, Sprout, Users, Vote } from "lucide-react";
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
        <section className="relative w-full min-h-screen overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-linear hover:scale-105"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center max-w-5xl mx-auto pt-20 pb-32">
                {/* Badge */}
                <div ref={badgeRef} className="mb-6 animate-fade-in-up">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 text-xs font-semibold uppercase tracking-wider text-primary shadow-lg shadow-primary/20">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse text-white" />
                        Únete a la causa
                    </span>
                </div>

                {/* Main Heading */}
                <h1
                    ref={titleRef}
                    className="text-white text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] mb-6 drop-shadow-lg font-display"
                >
                    Reforestando <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                        el Futuro
                    </span>
                </h1>

                {/* Subtitle */}
                <p
                    ref={textRef}
                    className="text-white/80 text-lg md:text-xl font-light max-w-2xl mb-10 leading-relaxed"
                >
                    Únete a la comunidad que está sembrando vida en cada rincón del planeta. Restauramos ecosistemas, un árbol a la vez.
                </p>

                {/* Buttons */}
                <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center gap-4">
                    <Link
                        href="/voluntariado"
                        className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-white font-bold text-base transition-all duration-300 hover:bg-[#15c550] hover:scale-105 active:scale-95 shadow-xl shadow-primary/30"
                    >
                        <span className="relative z-10 mr-2">Únete como Voluntario</span>
                        <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                        href="/aprender"
                        className="flex h-14 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm px-8 text-white font-semibold text-base transition-all hover:bg-white/10 hover:border-white/50"
                    >
                        <PlayCircle className="w-5 h-5" />
                        Ver Video
                    </Link>
                </div>
            </div>

            {/* Bottom Stats / Social Proof */}
            <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/20 bg-black/40 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Stat 1 */}
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-primary/20 border border-primary/30 text-primary">
                            <Sprout className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-white text-2xl font-bold leading-none drop-shadow-lg">500+</p>
                            <p className="text-white/80 text-xs uppercase tracking-wide font-medium">Árboles Plantados</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:flex h-8 w-px bg-white/20" />

                    {/* Stat 2 */}
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-primary/20 border border-primary/30 text-primary">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-white text-2xl font-bold leading-none drop-shadow-lg">127</p>
                            <p className="text-white/80 text-xs uppercase tracking-wide font-medium">Voluntarios Activos</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:flex h-8 w-px bg-white/20" />

                    {/* Stat 3 */}
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-primary/20 border border-primary/30 text-primary">
                            <Vote className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-white text-2xl font-bold leading-none drop-shadow-lg">8</p>
                            <p className="text-white/80 text-xs uppercase tracking-wide font-medium">Propuestas Activas</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
