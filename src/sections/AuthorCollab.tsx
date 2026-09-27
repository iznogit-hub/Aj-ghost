"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tag from "@/components/Tag";
import Button from "@/components/Button";
import { 
    BookOpen, 
    Share2, 
    Sparkles, 
    Download, 
    Mail, 
    CheckCircle2, 
    Loader2, 
    Users, 
    ArrowRight, 
    ExternalLink,
    ShieldAlert,
    BookCheck
} from "lucide-react";

export default function AuthorCollab() {
    const [activeTab, setActiveTab] = useState<"comp" | "swap" | "kit">("comp");

    // Form 1: Instant Comp Copy
    const [compName, setCompName] = useState("");
    const [compEmail, setCompEmail] = useState("");
    const [compBook, setCompBook] = useState("Fractured Ground (ARC)");
    const [compFormat, setCompFormat] = useState("epub");
    const [compStatus, setCompStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [compMsg, setCompMsg] = useState("");
    const [downloadUrl, setDownloadUrl] = useState("");

    // Form 2: Newsletter Swap Pitch
    const [swapAuthor, setSwapAuthor] = useState("");
    const [swapEmail, setSwapEmail] = useState("");
    const [swapBookTitle, setSwapBookTitle] = useState("");
    const [swapListSize, setSwapListSize] = useState("1k - 5k");
    const [swapDate, setSwapDate] = useState("");
    const [swapLink, setSwapLink] = useState("");
    const [swapStatus, setSwapStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [swapMsg, setSwapMsg] = useState("");

    const handleClaimComp = async (e: React.FormEvent) => {
        e.preventDefault();
        setCompStatus("loading");

        try {
            const res = await fetch("/api/author-collab", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "comp_copy",
                    authorName: compName,
                    email: compEmail,
                    bookTitle: compBook,
                    format: compFormat
                }),
            });
            const data = await res.json();
            if (data.success) {
                setCompStatus("success");
                setCompMsg(data.message);
                setDownloadUrl(data.downloadUrl || "https://books.bookfunnel.com/thrillingfreebies-sep/ipph5qfp15");
            } else {
                setCompStatus("error");
                setCompMsg(data.error || "Unable to claim comp copy.");
            }
        } catch {
            setCompStatus("error");
            setCompMsg("Network connection error.");
        }
    };

    const handleSwapSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSwapStatus("loading");

        try {
            const res = await fetch("/api/author-collab", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "newsletter_swap",
                    authorName: swapAuthor,
                    email: swapEmail,
                    partnerBookTitle: swapBookTitle,
                    listSize: swapListSize,
                    proposedDate: swapDate,
                    bookLink: swapLink
                }),
            });
            const data = await res.json();
            if (data.success) {
                setSwapStatus("success");
                setSwapMsg(data.message);
                setSwapAuthor("");
                setSwapEmail("");
                setSwapBookTitle("");
                setSwapLink("");
            } else {
                setSwapStatus("error");
                setSwapMsg(data.error || "Failed to submit swap proposal.");
            }
        } catch {
            setSwapStatus("error");
            setSwapMsg("Network error.");
        }
    };

    return (
        <section className="py-24 bg-navy-900/60 relative overflow-hidden" id="author-collab">
            {/* Ambient gold glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gold-400/5 blur-[140px] pointer-events-none rounded-full" />
            <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gold-400/5 blur-[120px] pointer-events-none rounded-full" />

            <div className="container relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="flex justify-center">
                        <Tag>Fellow Author Lounge</Tag>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mt-6 tracking-tight text-white">
                        Write Dark Fiction?{" "}
                        <span className="text-gold-gradient">Let&apos;s Partner Up.</span>
                    </h2>
                    <p className="text-white/50 mt-4 text-base md:text-lg leading-relaxed">
                        Are you a thriller, suspense, or crime author? We rise together. 
                        Grab a complimentary author review copy of AJ Ghost&apos;s books, propose a newsletter swap, 
                        or cross-promote to a hungry psychological thriller readership.
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex justify-center mt-12 mb-10">
                    <div className="glass-card p-1.5 rounded-full inline-flex gap-2 border border-gold-400/20">
                        <button
                            onClick={() => setActiveTab("comp")}
                            className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition duration-300 flex items-center gap-2 ${
                                activeTab === "comp"
                                    ? "bg-gold-400 text-navy-950 shadow-md shadow-gold-400/20"
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            <Download size={15} />
                            Get Free Author Copy
                        </button>
                        <button
                            onClick={() => setActiveTab("swap")}
                            className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition duration-300 flex items-center gap-2 ${
                                activeTab === "swap"
                                    ? "bg-gold-400 text-navy-950 shadow-md shadow-gold-400/20"
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            <Share2 size={15} />
                            Propose Newsletter Swap
                        </button>
                        <button
                            onClick={() => setActiveTab("kit")}
                            className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition duration-300 flex items-center gap-2 ${
                                activeTab === "kit"
                                    ? "bg-gold-400 text-navy-950 shadow-md shadow-gold-400/20"
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            <Sparkles size={15} />
                            Author Kit & Tropes
                        </button>
                    </div>
                </div>

                {/* Tab Content Panes */}
                <div className="max-w-3xl mx-auto">
                    <AnimatePresence mode="wait">
                        {/* TAB 1: INSTANT COMP COPY */}
                        {activeTab === "comp" && (
                            <motion.div
                                key="comp"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.35 }}
                                className="glass-card rounded-3xl p-8 md:p-10 border border-gold-400/30"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-gold-400/10 rounded-xl border border-gold-400/20 text-gold-400">
                                        <BookCheck size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                                            Instant Author Review & Comp Copy
                                        </h3>
                                        <p className="text-xs md:text-sm text-white/40">
                                            Complimentary full copies for fellow authors, book bloggers, and podcasters.
                                        </p>
                                    </div>
                                </div>

                                {compStatus === "success" ? (
                                    <div className="p-6 bg-gold-400/10 border border-gold-400/40 rounded-2xl text-center space-y-4">
                                        <CheckCircle2 size={36} className="text-gold-400 mx-auto" />
                                        <h4 className="text-lg font-serif font-bold text-white">
                                            Comp Copy Access Granted!
                                        </h4>
                                        <p className="text-sm text-white/70">
                                            {compMsg}
                                        </p>
                                        <div className="pt-2">
                                            <a
                                                href={downloadUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-400 text-navy-950 font-bold rounded-full text-sm hover:bg-gold-300 transition shadow-lg shadow-gold-400/20"
                                            >
                                                <Download size={16} />
                                                Download Your Book Now on BookFunnel
                                                <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleClaimComp} className="space-y-5">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                                                    Author / Pen Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={compName}
                                                    onChange={(e) => setCompName(e.target.value)}
                                                    required
                                                    placeholder="e.g. Rachel Thorne"
                                                    className="w-full px-4 py-3 rounded-xl bg-navy-950/70 border border-gold-400/20 text-white placeholder:text-white/20 text-sm focus:border-gold-400/50 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    value={compEmail}
                                                    onChange={(e) => setCompEmail(e.target.value)}
                                                    required
                                                    placeholder="author@yourdomain.com"
                                                    className="w-full px-4 py-3 rounded-xl bg-navy-950/70 border border-gold-400/20 text-white placeholder:text-white/20 text-sm focus:border-gold-400/50 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                                                    Select Book
                                                </label>
                                                <select
                                                    value={compBook}
                                                    onChange={(e) => setCompBook(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl bg-navy-950/70 border border-gold-400/20 text-white text-sm focus:border-gold-400/50 outline-none cursor-pointer"
                                                >
                                                    <option value="Fractured Ground (ARC)">Fractured Ground (Upcoming ARC - 22 Days Left)</option>
                                                    <option value="HUNTED (Book 1)">HUNTED (The Watcher Series Book 1)</option>
                                                    <option value="Both Books Pack">Both Books (Full Author Bundle)</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                                                    Preferred Format
                                                </label>
                                                <select
                                                    value={compFormat}
                                                    onChange={(e) => setCompFormat(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl bg-navy-950/70 border border-gold-400/20 text-white text-sm focus:border-gold-400/50 outline-none cursor-pointer"
                                                >
                                                    <option value="epub">ePub (Apple Books, Kobo, Nook)</option>
                                                    <option value="mobi">Kindle / MOBI / Send-to-Kindle</option>
                                                    <option value="pdf">PDF (Print Preview)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="pt-2 flex items-center justify-between">
                                            <span className="text-xs text-white/30">
                                                * Delivered instantly via BookFunnel secure author distribution.
                                            </span>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                type="submit"
                                                disabled={compStatus === "loading"}
                                                className="flex items-center gap-2"
                                            >
                                                {compStatus === "loading" ? (
                                                    <>
                                                        <Loader2 size={16} className="animate-spin" />
                                                        <span>Preparing Copy...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Download size={15} />
                                                        <span>Claim Free Author Copy</span>
                                                    </>
                                                )}
                                            </Button>
                                        </div>

                                        {compStatus === "error" && (
                                            <p className="text-xs text-red-400 mt-2">{compMsg}</p>
                                        )}
                                    </form>
                                )}
                            </motion.div>
                        )}

                        {/* TAB 2: NEWSLETTER SWAP PITCH */}
                        {activeTab === "swap" && (
                            <motion.div
                                key="swap"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.35 }}
                                className="glass-card rounded-3xl p-8 md:p-10 border border-gold-400/30"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 bg-gold-400/10 rounded-xl border border-gold-400/20 text-gold-400">
                                        <Share2 size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                                            Propose a Newsletter Cross-Promotion
                                        </h3>
                                        <p className="text-xs md:text-sm text-white/40">
                                            Feature AJ Ghost in your newsletter; we feature you to our active thriller readers.
                                        </p>
                                    </div>
                                </div>

                                {swapStatus === "success" ? (
                                    <div className="p-6 bg-gold-400/10 border border-gold-400/40 rounded-2xl text-center space-y-3">
                                        <CheckCircle2 size={36} className="text-gold-400 mx-auto" />
                                        <h4 className="text-lg font-serif font-bold text-white">
                                            Swap Proposal Received!
                                        </h4>
                                        <p className="text-sm text-white/70">
                                            {swapMsg}
                                        </p>
                                        <p className="text-xs text-white/40">
                                            AJ Ghost will review your tropes and send custom newsletter blurb assets within 24 hours.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSwapSubmit} className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                                                    Your Pen Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={swapAuthor}
                                                    onChange={(e) => setSwapAuthor(e.target.value)}
                                                    required
                                                    placeholder="Author Name"
                                                    className="w-full px-4 py-3 rounded-xl bg-navy-950/70 border border-gold-400/20 text-white placeholder:text-white/20 text-sm focus:border-gold-400/50 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                                                    Your Email
                                                </label>
                                                <input
                                                    type="email"
                                                    value={swapEmail}
                                                    onChange={(e) => setSwapEmail(e.target.value)}
                                                    required
                                                    placeholder="author@yourdomain.com"
                                                    className="w-full px-4 py-3 rounded-xl bg-navy-950/70 border border-gold-400/20 text-white placeholder:text-white/20 text-sm focus:border-gold-400/50 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                                                    Book to Promote
                                                </label>
                                                <input
                                                    type="text"
                                                    value={swapBookTitle}
                                                    onChange={(e) => setSwapBookTitle(e.target.value)}
                                                    required
                                                    placeholder="e.g. The Silent Room"
                                                    className="w-full px-4 py-3 rounded-xl bg-navy-950/70 border border-gold-400/20 text-white placeholder:text-white/20 text-sm focus:border-gold-400/50 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                                                    Newsletter Subscriber Range
                                                </label>
                                                <select
                                                    value={swapListSize}
                                                    onChange={(e) => setSwapListSize(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl bg-navy-950/70 border border-gold-400/20 text-white text-sm focus:border-gold-400/50 outline-none cursor-pointer"
                                                >
                                                    <option value="Under 1k">Under 1,000 active subscribers</option>
                                                    <option value="1k - 5k">1,000 - 5,000 active subscribers</option>
                                                    <option value="5k - 15k">5,000 - 15,000 active subscribers</option>
                                                    <option value="15k+">15,000+ active subscribers</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                                                    Proposed Send Date / Window
                                                </label>
                                                <input
                                                    type="text"
                                                    value={swapDate}
                                                    onChange={(e) => setSwapDate(e.target.value)}
                                                    placeholder="e.g. Next Tuesday / Oct 15"
                                                    className="w-full px-4 py-3 rounded-xl bg-navy-950/70 border border-gold-400/20 text-white placeholder:text-white/20 text-sm focus:border-gold-400/50 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-2">
                                                    BookFunnel / Amazon Link
                                                </label>
                                                <input
                                                    type="url"
                                                    value={swapLink}
                                                    onChange={(e) => setSwapLink(e.target.value)}
                                                    required
                                                    placeholder="https://books.bookfunnel.com/..."
                                                    className="w-full px-4 py-3 rounded-xl bg-navy-950/70 border border-gold-400/20 text-white placeholder:text-white/20 text-sm focus:border-gold-400/50 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-3 flex justify-end">
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                type="submit"
                                                disabled={swapStatus === "loading"}
                                                className="flex items-center gap-2"
                                            >
                                                {swapStatus === "loading" ? (
                                                    <>
                                                        <Loader2 size={16} className="animate-spin" />
                                                        <span>Submitting Proposal...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Share2 size={15} />
                                                        <span>Propose Newsletter Swap</span>
                                                    </>
                                                )}
                                            </Button>
                                        </div>

                                        {swapStatus === "error" && (
                                            <p className="text-xs text-red-400 mt-2">{swapMsg}</p>
                                        )}
                                    </form>
                                )}
                            </motion.div>
                        )}

                        {/* TAB 3: AUTHOR KIT & TROPES */}
                        {activeTab === "kit" && (
                            <motion.div
                                key="kit"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.35 }}
                                className="glass-card rounded-3xl p-8 md:p-10 border border-gold-400/30 space-y-6"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-gold-400/10 rounded-xl border border-gold-400/20 text-gold-400">
                                        <Sparkles size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                                            AJ Ghost Newsletter Swap Pack
                                        </h3>
                                        <p className="text-xs md:text-sm text-white/40">
                                            Ready-to-paste assets for your upcoming newsletter dispatch.
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 bg-navy-950/80 rounded-2xl border border-gold-400/20 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-mono uppercase tracking-widest text-gold-400">
                                            100-Word Recommendation Blurb (Copy & Paste)
                                        </span>
                                    </div>
                                    <p className="text-xs md:text-sm text-white/80 font-mono leading-relaxed bg-navy-900/60 p-3 rounded-xl border border-gold-400/10">
                                        &quot;If you love psychological thrillers that crawl under your skin, my friend AJ Ghost just released a special giveaway for HUNTED. It follows Ryan Kane, a broken veteran with lost hours, being hunted by a therapist who is actually the deadliest predator alive. Download your free copy here: https://books.bookfunnel.com/thrillingfreebies-sep/ipph5qfp15&quot;
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                                    <div className="p-3 bg-navy-950/50 rounded-xl border border-gold-400/10">
                                        <div className="text-lg font-bold text-gold-400 font-mono">45%+</div>
                                        <div className="text-[10px] text-white/40 uppercase">Open Rate</div>
                                    </div>
                                    <div className="p-3 bg-navy-950/50 rounded-xl border border-gold-400/10">
                                        <div className="text-lg font-bold text-gold-400 font-mono">Weekly</div>
                                        <div className="text-[10px] text-white/40 uppercase">Cadence</div>
                                    </div>
                                    <div className="p-3 bg-navy-950/50 rounded-xl border border-gold-400/10">
                                        <div className="text-lg font-bold text-gold-400 font-mono">Psych Thriller</div>
                                        <div className="text-[10px] text-white/40 uppercase">Core Genre</div>
                                    </div>
                                    <div className="p-3 bg-navy-950/50 rounded-xl border border-gold-400/10">
                                        <div className="text-lg font-bold text-gold-400 font-mono">BookFunnel</div>
                                        <div className="text-[10px] text-white/40 uppercase">Integrated</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
