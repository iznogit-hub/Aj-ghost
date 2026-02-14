"use client";
import quantumLogo from "@/assets/images/quantum.svg";
// ... imports
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const logos = [
    { name: "Quantum", image: quantumLogo },
    // Add more logos here with their imported images
];

export default function LogoTicker() {
    return (
        <section className="py-24 overflow-x-clip bg-white">
            <div className="container">
                <h3 className="text-center text-neutral-500 text-xl font-mono">
                    Featured in top thriller communities
                </h3>
                <div className="flex overflow-hidden mt-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <motion.div
                        animate={{ x: "-50%" }}
                        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                        className="flex gap-24 pr-24 "
                    >
                        {Array.from({ length: 2 }).map((_, i) => (
                            <React.Fragment key={i}>
                                {logos.map((each) => (
                                    <Image
                                        src={each.image}
                                        alt={each.name}
                                        key={each.name}
                                        // CHANGED: Added invert to turn white logos black
                                        className="invert opacity-80" 
                                    />
                                ))}
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}