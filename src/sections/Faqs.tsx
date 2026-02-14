"use client";

import Tag from "@/components/Tag";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const faqs = [
    {
        question: "Is this a standalone novel?",
        answer: "HUNTED is Book 1 of The Watcher Series. While it tells a complete arc of Ryan's entrapment, it leads directly into the events of Book 2, 'Fractured Ground'.",
    },
    {
        question: "What are the themes?",
        answer: "The book deals heavily with Traumatic Brain Injury (TBI), PTSD, homelessness, and psychological manipulation. It is a gritty, realistic portrayal of a veteran pushing back against a predator.",
    },
    {
        question: "Who is AJ GHOST?",
        answer: "AJ Ghost is the author of dark psychological thrillers that explore the fractured minds of broken heroes. HUNTED is his latest release.",
    },
    {
        question: "Is it available in audio?",
        answer: "Yes, the audiobook captures every moment of the tension, narrated to pull you directly into Ryan's fracturing mind.",
    },
];

export default function Faqs() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <section className="py-24 bg-white" id="faqs">
            <div className="container">
                <div className="flex justify-center">
                    <Tag>Information</Tag>
                </div>
                <h2 className="text-6xl font-medium mt-6 text-center max-w-xl mx-auto tracking-tighter">
                    Questions? <span className="text-red-600">Answers.</span>
                </h2>

                <div className="mt-12 flex flex-col gap-6 max-w-xl mx-auto">
                    {faqs.map((faq, faqIndex) => (
                        <div
                            key={faq.question}
                            onClick={() => setSelectedIndex(faqIndex)}
                            className={twMerge(
                                "bg-white rounded-2xl border p-6 cursor-pointer transition duration-300",
                                selectedIndex === faqIndex ? "border-red-600 shadow-lg shadow-red-100" : "border-neutral-200"
                            )}
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="font-medium m-0 text-lg">
                                    {faq.question}
                                </h3>
                                <Plus
                                    size={30}
                                    className={twMerge(
                                        "text-red-600 flex-shrink-0 transition duration-300",
                                        selectedIndex === faqIndex && "rotate-45"
                                    )}
                                />
                            </div>

                            <AnimatePresence>
                                {selectedIndex === faqIndex && (
                                    <motion.div
                                        initial={{ height: 0, marginTop: 0 }}
                                        animate={{ height: "auto", marginTop: 24 }}
                                        exit={{ height: 0, marginTop: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-neutral-500 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}