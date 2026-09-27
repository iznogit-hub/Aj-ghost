"use client";

import { motion } from "framer-motion";
import React from "react";

const accolades = [
    "★★★★★ \"Unputdownable\"",
    "Psychological Thriller of the Year",
    "\"Best debut since Gone Girl\"",
    "#1 New Release · Kindle",
    "BookTok Sensation",
    "\"Absolutely devastating\"",
    "Featured on ThrillerFix",
    "Amazon Bestseller",
];

export default function LogoTicker() {
    return (
        <section className="py-16 overflow-x-clip bg-navy-950 relative">
            {/* Gold crack line top */}
            <div className="crack-divider mb-16"></div>

            <div className="container">
                <h3 className="text-center text-white/30 text-sm uppercase font-mono tracking-[0.3em]">
                    Readers are talking
                </h3>
                <div className="flex overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <motion.div
                        animate={{ x: "-50%" }}
                        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                        className="flex gap-16 pr-16"
                    >
                        {Array.from({ length: 2 }).map((_, i) => (
                            <React.Fragment key={i}>
                                {accolades.map((text) => (
                                    <div key={text} className="flex items-center gap-4 whitespace-nowrap">
                                        <span className="text-gold-400 text-lg">✦</span>
                                        <span className="text-white/40 text-sm font-medium tracking-wide uppercase">
                                            {text}
                                        </span>
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Gold crack line bottom */}
            <div className="crack-divider mt-16"></div>
        </section>
    );
}