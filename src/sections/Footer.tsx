"use client";

import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import ContactModal from "@/components/ContactModal";

const AMAZON_AUTHOR_STORE = "https://www.amazon.com/stores/AJ-Ghost/author/B0HD9D7DRD?ref=ap_rdr&shoppingPortalEnabled=true&ccs_id=5eb73e49-2101-4a5f-b36a-2acfe6ae4c07";

export default function Footer() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <>
            <section className="py-20 bg-navy-950 relative overflow-hidden" id="contact">
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
                            <div className="p-1 rounded-full border border-gold-400/40 shadow-lg shadow-gold-400/10">
                                <BrandLogo size={52} showBorder={false} />
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
                        <nav className="flex gap-6 flex-wrap justify-center items-center">
                            <a
                                href="#author-collab"
                                className="text-white/30 text-sm hover:text-gold-400 transition duration-300 font-medium"
                            >
                                Author Swaps & Free Copy
                            </a>
                            <button
                                type="button"
                                onClick={() => setIsContactOpen(true)}
                                className="text-gold-300 text-sm hover:text-gold-200 transition duration-300 font-semibold underline underline-offset-4 decoration-gold-400/40 cursor-pointer"
                            >
                                Contact AJ Ghost
                            </button>
                            <a
                                href="#reviews"
                                className="text-white/30 text-sm hover:text-gold-400 transition duration-300 font-medium"
                            >
                                Reader Reviews
                            </a>
                            <a
                                href="#newsletter"
                                className="text-white/30 text-sm hover:text-gold-400 transition duration-300 font-medium"
                            >
                                Newsletter
                            </a>
                            <a
                                href={AMAZON_AUTHOR_STORE}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/30 text-sm hover:text-gold-400 transition duration-300 font-medium"
                            >
                                Amazon Author Page
                            </a>
                        </nav>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            <a
                                href={AMAZON_AUTHOR_STORE}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-gold-400/80 border border-gold-400/30 rounded-full hover:text-gold-300 hover:border-gold-400/60 hover:bg-gold-400/10 transition duration-300"
                            >
                                Amazon Author Store
                            </a>
                            <a
                                href="https://dl.bookfunnel.com/j4e3jsxfr6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-white/30 border border-white/10 rounded-full hover:text-gold-400 hover:border-gold-400/30 transition duration-300"
                            >
                                BookFunnel Giveaway
                            </a>
                            <button
                                type="button"
                                onClick={() => setIsContactOpen(true)}
                                className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-white/30 border border-white/10 rounded-full hover:text-gold-400 hover:border-gold-400/30 transition duration-300"
                            >
                                Send Message
                            </button>
                        </div>

                        {/* Crack divider */}
                        <div className="crack-divider w-full mt-4"></div>

                        {/* Copyright */}
                        <div className="text-center pt-4">
                            <p className="text-white/20 text-xs font-mono tracking-wider">
                                &copy; {new Date().getFullYear()} AJ Ghost · The Ryan Kane Series · All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Contact Form Modal */}
            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
            />
        </>
    );
}