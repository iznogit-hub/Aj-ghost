"use client";

import { useState } from "react";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import Tag from "@/components/Tag";
import BrandLogo from "@/components/BrandLogo";
import Button from "@/components/Button";
import { Mail, MapPin, Send, Loader2, CheckCircle2, MessageSquare, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const TARGET_EMAIL = "n.franco2222@gmail.com";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("Reader Query");
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
        <main className="bg-navy-950 min-h-screen text-white selection:bg-gold-400 selection:text-navy-950 flex flex-col justify-between">
            <Navbar />

            <div className="relative pt-32 pb-20 overflow-hidden">
                {/* Ambient glow backgrounds */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-400/5 blur-[160px] pointer-events-none rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold-400/5 blur-[160px] pointer-events-none rounded-full" />

                <div className="container max-w-6xl mx-auto px-4 relative z-10">
                    
                    {/* Return link */}
                    <div className="mb-8">
                        <Link 
                            href="/"
                            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/50 hover:text-gold-300 transition duration-300"
                        >
                            <ArrowLeft size={14} />
                            <span>Return to Home</span>
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="flex justify-center mb-4">
                            <Tag>Get In Touch</Tag>
                        </div>
                        <div className="flex justify-center mb-6">
                            <div className="p-1 rounded-full border border-gold-400/40 shadow-xl shadow-gold-400/10">
                                <BrandLogo size={64} showBorder={false} />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white">
                            Contact Author <span className="text-gold-gradient">AJ Ghost</span>
                        </h1>
                        <p className="text-white/50 mt-4 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                            Whether you have questions about <span className="text-gold-300 font-semibold">The Ryan Kane Series</span>, 
                            reader feedback, media & podcast interview requests, or ARC team inquiries, send your query below.
                        </p>
                    </div>

                    {/* Info Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 max-w-4xl mx-auto">
                        <div className="glass-card p-6 rounded-2xl border border-gold-400/20 text-center hover:border-gold-400/40 transition duration-300">
                            <div className="size-12 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mx-auto mb-4 text-gold-400">
                                <Mail size={22} />
                            </div>
                            <h3 className="text-base font-serif font-bold text-white mb-1">Direct Inquiries</h3>
                            <p className="text-xs text-white/40 mb-3">All queries route directly to</p>
                            <a 
                                href={`mailto:${TARGET_EMAIL}`}
                                className="text-sm font-mono text-gold-300 hover:text-gold-200 transition font-semibold break-all"
                            >
                                {TARGET_EMAIL}
                            </a>
                        </div>

                        <div className="glass-card p-6 rounded-2xl border border-gold-400/20 text-center hover:border-gold-400/40 transition duration-300">
                            <div className="size-12 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mx-auto mb-4 text-gold-400">
                                <MapPin size={22} />
                            </div>
                            <h3 className="text-base font-serif font-bold text-white mb-1">Author Location</h3>
                            <p className="text-xs text-white/40 mb-3">Editorial Base & Studio</p>
                            <span className="text-sm font-semibold text-white/80">
                                Houston, Texas, USA
                            </span>
                        </div>

                        <div className="glass-card p-6 rounded-2xl border border-gold-400/20 text-center hover:border-gold-400/40 transition duration-300">
                            <div className="size-12 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mx-auto mb-4 text-gold-400">
                                <Clock size={22} />
                            </div>
                            <h3 className="text-base font-serif font-bold text-white mb-1">Response Time</h3>
                            <p className="text-xs text-white/40 mb-3">We read every note</p>
                            <span className="text-sm font-semibold text-gold-300">
                                Within 24–48 Hours
                            </span>
                        </div>
                    </div>

                    {/* Main Content: Form & Google Map */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
                        
                        {/* LEFT COLUMN: CONTACT FORM */}
                        <div className="lg:col-span-7 glass-card rounded-3xl p-8 md:p-10 border border-gold-400/30 shadow-2xl shadow-gold-400/5">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2.5 bg-gold-400/10 rounded-2xl border border-gold-400/20 text-gold-400">
                                    <MessageSquare size={22} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-white">
                                        Send a Query
                                    </h2>
                                    <p className="text-xs text-white/40">
                                        Direct transmission to {TARGET_EMAIL}
                                    </p>
                                </div>
                            </div>

                            {status === "success" ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-10 text-center space-y-4 bg-gold-400/10 border border-gold-400/30 rounded-2xl p-6"
                                >
                                    <CheckCircle2 size={44} className="text-gold-400 mx-auto" />
                                    <h3 className="text-xl font-serif font-bold text-white">
                                        Query Sent Successfully!
                                    </h3>
                                    <p className="text-sm text-white/70 max-w-sm mx-auto leading-relaxed">
                                        Thank you for reaching out. Your message has been routed directly to AJ Ghost&apos;s desk at <span className="text-gold-300 font-mono font-semibold">{TARGET_EMAIL}</span>. We will review your note shortly.
                                    </p>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => setStatus("idle")}
                                        className="mt-4"
                                    >
                                        Send Another Query
                                    </Button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                                                Your Name <span className="text-gold-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                placeholder="e.g. Jane Doe"
                                                className="w-full px-4 py-2.5 rounded-xl bg-navy-950/80 border border-gold-400/20 text-white placeholder:text-white/20 text-sm focus:border-gold-400/60 outline-none transition"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                                                Your Email <span className="text-gold-400">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                placeholder="e.g. jane@example.com"
                                                className="w-full px-4 py-2.5 rounded-xl bg-navy-950/80 border border-gold-400/20 text-white placeholder:text-white/20 text-sm focus:border-gold-400/60 outline-none transition"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                                            Topic / Subject
                                        </label>
                                        <select
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl bg-navy-950/80 border border-gold-400/20 text-white text-sm focus:border-gold-400/60 outline-none transition cursor-pointer"
                                        >
                                            <option value="Reader Note to AJ">Reader Note to AJ</option>
                                            <option value="The Ryan Kane Series Query">The Ryan Kane Series Query</option>
                                            <option value="ARC Team & Review Query">ARC Team & Review Query</option>
                                            <option value="Media or Podcast Interview">Media or Podcast Interview</option>
                                            <option value="Author Swap & Collaboration">Author Swap & Collaboration</option>
                                            <option value="Rights & Representation">Rights & Representation</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                                            Your Query / Message <span className="text-gold-400">*</span>
                                        </label>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                            rows={5}
                                            placeholder="Write your query or note to AJ Ghost here..."
                                            className="w-full px-4 py-2.5 rounded-xl bg-navy-950/80 border border-gold-400/20 text-white placeholder:text-white/20 text-sm focus:border-gold-400/60 outline-none transition resize-none"
                                        />
                                    </div>

                                    {status === "error" && (
                                        <p className="text-xs text-red-400 font-medium">{errorMsg}</p>
                                    )}

                                    <div className="pt-2 flex items-center justify-between">
                                        <span className="text-xs text-white/30 font-mono">
                                            Routes to: {TARGET_EMAIL}
                                        </span>
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
                                                    <span>Submit Query</span>
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* RIGHT COLUMN: GOOGLE MAP & LOCATION */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="glass-card rounded-3xl p-6 border border-gold-400/30 overflow-hidden shadow-2xl shadow-gold-400/5">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} className="text-gold-400" />
                                        <span className="font-serif font-bold text-white text-base">
                                            Houston, Texas
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gold-400/10 text-gold-300 border border-gold-400/20">
                                        Studio Location
                                    </span>
                                </div>

                                <p className="text-xs text-white/50 mb-4 leading-relaxed">
                                    Author studio and operations base located in Houston, Texas.
                                </p>

                                {/* Google Map Embed */}
                                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-gold-400/20 relative shadow-inner bg-navy-900">
                                    <iframe
                                        title="AJ Ghost Studio Location - Houston, Texas"
                                        src="https://maps.google.com/maps?q=Houston,%20Texas&t=&z=12&ie=UTF8&iwloc=&output=embed"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(1.15)" }}
                                        allowFullScreen={false}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                    <div className="absolute inset-0 pointer-events-none rounded-2xl border border-gold-400/20"></div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gold-400/10 flex items-center justify-between text-xs text-white/40">
                                    <span>Houston Metropolitan Area</span>
                                    <span className="font-mono text-gold-400/70">Texas, USA</span>
                                </div>
                            </div>

                            {/* Additional info badge */}
                            <div className="glass-card rounded-2xl p-5 border border-gold-400/20">
                                <h4 className="text-sm font-serif font-bold text-gold-300 mb-1">
                                    Author Desk Routing
                                </h4>
                                <p className="text-xs text-white/60 leading-relaxed">
                                    Direct messages are monitored daily by Nicole and the AJ Ghost author communications team.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
