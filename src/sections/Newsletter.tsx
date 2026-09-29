"use client";

import Tag from "@/components/Tag";
import { motion } from "framer-motion";
import { Mail, BookOpen, Heart, Clock, ExternalLink, Gift, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, source: "newsletter" }),
            });
            const data = await res.json();
            if (data.success) {
                setStatus("success");
                setMessage(`You're inside the Inner Circle${name ? `, ${name}` : ""}. Watch your inbox for Chapter 1.`);
                setName("");
                setEmail("");
            } else {
                setStatus("error");
                setMessage(data.error || "Subscription failed.");
            }
        } catch {
            setStatus("error");
            setMessage("Network error. Please try again.");
        }
    };

    return (
        <section className="py-24 bg-navy-950 relative overflow-hidden" id="newsletter">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold-400/3 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold-400/3 blur-[150px] rounded-full"></div>
            </div>

            <div className="container relative">
                <div className="flex justify-center">
                    <Tag>From AJ&apos;s Desk</Tag>
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-serif font-bold text-center mt-6 tracking-tight"
                >
                    The <span className="text-gold-gradient">Inner Circle</span>
                </motion.h2>
                <p className="text-center text-white/40 mt-4 max-w-xl mx-auto">
                    Behind-the-scenes updates, free reads, and first access to everything AJ Ghost.
                </p>

                {/* --- NEWSLETTER PREVIEW CARD --- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-3xl mx-auto mt-14"
                >
                    <div className="glass-card rounded-3xl overflow-hidden border border-gold-400/20">
                        {/* Email header */}
                        <div className="bg-navy-800/50 px-6 py-4 border-b border-gold-400/10 flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-gold-400/40"></div>
                                <div className="w-3 h-3 rounded-full bg-gold-400/20"></div>
                                <div className="w-3 h-3 rounded-full bg-gold-400/10"></div>
                            </div>
                            <div className="flex-1 text-center">
                                <span className="text-xs font-mono text-white/40 tracking-wider">
                                    LATEST DISPATCH FROM AJ GHOST
                                </span>
                            </div>
                            <Mail size={16} className="text-gold-400/40" />
                        </div>

                        {/* Email body */}
                        <div className="p-6 md:p-10 space-y-6">
                            {/* Subject line */}
                            <div className="border-b border-gold-400/10 pb-6">
                                <div className="text-xs text-white/30 font-mono uppercase tracking-wider mb-2">Subject</div>
                                <h3 className="text-xl md:text-2xl font-serif font-bold text-gold-300">
                                    🔥 Free Thrillers, Fractured Ground Updates, and Something Just for You
                                </h3>
                            </div>

                            {/* Email content - conversational from AJ Ghost */}
                            <div className="space-y-5 text-white/70 leading-relaxed text-sm md:text-base">
                                <p>
                                    Hey there,
                                </p>
                                
                                <p>
                                    It&apos;s AJ. I&apos;ve been buried in edits, coffee, and reader emails this 
                                    week — and honestly? I had to come up for air just to tell you 
                                    about a few things.
                                </p>

                                {/* ARC Update Block */}
                                <div className="glass-card rounded-2xl p-5 border-l-4 border-gold-400/50 bg-navy-900/40">
                                    <div className="flex items-start gap-3">
                                        <Heart size={20} className="text-gold-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-serif font-bold text-white text-lg mb-2">
                                                Fractured Ground ARC Update
                                            </h4>
                                            <p className="text-white/60 text-sm leading-relaxed">
                                                We have <span className="text-gold-400 font-bold">22 days left</span> in 
                                                our ARC campaign for <em className="text-white/80">Fractured Ground</em>... 
                                                and I am honestly overwhelmed. The reviews are rolling in. 
                                                The reader emails are filling my inbox. And I am so very happy 
                                                that you are all <span className="text-gold-300 font-semibold">LOVING</span> this 
                                                book and are so emotionally connected to the characters.
                                            </p>
                                            <p className="text-white/60 text-sm leading-relaxed mt-3">
                                                Some of you have told me you cried. Some of you have told me 
                                                you had to put the book down and walk away for a minute. 
                                                That is exactly the reaction I was going for — and it means 
                                                the world to me that this story hit you the way I intended.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <p>
                                    Now, I want to share something with you that I think you&apos;re 
                                    going to love...
                                </p>

                                {/* BookFunnel Promo Block */}
                                <div className="glass-card rounded-2xl p-5 border-l-4 border-gold-400/50 bg-navy-900/40">
                                    <div className="flex items-start gap-3">
                                        <Gift size={20} className="text-gold-400 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-serif font-bold text-white text-lg mb-2">
                                                Free Thriller Books — Hand-Picked for You
                                            </h4>
                                            <p className="text-white/60 text-sm leading-relaxed">
                                                I&apos;ve teamed up with some incredible thriller and suspense 
                                                authors for a special giveaway. We&apos;re talking free books — 
                                                full novels and novellas — from writers who understand that a 
                                                good thriller should keep you up way past your bedtime.
                                            </p>
                                            <p className="text-white/60 text-sm leading-relaxed mt-3">
                                                If you love the kind of dark, twisty reads I write, you&apos;re 
                                                going to find your next obsession in this collection. I&apos;ve 
                                                personally browsed through these, and there are some 
                                                seriously good ones in here.
                                            </p>

                                            {/* First CTA Link */}
                                            <a 
                                                href="https://dl.bookfunnel.com/j4e3jsxfr6"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-gold-400 text-navy-950 rounded-full font-semibold text-sm hover:bg-gold-300 transition duration-300 shadow-lg shadow-gold-400/20"
                                            >
                                                <BookOpen size={16} />
                                                Browse the Free Thriller Collection
                                                <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <p>
                                    Here&apos;s the thing — these books are only available for a limited 
                                    time. The promotion runs for just a few more weeks, and once 
                                    it&apos;s over, these freebies disappear. So if you&apos;re looking to 
                                    stack your TBR pile with some quality thrillers, now&apos;s the time.
                                </p>

                                <p>
                                    Just tap below, pick the books that catch your eye, and 
                                    download them straight to your reader. It takes about 30 
                                    seconds. No catch. No gimmicks. Just free books from authors 
                                    who love this genre as much as we do.
                                </p>

                                {/* Second CTA Link */}
                                <div className="flex justify-center py-4">
                                    <a 
                                        href="https://www.amazon.com/stores/AJ-Ghost/author/B0HD9D7DRD?ref=ap_rdr&shoppingPortalEnabled=true&ccs_id=5eb73e49-2101-4a5f-b36a-2acfe6ae4c07"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gold-400/40 text-gold-300 rounded-full font-semibold text-sm hover:bg-gold-400/10 hover:border-gold-400/60 transition duration-300 group"
                                    >
                                        <Gift size={16} className="group-hover:rotate-12 transition duration-300" />
                                        Buy The Ryan Kane Series on Amazon →
                                    </a>
                                </div>

                                <p>
                                    Thank you for being part of this community. Seriously. Every 
                                    review, every email, every message you send — it fuels the 
                                    next chapter. Literally.
                                </p>

                                {/* Sign-off */}
                                <div className="pt-4 border-t border-gold-400/10">
                                    <p className="text-gold-300 font-serif italic text-lg">
                                        Stay in the shadows,
                                    </p>
                                    <p className="text-gold-400 font-serif font-bold text-xl mt-1">
                                        — AJ Ghost
                                    </p>
                                    <div className="flex items-center gap-2 mt-3">
                                        <Clock size={14} className="text-white/30" />
                                        <span className="text-xs text-white/30 font-mono">
                                            22 days remaining in the Fractured Ground ARC campaign
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Email signup below the preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-lg mx-auto mt-12 text-center"
                >
                    <p className="text-white/40 text-sm mb-4">
                        Want updates and free reads like this? Join the Inner Circle.
                    </p>

                    {status === "success" ? (
                        <div className="p-4 bg-gold-400/10 border border-gold-400/30 rounded-2xl flex items-center justify-center gap-3 text-gold-300 font-medium text-sm">
                            <CheckCircle2 className="text-gold-400" size={18} />
                            <span>{message}</span>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubscribe}
                            className="flex flex-col sm:flex-row items-center border border-gold-400/20 rounded-2xl sm:rounded-full p-1.5 bg-navy-900/50 backdrop-blur-xl shadow-lg shadow-gold-400/5 transition duration-300 hover:border-gold-400/40 focus-within:border-gold-400/50 gap-2 sm:gap-0"
                        >
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="First Name"
                                className="bg-transparent px-4 py-2 sm:py-0 w-full sm:w-2/5 text-white placeholder:text-white/25 outline-none text-sm font-medium border-b sm:border-b-0 sm:border-r border-gold-400/20"
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="your@email.com"
                                className="bg-transparent px-4 py-2 sm:py-0 flex-1 w-full text-white placeholder:text-white/25 outline-none text-sm font-medium"
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full sm:w-auto px-5 py-2.5 text-sm font-semibold bg-gold-400 text-navy-950 rounded-full hover:bg-gold-300 transition duration-300 shadow-md shadow-gold-400/20 whitespace-nowrap flex items-center justify-center gap-2"
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 size={15} className="animate-spin" />
                                        <span>Joining...</span>
                                    </>
                                ) : (
                                    "Join Free"
                                )}
                            </button>
                        </form>
                    )}

                    {status === "error" && (
                        <p className="text-red-400 text-xs mt-2">{message}</p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
