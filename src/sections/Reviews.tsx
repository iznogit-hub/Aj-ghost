"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tag from "@/components/Tag";
import { Star, ChevronLeft, ChevronRight, CheckCircle2, ExternalLink, Quote } from "lucide-react";

interface Review {
    id: string;
    book: "HUNTED" | "Fractured Ground";
    reviewer: string;
    reviewerBadge: string;
    rating: number;
    date: string;
    headline: string;
    content: string;
}

const reviewsData: Review[] = [
    {
        id: "hunted-1",
        book: "HUNTED",
        reviewer: "M. Vance",
        reviewerBadge: "Verified Amazon Purchase · Top 500 Reviewer",
        rating: 5,
        date: "United States",
        headline: "A masterclass in psychological dread. Unflinching and terrifyingly real.",
        content: "They told Ryan to 'get help', but nobody warned him about the predator waiting in the gray suit. As a reader of psychological suspense, you get used to twists you can spot fifty pages away—HUNTED completely blew those expectations apart. Ryan Kane's struggle with TBI and lost time makes him one of the most compelling and vulnerable protagonists I've read in years. The pacing doesn't just build; it suffocates in the best way possible. Read it in a single sitting.",
    },
    {
        id: "fractured-1",
        book: "Fractured Ground",
        reviewer: "Elena Torres",
        reviewerBadge: "Verified Amazon Purchase · ARC Reader",
        rating: 5,
        date: "United States",
        headline: "Devastating, raw, and impossible to put down. Hits even harder than Book 1.",
        content: "If you thought HUNTED took you to the edge, Fractured Ground pulls the ground right out from underneath your feet. Every mind has a fracture point, and watching Ryan navigate the fallout of what happened broke my heart. I literally had to close the book in chapter 14 and just breathe for a few minutes. AJ Ghost refuses to offer cheap redemption, and the story is infinitely better for it. White-knuckle tension from start to finish.",
    },
    {
        id: "hunted-2",
        book: "HUNTED",
        reviewer: "David R.",
        reviewerBadge: "Verified Amazon Purchase · Military Veteran",
        rating: 5,
        date: "United States",
        headline: "Finally, an author who portrays post-service trauma with authentic grit.",
        content: "AJ Ghost doesn't write sugar-coated thrillers. The depiction of veteran vulnerability, the alienation, and how easily predators can exploit fractured minds is chillingly accurate. This isn't just an action book; it's a deep psychological examination of predator versus prey. The ending gave me absolute chills. Can't wait for book three.",
    },
    {
        id: "fractured-2",
        book: "Fractured Ground",
        reviewer: "Marcus T.",
        reviewerBadge: "Verified Amazon Purchase",
        rating: 5,
        date: "United States",
        headline: "White-knuckle psychological suspense at its finest.",
        content: "The stakes are exponentially higher in this sequel. The exploration of trauma, memory loss, and calculated manipulation is brilliant. The Ryan Kane Series has quickly become my favorite active thriller series. AJ Ghost writes with razor-sharp prose and zero filler. You are kept guessing right up to the final breath.",
    },
    {
        id: "hunted-3",
        book: "HUNTED",
        reviewer: "Sarah Jenkins",
        reviewerBadge: "Verified Amazon Purchase",
        rating: 5,
        date: "United States",
        headline: "Kept me awake until 3 AM. The psychological manipulation was terrifying.",
        content: "I couldn't put this down. The tension between Ryan and the mysterious man in the gray suit is palpable on every single page. The author's ability to pull you into Ryan's paranoia until you start questioning reality yourself is extraordinary. One of the best psychological thrillers of the year.",
    },
    {
        id: "fractured-3",
        book: "Fractured Ground",
        reviewer: "Rachel Campbell",
        reviewerBadge: "Verified Amazon Purchase · Early ARC Team",
        rating: 5,
        date: "United States",
        headline: "Pure adrenaline and emotional depth. 5 massive stars.",
        content: "Being on the ARC team for Fractured Ground was an unforgettable ride. The emotional stakes are immense, and the twists left me stunned. You feel every ounce of Ryan's exhaustion and determination. If you love dark, gritty thrillers with genuine psychological depth, buy this now.",
    },
];

const AMAZON_AUTHOR_STORE = "https://www.amazon.com/stores/AJ-Ghost/author/B0HD9D7DRD?ref=ap_rdr&shoppingPortalEnabled=true&ccs_id=5eb73e49-2101-4a5f-b36a-2acfe6ae4c07";

export default function Reviews() {
    const [filter, setFilter] = useState<"ALL" | "HUNTED" | "Fractured Ground">("ALL");
    const [currentIndex, setCurrentIndex] = useState(0);

    const filteredReviews = reviewsData.filter((r) => {
        if (filter === "ALL") return true;
        return r.book === filter;
    });

    const currentReview = filteredReviews[currentIndex % filteredReviews.length] || filteredReviews[0];

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? filteredReviews.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === filteredReviews.length - 1 ? 0 : prev + 1));
    };

    const handleFilterChange = (newFilter: "ALL" | "HUNTED" | "Fractured Ground") => {
        setFilter(newFilter);
        setCurrentIndex(0);
    };

    return (
        <section className="py-24 bg-navy-950 relative overflow-hidden" id="reviews">
            {/* Ambient lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold-400/5 blur-[180px] pointer-events-none rounded-full" />

            <div className="container relative z-10 max-w-5xl mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="flex justify-center">
                        <Tag>Amazon Reader Reviews</Tag>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-6 tracking-tight text-white">
                        Readers on <span className="text-gold-gradient">The Ryan Kane Series</span>
                    </h2>
                    <p className="text-white/45 mt-4 text-base md:text-lg">
                        In-depth verified reviews from readers across Amazon and the early ARC team.
                    </p>

                    {/* Book Filter Pills */}
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                        <button
                            onClick={() => handleFilterChange("ALL")}
                            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition duration-300 ${
                                filter === "ALL"
                                    ? "bg-gold-400 text-navy-950 font-bold shadow-md shadow-gold-400/20"
                                    : "bg-navy-900/60 border border-gold-400/20 text-white/60 hover:text-white"
                            }`}
                        >
                            All Reviews ({reviewsData.length})
                        </button>
                        <button
                            onClick={() => handleFilterChange("HUNTED")}
                            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition duration-300 ${
                                filter === "HUNTED"
                                    ? "bg-gold-400 text-navy-950 font-bold shadow-md shadow-gold-400/20"
                                    : "bg-navy-900/60 border border-gold-400/20 text-white/60 hover:text-white"
                            }`}
                        >
                            HUNTED (Book 1)
                        </button>
                        <button
                            onClick={() => handleFilterChange("Fractured Ground")}
                            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition duration-300 ${
                                filter === "Fractured Ground"
                                    ? "bg-gold-400 text-navy-950 font-bold shadow-md shadow-gold-400/20"
                                    : "bg-navy-900/60 border border-gold-400/20 text-white/60 hover:text-white"
                            }`}
                        >
                            Fractured Ground (Book 2)
                        </button>
                    </div>
                </div>

                {/* --- FEATURED STAGNANT / CAROUSEL CARD --- */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentReview.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.35 }}
                            className="glass-card rounded-3xl p-8 md:p-12 border border-gold-400/30 shadow-2xl shadow-gold-400/5 relative overflow-hidden"
                        >
                            {/* Watermark Quote Icon */}
                            <Quote
                                size={120}
                                className="absolute -top-4 -right-4 text-gold-400/[0.04] pointer-events-none"
                            />

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold-400/10 pb-6 mb-6">
                                <div>
                                    <div className="flex items-center gap-1.5 text-gold-400 mb-2">
                                        {[...Array(currentReview.rating)].map((_, i) => (
                                            <Star key={i} size={18} className="fill-gold-400 text-gold-400" />
                                        ))}
                                        <span className="text-white font-mono text-sm ml-2 font-bold">5.0 out of 5 stars</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 text-xs">
                                        <span className="font-semibold text-white">{currentReview.reviewer}</span>
                                        <span className="text-white/30">•</span>
                                        <span className="inline-flex items-center gap-1 text-gold-300/80 bg-gold-400/10 px-2.5 py-0.5 rounded-full border border-gold-400/20 font-mono text-[11px]">
                                            <CheckCircle2 size={12} className="text-gold-400" />
                                            {currentReview.reviewerBadge}
                                        </span>
                                    </div>
                                </div>

                                <div className="self-start md:self-auto">
                                    <span className="text-xs font-mono uppercase tracking-widest px-3 py-1.5 rounded-full bg-navy-800 text-gold-300 border border-gold-400/20">
                                        {currentReview.book}
                                    </span>
                                </div>
                            </div>

                            {/* Headline */}
                            <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-4 leading-snug">
                                &ldquo;{currentReview.headline}&rdquo;
                            </h3>

                            {/* Review Content */}
                            <p className="text-white/70 text-base md:text-lg leading-relaxed font-sans mb-8">
                                {currentReview.content}
                            </p>

                            {/* Footer Info */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gold-400/10 text-xs font-mono text-white/40">
                                <span>Reviewed on Amazon · {currentReview.date}</span>
                                <a
                                    href={AMAZON_AUTHOR_STORE}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-gold-300 hover:text-gold-200 transition font-sans font-semibold text-sm"
                                >
                                    <span>Read on Amazon</span>
                                    <ExternalLink size={14} />
                                </a>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between mt-8">
                        <div className="flex items-center gap-2">
                            {filteredReviews.map((r, idx) => (
                                <button
                                    key={r.id}
                                    onClick={() => setCurrentIndex(idx)}
                                    aria-label={`Go to review ${idx + 1}`}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        currentIndex === idx ? "w-8 bg-gold-400" : "w-2 bg-white/20 hover:bg-white/40"
                                    }`}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-white/40 mr-2">
                                {currentIndex + 1} of {filteredReviews.length}
                            </span>
                            <button
                                onClick={handlePrev}
                                aria-label="Previous review"
                                className="p-3 rounded-full bg-navy-900 border border-gold-400/20 text-gold-300 hover:bg-gold-400 hover:text-navy-950 transition duration-300 shadow-md"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={handleNext}
                                aria-label="Next review"
                                className="p-3 rounded-full bg-navy-900 border border-gold-400/20 text-gold-300 hover:bg-gold-400 hover:text-navy-950 transition duration-300 shadow-md"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom link to full Amazon Author store */}
                <div className="text-center mt-12">
                    <a
                        href={AMAZON_AUTHOR_STORE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-gold-400/80 hover:text-gold-300 font-semibold transition"
                    >
                        <span>View all books & customer reviews on AJ Ghost&apos;s Amazon Store</span>
                        <ExternalLink size={15} />
                    </a>
                </div>
            </div>
        </section>
    );
}
