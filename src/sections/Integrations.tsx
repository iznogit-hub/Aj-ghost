"use client";

import Tag from "@/components/Tag";
import Image from "next/image";
import designExample1 from "@/assets/images/design-example-1.png";
import { motion } from "framer-motion";
import { BookOpen, Headphones, BookMarked, Star, Smartphone, BookCopy } from "lucide-react";

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
        <section className="py-24 overflow-hidden bg-navy-900 relative" id="integrations">
            {/* Top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent"></div>

            <div className="container">
                <div className="grid lg:grid-cols-2 items-center gap-16">
                    
                    {/* --- LEFT COLUMN: BOOK COVER --- */}
                    <motion.div 
                        className="flex justify-center lg:justify-start relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Gold glow behind book */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-gold-400/10 blur-[100px] rounded-full pointer-events-none"></div>
                        
                        <div className="relative w-[280px] md:w-[360px] aspect-[2/3] rotate-3 hover:rotate-0 transition duration-700 group">
                            <Image
                                src={designExample1}
                                alt="HUNTED Book Cover by AJ Ghost"
                                fill
                                className="object-contain drop-shadow-2xl group-hover:scale-105 transition duration-700"
                            />
                            {/* Gold frame accent */}
                            <div className="absolute inset-0 border-2 border-gold-400/10 rounded-lg group-hover:border-gold-400/30 transition duration-700"></div>
                        </div>
                    </motion.div>

                    {/* --- RIGHT COLUMN: TEXT & PLATFORMS --- */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Tag>Availability</Tag>
                        <h2 className="text-5xl md:text-6xl font-serif font-bold mt-6 tracking-tight text-white">
                            Read it{" "}
                            <span className="text-gold-gradient">Anywhere</span>
                        </h2>

                        <p className="text-white/40 mt-4 text-lg leading-relaxed mb-10">
                            HUNTED is available across every format. Whether you crave the blue-light glow of 
                            a Kindle at 2 AM, the whisper of a narrator pulling you deeper into the darkness, 
                            or the weight of a book that keeps you locked to the page — the nightmare is ready.
                        </p>

                        {/* Platform Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {platforms.map((platform) => (
                                <div 
                                    key={platform.name}
                                    className="glass-card p-5 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-gold-400/40 transition duration-300 group cursor-pointer"
                                >
                                    <platform.icon 
                                        size={28} 
                                        className="text-gold-400/50 group-hover:text-gold-400 transition duration-300" 
                                    />
                                    <span className="text-sm font-semibold text-white/70 group-hover:text-white transition">
                                        {platform.name}
                                    </span>
                                    <span className="text-xs text-white/30 font-mono uppercase tracking-wider">
                                        {platform.description}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent"></div>
        </section>
    );
}