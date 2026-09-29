"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button";
import BrandLogo from "@/components/BrandLogo";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function Hero() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, source: "hero" }),
            });
            const data = await res.json();
            if (data.success) {
                setStatus("success");
                setMessage(`You're in${name ? `, ${name}` : ""}. Check your inbox for Chapter 1.`);
                setName("");
                setEmail("");
            } else {
                setStatus("error");
                setMessage(data.error || "Subscription failed. Please try again.");
            }
        } catch {
            setStatus("error");
            setMessage("Network error. Please try again.");
        }
    };

    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            id="hero"
        >
            {/* --- BACKGROUND IMAGE --- */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero-bg.jpg"
                    alt=""
                    className="h-full w-full object-cover"
                />
                {/* Dark overlay for depth */}
                <div className="absolute inset-0 bg-navy-950/70"></div>
                
                {/* Bottom fade gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy-950 to-transparent"></div>
                
                {/* Top vignette */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-navy-950/50 to-transparent"></div>
            </div>

            {/* --- FLOATING GOLD PARTICLES --- */}
            <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-gold-400 rounded-full"
                        style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + (i % 3) * 25}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.7, 0.2],
                        }}
                        transition={{
                            duration: 3 + i * 0.7,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                        }}
                    />
                ))}
            </div>

            {/* --- FOREGROUND CONTENT --- */}
            <div className="container relative z-10 mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex justify-center"
                >
                    <div className="inline-flex items-center gap-2.5 py-1.5 pl-2 pr-4 bg-gold-400/10 backdrop-blur-md border border-gold-400/20 rounded-full text-gold-300 font-semibold text-sm shadow-lg shadow-gold-400/5">
                        <BrandLogo size={22} showBorder={false} />
                        <span>Bestselling Author of Psychological Thrillers</span>
                    </div>
                </motion.div>
                
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-center mt-8 tracking-tight"
                >
                    <span className="text-white">Every mind has a </span>
                    <br />
                    <span className="text-gold-gradient">fracture point.</span>
                </motion.h1>
                
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center text-lg md:text-xl text-white/50 mt-8 max-w-2xl mx-auto leading-relaxed"
                >
                    AJ Ghost writes the kind of psychological thrillers that crawl under your skin, 
                    fracture your trust, and leave you questioning everything you thought you knew.
                </motion.p>
                
                {status === "success" ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mx-auto mt-10 max-w-lg p-4 bg-gold-400/10 border border-gold-400/30 rounded-2xl flex items-center justify-center gap-3 text-gold-300 font-medium"
                    >
                        <CheckCircle2 className="text-gold-400" size={20} />
                        <span>{message}</span>
                    </motion.div>
                ) : (
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mx-auto flex flex-col sm:flex-row items-center border border-gold-400/20 rounded-2xl sm:rounded-full p-2 mt-10 max-w-xl bg-navy-900/60 backdrop-blur-xl shadow-2xl shadow-gold-400/5 transition duration-300 hover:border-gold-400/40 focus-within:border-gold-400/50 gap-2 sm:gap-0"
                    >
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="First Name"
                            className="bg-transparent px-4 py-2 sm:py-0 w-full sm:w-2/5 text-white placeholder:text-white/30 outline-none font-medium text-sm md:text-base border-b sm:border-b-0 sm:border-r border-gold-400/20"
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className="bg-transparent px-4 py-2 sm:py-0 flex-1 w-full text-white placeholder:text-white/30 outline-none font-medium text-sm md:text-base"
                        />
                        <Button
                            size="sm"
                            type="submit"
                            variant="primary"
                            disabled={status === "loading"}
                            className="w-full sm:w-auto whitespace-nowrap flex items-center justify-center gap-2"
                        >
                            {status === "loading" ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    <span>Sending...</span>
                                </>
                            ) : (
                                "Read Free"
                            )}
                        </Button>
                    </motion.form>
                )}

                {status === "error" && (
                    <p className="text-center text-red-400 text-xs mt-2">{message}</p>
                )}

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="flex justify-center mt-16"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-gold-400/30 rounded-full flex justify-center pt-2"
                    >
                        <motion.div className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}