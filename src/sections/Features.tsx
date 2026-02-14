"use client";

import FeatureCard from "@/components/FeatureCard";
import Tag from "@/components/Tag";
import { motion } from "framer-motion";
import { Star, User, MessageSquareQuote } from "lucide-react"; // Make sure to install lucide-react if not present

const testimonials = [
    {
        name: "Verified Reader",
        quote: "I literally couldn't put it down. I missed work because I had to finish it.",
        rating: 5,
    },
    {
        name: "Thriller Addict",
        quote: "The plot twists just kept coming. Just when you think you know the truth, everything flips.",
        rating: 5,
    },
    {
        name: "Book Club Host",
        quote: "Dark, gritty, and incredibly smart. The unreliable narrator aspect was handled perfectly.",
        rating: 5,
    },
];

const parentVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function Features() {
    return (
        <section className="py-24 bg-neutral-50" id="testimonials">
            <div className="container">
                <div className="flex justify-center">
                    <Tag>Reviews</Tag>
                </div>
                <h2 className="text-6xl font-medium text-center mt-6 max-w-2xl mx-auto tracking-tighter">
                    Don't just take our <span className="text-neutral-400">word</span> for it.
                </h2>
                
                <motion.div
                    variants={parentVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {testimonials.map((t, i) => (
                        <motion.div key={i} variants={cardVariants}>
                            <div className="bg-white border border-neutral-200 p-8 rounded-3xl h-full flex flex-col justify-between shadow-sm hover:shadow-md transition duration-300">
                                <div>
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} size={20} className="fill-neutral-950 text-neutral-950" />
                                        ))}
                                    </div>
                                    <MessageSquareQuote size={40} className="text-neutral-200 mb-4" />
                                    <p className="text-xl font-medium leading-relaxed text-neutral-800">
                                        &ldquo;{t.quote}&rdquo;
                                    </p>
                                </div>
                                <div className="mt-8 flex items-center gap-3 pt-8 border-t border-neutral-100">
                                    <div className="bg-neutral-100 p-2 rounded-full">
                                        <User size={20} className="text-neutral-500" />
                                    </div>
                                    <span className="font-mono text-sm font-semibold uppercase tracking-wider text-neutral-500">
                                        {t.name}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}