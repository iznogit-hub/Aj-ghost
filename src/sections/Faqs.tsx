"use client";

import Tag from "@/components/Tag";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const faqs = [
    {
        question: "What genre is HUNTED?",
        answer: "HUNTED is a dark psychological thriller with elements of military noir and suspense. It focuses heavily on the psychological state of a protagonist with a Traumatic Brain Injury (TBI).",
    },
    {
        question: "Are there content warnings?",
        answer: "Yes. The book explores themes of PTSD, Traumatic Brain Injury, homelessness, paranoia, and gaslighting. It is a gritty, realistic portrayal of survival.",
    },
    {
        question: "Is this a standalone novel?",
        answer: "HUNTED works as a standalone thriller, but it introduces the character of Ryan Kane, who may appear in future installments of The Watcher series.",
    },
    {
        question: "Is it available on Kindle Unlimited?",
        answer: "Yes, you can read HUNTED for free if you have a Kindle Unlimited subscription.",
    },
];

export default function Faqs() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <section className="py-24" id="faqs">
            <div className="container">
                <div className="flex justify-center">
                    <Tag>Faqs</Tag>
                </div>
                <h2 className="text-6xl font-medium mt-6 text-center max-w-xl mx-auto tracking-tighter">
                    Questions? We&apos;ve got{" "}
                    <span className="text-red-600">answers</span>
                </h2>

                <div className="mt-12 flex flex-col gap-6 max-w-xl mx-auto">
                    {faqs.map((faq, faqIndex) => (
                        <div
                            key={faq.question}
                            onClick={() => setSelectedIndex(faqIndex)}
                            className={twMerge(
                                "bg-white rounded-2xl border p-6 cursor-pointer shadow-sm hover:shadow-md transition duration-300",
                                selectedIndex === faqIndex ? "border-red-600 ring-1 ring-red-100" : "border-neutral-200"
                            )}
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="font-medium m-0 text-neutral-950 text-lg">
                                    {faq.question}
                                </h3>
                                <Plus
                                    size={30}
                                    className={twMerge(
                                        "text-neutral-400 flex-shrink-0 transition duration-300",
                                        selectedIndex === faqIndex && "rotate-45 text-red-600"
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
                                        <p className="text-neutral-600 leading-relaxed">
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