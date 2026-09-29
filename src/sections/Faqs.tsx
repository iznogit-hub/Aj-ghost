"use client";

import Tag from "@/components/Tag";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, ExternalLink } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface FAQ {
    question: string;
    answer: string;
    linkUrl?: string;
    linkLabel?: string;
}

const faqs: FAQ[] = [
    {
        question: "Who is AJ Ghost?",
        answer: "AJ Ghost is a psychological thriller author who refuses to sanitize darkness- writing the stories that demand to be told without flinching from post-military trauma, moral complexity, and the raw cost of survival. His Ryan Kane series (a five book series, currently set to release book three, Digital Ascent in late Fall) anchors psychological unraveling in authentic experience and real trauma, offering readers clarity instead of comfort and questions instead of convenient redemption.  In an industry saturated with sanitizer thrillers, AJ Ghost stands apart because he doesn't write what sells, he writes what's true.",
    },
    {
        question: "Is HUNTED a standalone novel?",
        answer: "HUNTED is Book 1 of The Ryan Kane Series. While it delivers a complete, devastating arc — Ryan's entrapment, his unraveling, and the gut-punch revelation — it leads directly into the events of Book 2, Fractured Ground. The series is designed so each book deepens the darkness.",
    },
    {
        question: "What themes does the series explore?",
        answer: "The Ryan Kane Series deals unflinchingly with Traumatic Brain Injury (TBI), PTSD, veteran homelessness, and the psychology of manipulation. These aren't 'issue books'—they're white-knuckle thrillers that use real human trauma as the foundation for a predator-prey story that will leave you breathless. The series doesn't offer redemption or easy answers; it exposes the architecture of how broken men are systematically exploited and the unbearable cost of staying alive.",
    },
    {
        question: "What is the exclusive Ryan Kane Series ARC team?",
        answer: "The Exclusive Ryan Kane Series ARC Campaign is a reader engagement and book promotion initiative designed to build momentum for AJ Ghost's psychological thriller trilogy while creating a community of early readers who actively shape the series' success.",
    },
    {
        question: "How does the Ryan Kane Series ARC team work?",
        answer: `Readers join the ARC (Advanced Reader Copy) team by committing to leave honest Amazon reviews for each book in the Ryan Kane Series as they read. In exchange, they receive free access to the entire series—unlocking the next book only after they've posted their review for the current one. This creates a direct incentive structure: one review per book = one free book unlock. The campaign operates on urgent, rolling deadlines (typically 14-30 days per book) to maintain momentum and ensure timely review generation before official launch dates.

JOIN HERE: https://booksprout.co/reviewer/review-copy/view/313716/fractured-ground-book-two-in-the-ryan-kane-series`,
        linkUrl: "https://booksprout.co/reviewer/review-copy/view/313716/fractured-ground-book-two-in-the-ryan-kane-series",
        linkLabel: "Join the ARC Team on BookSprout",
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
                                        <p className="text-white/60 leading-relaxed text-sm whitespace-pre-line">
                                            {faq.answer}
                                        </p>
                                        {faq.linkUrl && (
                                            <div className="mt-4 pt-3 border-t border-gold-400/10">
                                                <a
                                                    href={faq.linkUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-400 text-navy-950 font-bold rounded-full text-xs hover:bg-gold-300 transition duration-300 shadow-md shadow-gold-400/20"
                                                >
                                                    <span>{faq.linkLabel || "Join the ARC Team"}</span>
                                                    <ExternalLink size={13} />
                                                </a>
                                            </div>
                                        )}
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