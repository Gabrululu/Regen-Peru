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

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (<header className="fixed top-0 left-0 right-0 z-50 glass border-b border-plant-200/40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-plant-600 flex items-center justify-center shadow-forest group-hover:bg-plant-700 transition-colors">
                    <Clover className="w-5 h-5 text-white" />
                </div>
                <span className="font-outfit font-700 text-plant-950 text-lg tracking-tight">
                    Regen<span className="text-plant-500">.</span>Peru
                </span>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className="text-sm font-medium text-charcoal/70 hover:text-plant-600 transition-colors"
                        >
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
                className="md:hidden p-2 rounded-lg hover:bg-plant-50 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Abrir menú"
            >
                {mobileOpen ? (
                    <X className="w-5 h-5 text-charcoal" />
                ) : (
                    <Menu className="w-5 h-5 text-charcoal" />
                )}
            </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
            <div className="md:hidden glass border-t border-plant-200/40 px-4 pb-4">
                <ul className="space-y-1 my-3">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="block px-3 py-2 rounded-lg text-charcoal/80 hover:bg-plant-50 hover:text-plant-700 transition-colors font-medium"
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
