"use client";

import Link from "next/link";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Clover, Menu, X } from "lucide-react";

const navLinks = [
    { href: "/propuestas", label: "Propuestas" },
    { href: "/aprender", label: "Aprender" },
    { href: "/perfil", label: "Mi Perfil" },
];

interface NavbarProps {
    transparent?: boolean;
}

export function Navbar({ transparent = false }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const headerClasses = transparent
        ? "fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/10"
        : "fixed top-0 left-0 right-0 z-50 glass border-b border-plant-200/40";

    const logoIconClasses = transparent
        ? "p-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 transition-colors group-hover:bg-primary group-hover:border-primary group-hover:text-black text-white"
        : "w-8 h-8 rounded-lg bg-plant-600 flex items-center justify-center shadow-forest group-hover:bg-plant-700 transition-colors";

    const logoTextClasses = transparent
        ? "text-white text-lg font-bold tracking-tight font-display"
        : "font-outfit font-700 text-plant-950 text-lg tracking-tight";

    const linkClasses = transparent
        ? "text-sm font-medium text-white/90 hover:text-primary transition-colors"
        : "text-sm font-medium text-charcoal/70 hover:text-plant-600 transition-colors";

    const hamburgerClasses = transparent
        ? "md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
        : "md:hidden p-2 rounded-lg hover:bg-plant-50 transition-colors";

    const hamburgerIconClasses = transparent ? "text-white" : "text-charcoal";

    const mobileMenuClasses = transparent
        ? "md:hidden bg-black/20 backdrop-blur-md border-t border-white/10 px-4 pb-4"
        : "md:hidden glass border-t border-plant-200/40 px-4 pb-4";

    const mobileLinkClasses = transparent
        ? "block px-3 py-2 rounded-lg text-white/80 hover:bg-white/10 hover:text-primary transition-colors font-medium"
        : "block px-3 py-2 rounded-lg text-charcoal/80 hover:bg-plant-50 hover:text-plant-700 transition-colors font-medium";

    return (
        <header className={headerClasses}>
            <nav className="max-w-7xl mx-auto px-6 py-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                    <div className={logoIconClasses}>
                        <Clover className="w-5 h-5" />
                    </div>
                    <span className={logoTextClasses}>
                        Regen{transparent ? "" : <span className="text-plant-500">.</span>}Peru
                    </span>
                </Link>

                {/* Desktop nav */}
                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link href={link.href} className={linkClasses}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Wallet button */}
                <div className="hidden md:block">
                    <ConnectButton
                        label="Conectar Wallet"
                        accountStatus="avatar"
                        chainStatus="icon"
                        showBalance={false}
                    />
                </div>

                {/* Mobile hamburger */}
                <button
                    className={hamburgerClasses}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Abrir menú"
                >
                    {mobileOpen ? (
                        <X className={`w-5 h-5 ${hamburgerIconClasses}`} />
                    ) : (
                        <Menu className={`w-5 h-5 ${hamburgerIconClasses}`} />
                    )}
                </button>
            </nav>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className={mobileMenuClasses}>
                    <ul className="space-y-1 my-3">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={mobileLinkClasses}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-2">
                        <ConnectButton
                            label="Conectar Wallet"
                            accountStatus="avatar"
                            chainStatus="icon"
                            showBalance={false}
                        />
                    </div>
                </div>
            )}
        </header>
    );
}
