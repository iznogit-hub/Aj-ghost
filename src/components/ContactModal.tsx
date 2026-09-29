"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle2, MessageSquare } from "lucide-react";
import Button from "./Button";

import BrandLogo from "./BrandLogo";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("Reader Note to AJ");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, subject, message }),
            });
            const data = await res.json();
            if (data.success) {
                setStatus("success");
                setName("");
                setEmail("");
                setMessage("");
            } else {
                setStatus("error");
                setErrorMsg(data.error || "Failed to send message. Please try again.");
            }
        } catch {
            setStatus("error");
            setErrorMsg("Network error. Please try again later.");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full max-w-lg glass-card rounded-3xl p-6 md:p-8 border border-gold-400/30 shadow-2xl shadow-gold-400/10 text-white"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white hover:bg-gold-400/10 transition"
                            aria-label="Close contact modal"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <BrandLogo size={44} showBorder={false} />
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-white">
                                    Contact AJ Ghost
                                </h3>
                                <p className="text-xs text-white/50">
                                    Send a message directly to AJ Ghost and the editorial desk.
                                </p>
                            </div>
                        </div>

                        {status === "success" ? (
                            <div className="py-8 text-center space-y-4">
                                <CheckCircle2 size={44} className="text-gold-400 mx-auto animate-bounce" />
                                <h4 className="text-xl font-serif font-bold text-white">
                                    Message Sent!
                                </h4>
                                <p className="text-sm text-white/70 max-w-sm mx-auto leading-relaxed">
                                    Thank you for reaching out. Your note has landed directly on AJ Ghost&apos;s desk. We read every reader email and will reply soon.
                                </p>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => {
                                        setStatus("idle");
                                        onClose();
                                    }}
                                    className="mt-4"
                                >
                                    Done
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Jane Doe"
                                        className="w-full px-4 py-2.5 rounded-xl bg-navy-950/80 border border-gold-400/20 text-white placeholder:text-white/20 text-sm focus:border-gold-400/60 outline-none transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="jane@example.com"
                                        className="w-full px-4 py-2.5 rounded-xl bg-navy-950/80 border border-gold-400/20 text-white placeholder:text-white/20 text-sm focus:border-gold-400/60 outline-none transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                                        Subject
                                    </label>
                                    <select
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-navy-950/80 border border-gold-400/20 text-white text-sm focus:border-gold-400/60 outline-none transition cursor-pointer"
                                    >
                                        <option value="Reader Note to AJ">Reader Note to AJ</option>
                                        <option value="ARC Team Question">ARC Team Question</option>
                                        <option value="Media or Interview Request">Media or Interview Request</option>
                                        <option value="Author Collaboration">Author Collaboration</option>
                                        <option value="Book Club Inquiry">Book Club Inquiry</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                                        Your Message
                                    </label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        rows={4}
                                        placeholder="Write your note to AJ here..."
                                        className="w-full px-4 py-2.5 rounded-xl bg-navy-950/80 border border-gold-400/20 text-white placeholder:text-white/20 text-sm focus:border-gold-400/60 outline-none transition resize-none"
                                    />
                                </div>

                                {status === "error" && (
                                    <p className="text-xs text-red-400 font-medium">{errorMsg}</p>
                                )}

                                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                                    <a
                                        href="/contact"
                                        onClick={onClose}
                                        className="text-xs text-gold-300/70 hover:text-gold-300 underline underline-offset-2 transition"
                                    >
                                        Or visit full Contact page & Houston map →
                                    </a>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-4 py-2 text-sm text-white/50 hover:text-white transition"
                                        >
                                            Cancel
                                        </button>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            type="submit"
                                            disabled={status === "loading"}
                                            className="flex items-center gap-2"
                                        >
                                            {status === "loading" ? (
                                                <>
                                                    <Loader2 size={16} className="animate-spin" />
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={15} />
                                                    <span>Send Message</span>
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
