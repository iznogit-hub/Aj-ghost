"use client";

import Tag from "@/components/Tag";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const faqs = [
    {
        question: "Who is AJ Ghost?",
        answer: "AJ Ghost is the dark mind behind The Watcher Series — a collection of psychological thrillers that dig into the fractured psyches of broken heroes, invisible predators, and the terrifying spaces between memory and reality. When AJ isn't writing, he's probably staring at a wall, working out how to make you cry in Chapter 17.",
    },
    {
        question: "Is HUNTED a standalone novel?",
        answer: "HUNTED is Book 1 of The Watcher Series. While it delivers a complete, devastating arc — Ryan's entrapment, his unraveling, and the gut-punch revelation — it leads directly into the events of Book 2, Fractured Ground. The series is designed so each book deepens the nightmare.",
    },
    {
        question: "What themes does the series explore?",
        answer: "The Watcher Series deals unflinchingly with Traumatic Brain Injury (TBI), PTSD, veteran homelessness, and the psychology of manipulation. These aren't 'issue books' — they're white-knuckle thrillers that use real human trauma as the foundation for a predator-prey story that will leave you breathless.",
    },
    {
        question: "What is the Fractured Ground ARC campaign?",
        answer: "Advanced Reader Copies (ARCs) let our most dedicated readers experience Fractured Ground before release day in exchange for honest reviews. The current campaign has 22 days remaining, and the response has been extraordinary — readers are telling us this one hits even harder than HUNTED.",
    },
    {
        question: "Is the audiobook available?",
        answer: "Yes. The audiobook version captures every whispered threat, every fractured memory, every moment of creeping dread. The narration is designed to make you feel like the predator is standing right behind you. Headphones recommended. Dark room preferred.",
    },
];

export default function Faqs() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <section className="py-24 bg-navy-950 relative" id="about">
            {/* Top border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent"></div>

            <div className="container">
                <div className="flex justify-center">
                    <Tag>Information</Tag>
                </div>
                <h2 className="text-5xl md:text-6xl font-serif font-bold mt-6 text-center max-w-xl mx-auto tracking-tight">
                    Questions? <span className="text-gold-gradient">Answers.</span>
                </h2>

                <div className="mt-12 flex flex-col gap-5 max-w-2xl mx-auto">
                    {faqs.map((faq, faqIndex) => (
                        <motion.div
                            key={faq.question}
                            onClick={() => setSelectedIndex(faqIndex)}
                            className={twMerge(
                                "glass-card rounded-2xl p-6 cursor-pointer transition duration-500",
                                selectedIndex === faqIndex 
                                    ? "border-gold-400/40 glow-gold" 
                                    : "border-gold-400/10 hover:border-gold-400/20"
                            )}
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="font-serif font-semibold m-0 text-lg text-white">
                                    {faq.question}
                                </h3>
                                <Plus
                                    size={24}
                                    className={twMerge(
                                        "text-gold-400 flex-shrink-0 transition duration-300",
                                        selectedIndex === faqIndex && "rotate-45"
                                    )}
                                />
                            </div>

                            <AnimatePresence>
                                {selectedIndex === faqIndex && (
                                    <motion.div
                                        initial={{ height: 0, marginTop: 0 }}
                                        animate={{ height: "auto", marginTop: 20 }}
                                        exit={{ height: 0, marginTop: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-white/45 leading-relaxed text-sm">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}