"use client";

import FeatureCard from "@/components/FeatureCard";
import Tag from "@/components/Tag";
import avatar1 from "@/assets/images/avatar-ashwin-santiago.jpg";
import avatar2 from "@/assets/images/avatar-florence-shaw.jpg";
import avatar3 from "@/assets/images/avatar-lula-meyers.jpg";
import Image from "next/image";
import Avatar from "@/components/Avatar";
import { Eye, Clock, Skull } from "lucide-react"; // Changed icons
import Key from "@/components/Key";
import { motion } from "framer-motion";

const features = [
    "Psychological Thriller",
    "Unreliable Narrator",
    "Military Noir",
    "Gaslighting",
    "Survival",
    "Paranoia",
    "Plot Twists",
];

const parentVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.7,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function Features() {
    return (
        <section className="py-24 bg-neutral-50" id="features">
            <div className="container">
                <div className="flex justify-center">
                    <Tag>Inside the Book</Tag>
                </div>
                <h2 className="text-6xl font-medium text-center mt-6 max-w-2xl m-auto tracking-tighter">
                    The trap closes <span className="text-red-600">slowly</span>
                </h2>
                <motion.div
                    variants={parentVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8">
                        <motion.div
                            variants={cardVariants}
                            className="md:col-span-2 lg:col-span-1"
                        >
                            <FeatureCard
                                title="The Unreliable Narrator"
                                description="Ryan's TBI makes him doubt his own mind. He loses hours, forgets conversations, and questions reality."
                            >
                                <div className="aspect-video flex items-center justify-center gap-2">
                                    <Avatar className="z-40 border-red-600">
                                        <Image
                                            src={avatar1}
                                            alt="Ryan Kane"
                                            className="rounded-full grayscale"
                                        />
                                    </Avatar>
                                    {/* Visual representation of confusion/surveillance */}
                                    <div className="bg-neutral-100 p-2 rounded-full border border-neutral-200">
                                        <Eye size={30} className="text-neutral-500" />
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
                                description="Skull doesn't target politicians. He hunts the invisible ones. The veterans society stopped seeing."
                                className="group"
                            >
                                <div className="aspect-video flex items-center justify-center">
                                    <p className="group-hover:text-red-900 transition duration-500 text-3xl font-extrabold text-neutral-300 text-center uppercase leading-tight">
                                        I see <br/>
                                        <span className="text-red-600">Everything</span>
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
                                description="The yellow notice on his windshield gave him three days. Skull has been counting for weeks."
                            >
                                <div className="aspect-video flex justify-center items-center gap-4">
                                    <div className="text-5xl font-mono text-red-600 font-bold tracking-widest">
                                        72:00
                                    </div>
                                </div>
                            </FeatureCard>
                        </motion.div>
                    </div>
                </motion.div>

                <div className="my-8 flex items-center justify-center flex-wrap gap-2 max-w-3xl m-auto">
                    {features.map((feature) => (
                        <div
                            className="bg-white border border-neutral-200 inline-flex px-3 md:px-5 md:py-2 py-1.5 rounded-2xl gap-3 items-center hover:scale-105 hover:border-red-600 transition duration-500 group"
                            key={feature}
                        >
                            <span className="bg-red-600 text-white size-5 rounded-full inline-flex items-center justify-center text-xl group-hover:rotate-45 transition duration-500">
                                &#10038;
                            </span>
                            <span className="font-medium md:text-lg text-neutral-800">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}