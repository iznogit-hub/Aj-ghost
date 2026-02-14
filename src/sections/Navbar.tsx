"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
    Menu, 
    X, 
    BookOpen, 
    User, 
    FileText, 
    MessageCircle, 
    ShoppingCart 
} from "lucide-react";

import Button from "@/components/Button";

const navLinks = [
    { label: "The Story", href: "#introduction", icon: FileText },
    { label: "Reviews", href: "#testimonials", icon: MessageCircle },
    { label: "Buy Now", href: "#marketing", icon: ShoppingCart },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Optional: Detect scroll to add background only when moving down
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <section 
                className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                    scrolled ? "py-4 bg-white/10 backdrop-blur-md border-b border-white/10" : "py-6 bg-transparent border-transparent"
                }`}
            >
                <div className="container max-w-6xl mx-auto px-4">
                    {/* Replaced the inner container styles with simple flex layout */}
                    <div className="flex justify-between items-center">
                        
                        {/* --- LOGO AREA --- */}
                        <div className="flex items-center gap-2 cursor-pointer group">
                            <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm border border-white/20 group-hover:bg-red-600 group-hover:border-red-600 transition duration-300">
                                <BookOpen size={20} className="text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tighter text-white font-mono hidden sm:block shadow-sm">
                                HUNTED.
                            </span>
                        </div>

                        {/* --- DESKTOP NAVIGATION --- */}
                        <div className="hidden lg:flex justify-center items-center">
                            <nav className="flex gap-8 font-medium text-sm">
                                {navLinks.map((link) => (
                                    <a 
                                        href={link.href} 
                                        key={link.label}
                                        className="flex items-center gap-2 text-white/70 hover:text-white transition duration-200 group"
                                    >
                                        <span className="font-medium tracking-wide group-hover:-translate-y-0.5 transition-transform duration-200">
                                            {link.label}
                                        </span>
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* --- ACTION BUTTONS & MOBILE TOGGLE --- */}
                        <div className="flex items-center gap-4">
                            <div className="hidden lg:flex gap-3">
                                {/* Customized Buttons for Transparent Header */}
                                <button className="px-4 py-2 text-sm font-medium text-white border border-white/30 rounded-full hover:bg-white hover:text-neutral-950 transition">
                                    Read Sample
                                </button>
                                <button className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-lg shadow-red-900/20">
                                    Buy on Amazon
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden p-2 text-white bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                            >
                                <AnimatePresence mode="wait">
                                    {isOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                        >
                                            <X size={20} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                        >
                                            <Menu size={20} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>

                    {/* --- MOBILE MENU EXPANSION --- */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden lg:hidden mt-4 bg-neutral-950/90 backdrop-blur-xl rounded-2xl border border-white/10"
                            >
                                <div className="flex flex-col gap-4 p-6">
                                    {navLinks.map((link) => (
                                        <a 
                                            key={link.label} 
                                            href={link.href} 
                                            className="flex items-center gap-4 text-lg font-medium text-white/80 p-2 rounded-lg hover:bg-white/10 transition"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <link.icon size={20} className="text-red-500" />
                                            {link.label}
                                        </a>
                                    ))}
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <Button variant="secondary" className="w-full justify-center text-sm">
                                            Sample
                                        </Button>
                                        <Button variant="primary" className="w-full justify-center flex items-center gap-2 text-sm">
                                            <ShoppingCart size={16} /> Buy
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </>
    );
}