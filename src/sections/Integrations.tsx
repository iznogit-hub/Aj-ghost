"use client";

import Tag from "@/components/Tag";
import Image from "next/image";
import designExample1 from "@/assets/images/design-example-1.png";
import { motion } from "framer-motion";
import { BookOpen, Headphones, BookMarked, Star, Smartphone, BookCopy, Clock, Gift, ExternalLink } from "lucide-react";

const platforms = [
    { name: "Kindle", icon: BookOpen, description: "eBook" },
    { name: "Audible", icon: Headphones, description: "Audiobook" },
    { name: "Paperback", icon: BookMarked, description: "Print" },
    { name: "Goodreads", icon: Star, description: "Reviews" },
    { name: "Apple Books", icon: Smartphone, description: "iOS" },
    { name: "Hardcover", icon: BookCopy, description: "Collector" },
];

export default function Integrations() {
    return (
        <section className="py-24 overflow-hidden bg-navy-950 relative" id="books">
            {/* Ambient gold glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-400/5 blur-[160px] pointer-events-none rounded-full"></div>

            <div className="container relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="flex justify-center">
                        <Tag>The Watcher Series</Tag>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mt-6 tracking-tight text-white">
                        Enter the <span className="text-gold-gradient">Nightmare</span>
                    </h2>
                    <p className="text-white/40 mt-4 text-base md:text-lg">
                        Two psychological thrillers that will test the limits of your trust and sanity.
                    </p>
                </div>

                {/* --- TWO BOOKS SHOWCASE --- */}
                <div className="grid md:grid-cols-2 gap-10 lg:gap-14 max-w-5xl mx-auto mb-20">
                    
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
                                    src={designExample1}
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
                                He knows where you are. He always has. Broken veteran Ryan Kane sought help, only to find the therapist is the deadliest predator on the eastern seaboard.
                            </p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gold-400/10 flex items-center justify-between">
                            <span className="text-xs font-mono text-white/40">4.8 ★ on Goodreads</span>
                            <a
                                href="https://books.bookfunnel.com/thrillingfreebies-sep/ipph5qfp15"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300 hover:text-gold-200 transition"
                            >
                                Free in Promo <ExternalLink size={13} />
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
                        {/* Countdown Badge */}
                        <div className="absolute top-4 right-4 bg-gold-400 text-navy-950 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                            <Clock size={12} />
                            <span>22 Days Left in ARC</span>
                        </div>

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
                                <span className="text-xs px-2.5 py-1 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30">Active ARC Campaign</span>
                            </div>

                            <h3 className="text-2xl font-serif font-bold text-white group-hover:text-gold-300 transition">FRACTURED GROUND</h3>
                            <p className="text-sm text-white/50 mt-2 leading-relaxed">
                                Every mind has a fracture point. The raw, gut-wrenching sequel that readers are calling emotionally devastating and impossible to put down.
                            </p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gold-400/10 flex items-center justify-between">
                            <span className="text-xs font-mono text-gold-400/70">Early Reader ARC Copies</span>
                            <a
                                href="#newsletter"
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold-400 text-navy-950 rounded-full font-bold text-xs hover:bg-gold-300 transition shadow-lg shadow-gold-400/20"
                            >
                                <Gift size={13} />
                                Claim ARC Spot
                            </a>
                        </div>
                    </motion.div>

                </div>

                {/* --- PLATFORMS STRIP --- */}
                <div className="mt-16 text-center">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-6">
                        Available Across All Major Formats
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto">
                        {platforms.map((platform) => (
                            <div 
                                key={platform.name}
                                className="glass-card p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-gold-400/40 transition duration-300 group cursor-default"
                            >
                                <platform.icon 
                                    size={22} 
                                    className="text-gold-400/60 group-hover:text-gold-400 transition duration-300" 
                                />
                                <span className="text-xs font-semibold text-white/80 group-hover:text-white transition">
                                    {platform.name}
                                </span>
                                <span className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
                                    {platform.description}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}