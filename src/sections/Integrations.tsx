"use client";

import Tag from "@/components/Tag";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, BookMarked, Star, Smartphone, Gift, ExternalLink, ShoppingCart } from "lucide-react";
import { DIGITAL_ASCENT_ARC_URL, FRACTURED_GROUND_KINDLE_URL, HUNTED_BOOKFUNNEL_URL } from "@/lib/books";

const AMAZON_AUTHOR_STORE = "https://www.amazon.com/stores/AJ-Ghost/author/B0HD9D7DRD?ref=ap_rdr&shoppingPortalEnabled=true&ccs_id=5eb73e49-2101-4a5f-b36a-2acfe6ae4c07";
const BOOKFUNNEL_FREE_LINK = HUNTED_BOOKFUNNEL_URL;

const platforms = [
    { name: "Amazon Store", icon: ShoppingCart, description: "Official Store", url: AMAZON_AUTHOR_STORE },
    { name: "Kindle", icon: BookOpen, description: "Fractured Ground", url: FRACTURED_GROUND_KINDLE_URL },
    { name: "Paperback", icon: BookMarked, description: "Print Edition", url: AMAZON_AUTHOR_STORE },
    { name: "Goodreads", icon: Star, description: "Reviews", url: "https://www.goodreads.com" },
    { name: "Apple Books", icon: Smartphone, description: "iOS", url: AMAZON_AUTHOR_STORE },
];

export default function Integrations() {
    return (
        <section className="py-24 overflow-hidden bg-navy-950 relative" id="books">
            {/* Ambient gold glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-400/5 blur-[160px] pointer-events-none rounded-full"></div>

            <div className="container relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="flex justify-center">
                        <Tag>The Ryan Kane Series</Tag>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mt-6 tracking-tight text-white">
                        Enter the <span className="text-gold-gradient">Darkness</span>
                    </h2>
                    <p className="text-white/40 mt-4 text-base md:text-lg">
                        Three books in The Ryan Kane Series. HUNTED is free. Fractured Ground is on Kindle. Digital Ascent has a free ARC.
                    </p>
                </div>

                {/* --- TWO BOOKS SHOWCASE --- */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                    
                    {/* BOOK 1: HUNTED */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-gold-400/20 hover:border-gold-400/40 transition duration-500 group"
                    >
                        <div>
                            <div className="relative w-full aspect-[2/3] max-w-[260px] mx-auto mb-6 shadow-2xl rounded-xl overflow-hidden group-hover:scale-105 transition duration-500">
                                <Image
                                    src="/haunted-cover.jpg"
                                    alt="HUNTED Book Cover by AJ Ghost"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 border border-gold-400/20 rounded-xl pointer-events-none"></div>
                            </div>

                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-mono uppercase tracking-widest text-gold-400/80">Book 1</span>
                                <span className="text-xs px-2.5 py-1 rounded-full bg-navy-800 text-gold-300 border border-gold-400/20">Now Available</span>
                            </div>

                            <h3 className="text-2xl font-serif font-bold text-white group-hover:text-gold-300 transition">HUNTED</h3>
                            <p className="text-sm text-white/50 mt-2 leading-relaxed">
                                He knows where you are. He always has. Broken veteran Ryan Kane sought help, only to find the mysterious man in a gray suit is the deadliest predator on the eastern seaboard.
                            </p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gold-400/10 flex flex-wrap items-center justify-between gap-3">
                            <a
                                href={BOOKFUNNEL_FREE_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold-400 text-navy-950 rounded-full font-bold text-xs hover:bg-gold-300 transition shadow-lg shadow-gold-400/20"
                            >
                                Get HUNTED free
                            </a>
                        </div>
                    </motion.div>

                    {/* BOOK 2: FRACTURED GROUND */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-gold-400/30 hover:border-gold-400/60 transition duration-500 relative overflow-hidden group shadow-xl shadow-gold-400/5"
                    >
                        <div>
                            <div className="relative w-full aspect-[2/3] max-w-[260px] mx-auto mb-6 shadow-2xl rounded-xl overflow-hidden group-hover:scale-105 transition duration-500">
                                <Image
                                    src="/fractured-ground.jpg"
                                    alt="FRACTURED GROUND Book Cover by AJ Ghost"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 border border-gold-400/30 rounded-xl pointer-events-none"></div>
                            </div>

                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-mono uppercase tracking-widest text-gold-400/80">Book 2</span>
                                <span className="text-xs px-2.5 py-1 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30">Kindle</span>
                            </div>

                            <h3 className="text-2xl font-serif font-bold text-white group-hover:text-gold-300 transition">FRACTURED GROUND</h3>
                            <p className="text-sm text-white/50 mt-2 leading-relaxed">
                                Every mind has a fracture point. The raw, gut-wrenching sequel that readers are calling emotionally devastating and impossible to put down.
                            </p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gold-400/10 flex flex-wrap items-center justify-between gap-3">
                            <a
                                href={FRACTURED_GROUND_KINDLE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold-400 text-navy-950 rounded-full font-bold text-xs hover:bg-gold-300 transition shadow-lg shadow-gold-400/20"
                            >
                                <ShoppingCart size={13} />
                                Read on Kindle
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between border border-gold-400/20 hover:border-gold-400/40 transition duration-500 group"
                    >
                        <div>
                            <div className="relative mx-auto mb-6 flex aspect-[2/3] w-full max-w-[260px] items-end overflow-hidden rounded-xl border border-gold-400/30 bg-navy-900 p-6 shadow-2xl">
                                <div>
                                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold-400/80">Book 3</p>
                                    <p className="mt-3 font-serif text-3xl font-bold leading-tight text-white">Digital Ascent</p>
                                    <p className="mt-3 text-sm text-white/50">The Ryan Kane Series</p>
                                </div>
                            </div>
                            <div className="mb-2 flex items-center justify-between">
                                <span className="font-mono text-xs uppercase tracking-widest text-gold-400/80">Book 3</span>
                                <span className="rounded-full border border-gold-400/30 bg-gold-400/20 px-2.5 py-1 text-xs text-gold-300">Free ARC</span>
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-white transition group-hover:text-gold-300">DIGITAL ASCENT</h3>
                            <p className="mt-2 text-sm leading-relaxed text-white/50">
                                Book three. Read the advance copy at your own pace. An honest review is welcome, and it is never required.
                            </p>
                        </div>
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gold-400/10 pt-6">
                            <a
                                href={DIGITAL_ASCENT_ARC_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-4 py-2 text-xs font-bold text-navy-950 shadow-lg shadow-gold-400/20 transition hover:bg-gold-300"
                            >
                                <Gift size={13} />
                                Get the free ARC
                            </a>
                        </div>
                    </motion.div>

                </div>

                {/* --- PLATFORMS STRIP --- */}
                <div className="mt-16 text-center">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-6">
                        Available Across Major Formats & Stores
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
                        {platforms.map((platform) => (
                            <a 
                                key={platform.name}
                                href={platform.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-gold-400/50 hover:scale-105 transition duration-300 group cursor-pointer"
                            >
                                <platform.icon 
                                    size={22} 
                                    className="text-gold-400/70 group-hover:text-gold-400 transition duration-300" 
                                />
                                <span className="text-xs font-semibold text-white/80 group-hover:text-gold-300 transition flex items-center gap-1">
                                    {platform.name}
                                    <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition" />
                                </span>
                                <span className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
                                    {platform.description}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}