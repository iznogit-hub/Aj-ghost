"use client";

import FeatureCard from "@/components/FeatureCard";
import Tag from "@/components/Tag";
import avatar1 from "@/assets/images/avatar-ashwin-santiago.jpg";
import Image from "next/image";
import Avatar from "@/components/Avatar";
import { Eye, Clock, Skull } from "lucide-react";
import { motion } from "framer-motion";

const tropes = [
    "Psychological Thriller",
    "Unreliable Narrator",
    "Military Noir",
    "Gaslighting",
    "Survival",
    "Paranoia",
    "Plot Twists",
    "Dark Suspense",
];

const parentVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

export default function Features() {
    return (
        <section className="py-24 bg-navy-gradient relative" id="books">
            {/* Decorative crack image */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent"></div>

            <div className="container">
                <div className="flex justify-center">
                    <Tag>Inside the Books</Tag>
                </div>
                <h2 className="text-5xl md:text-6xl font-serif font-bold text-center mt-6 max-w-2xl m-auto tracking-tight">
                    The trap closes{" "}
                    <span className="text-gold-gradient">slowly</span>
                </h2>
                <p className="text-center text-white/40 mt-4 max-w-xl mx-auto text-lg">
                    Each book in The Ryan Kane Series peels back another layer of darkness. 
                    Nothing is what it seems. No one is safe.
                </p>

                <motion.div
                    variants={parentVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="mt-14 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8">
                        <motion.div
                            variants={cardVariants}
                            className="md:col-span-2 lg:col-span-1"
                        >
                            <FeatureCard
                                title="The Unreliable Narrator"
                                description="Ryan's traumatic brain injury makes him doubt everything — lost hours, fabricated conversations, shifting realities. You won't know what's real either."
                            >
                                <div className="aspect-video flex items-center justify-center gap-4">
                                    <Avatar className="z-40 border-gold-400/40">
                                        <Image
                                            src={avatar1}
                                            alt="Ryan Kane"
                                            className="rounded-full grayscale"
                                        />
                                    </Avatar>
                                    <div className="bg-navy-800/50 p-3 rounded-full border border-gold-400/20">
                                        <Eye size={28} className="text-gold-400/60" />
                                    </div>
                                </div>
                            </FeatureCard>
                        </motion.div>

                        <motion.div
                            variants={cardVariants}
                            className="md:col-span-2 lg:col-span-1 group transition duration-500"
                        >
                            <FeatureCard
                                title="The Predator"
                                description="He doesn't target politicians or celebrities. He hunts the invisible ones — the veterans society stopped seeing. The ones no one will miss."
                                className="group"
                            >
                                <div className="aspect-video flex items-center justify-center">
                                    <p className="group-hover:text-gold-300 transition duration-500 text-3xl font-serif font-extrabold text-navy-700 text-center uppercase leading-tight">
                                        I see <br/>
                                        <span className="text-gold-400">Everything</span>
                                    </p>
                                </div>
                            </FeatureCard>
                        </motion.div>

                        <motion.div
                            variants={cardVariants}
                            className="md:col-span-2 md:col-start-2 lg:col-span-1 lg:col-start-auto"
                        >
                            <FeatureCard
                                title="72 Hours"
                                description="The yellow notice on his windshield gave him three days. The predator in the gray suit has been counting for weeks. Time is running out."
                            >
                                <div className="aspect-video flex justify-center items-center gap-4">
                                    <div className="text-5xl font-mono text-gold-400 font-bold tracking-widest animate-pulse-gold">
                                        72:00
                                    </div>
                                </div>
                            </FeatureCard>
                        </motion.div>
                    </div>
                </motion.div>

                <div className="my-12 flex items-center justify-center flex-wrap gap-3 max-w-3xl m-auto">
                    {tropes.map((trope) => (
                        <div
                            className="glass-card inline-flex px-4 md:px-5 md:py-2.5 py-2 rounded-full gap-3 items-center hover:scale-105 hover:border-gold-400/40 transition duration-500 group cursor-default"
                            key={trope}
                        >
                            <span className="bg-gold-400 text-navy-950 size-5 rounded-full inline-flex items-center justify-center text-xs font-bold group-hover:rotate-45 transition duration-500">
                                ✦
                            </span>
                            <span className="font-medium md:text-sm text-xs text-white/70 group-hover:text-gold-300 transition">
                                {trope}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}