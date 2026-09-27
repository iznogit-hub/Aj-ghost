"use client";

import { Skull } from "lucide-react";

const footerLinks = [
    { href: "#", label: "Contact AJ Ghost" },
    { href: "#", label: "Media Kit" },
    { href: "#newsletter", label: "Newsletter" },
    { href: "#", label: "Privacy Policy" },
];

const socialLinks = [
    { href: "#", label: "Instagram" },
    { href: "#", label: "TikTok" },
    { href: "#", label: "Goodreads" },
    { href: "#", label: "Amazon" },
];

export default function Footer() {
    return (
        <section className="py-20 bg-navy-950 relative overflow-hidden">
            {/* Top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/15 to-transparent"></div>

            {/* Background watermark */}
            <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none select-none overflow-hidden">
                <div className="text-[20rem] font-serif font-bold text-white/[0.015] tracking-tighter">
                    GHOST
                </div>
            </div>

            {/* --- CONTENT --- */}
            <div className="container relative z-10">
                <div className="flex flex-col items-center gap-8">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="bg-gold-400/10 p-2.5 rounded-full border border-gold-400/20">
                            <Skull size={22} className="text-gold-400" />
                        </div>
                        <div>
                            <span className="font-serif text-xl tracking-wider text-white font-bold">
                                AJ <span className="text-gold-400">GHOST</span>
                            </span>
                            <div className="text-[9px] tracking-[0.3em] text-gold-400/40 uppercase font-mono">
                                Psychological Thrillers
                            </div>
                        </div>
                    </div>

                    {/* Tagline */}
                    <p className="text-white/30 text-center max-w-md text-sm leading-relaxed">
                        Dark fiction that explores fractured minds, buried secrets, 
                        and the thin line between predator and prey.
                    </p>

                    {/* Navigation Links */}
                    <nav className="flex gap-6 flex-wrap justify-center">
                        {footerLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-white/30 text-sm hover:text-gold-400 transition duration-300 font-medium"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Social Links */}
                    <div className="flex gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-white/20 border border-white/5 rounded-full hover:text-gold-400 hover:border-gold-400/30 transition duration-300"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Crack divider */}
                    <div className="crack-divider w-full mt-4"></div>

                    {/* Copyright */}
                    <div className="text-center pt-4">
                        <p className="text-white/15 text-xs font-mono tracking-wider">
                            &copy; {new Date().getFullYear()} AJ Ghost · The Watcher Series · All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}