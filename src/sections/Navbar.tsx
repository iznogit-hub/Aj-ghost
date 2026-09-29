"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { 
    Menu, 
    X, 
    Skull, 
    BookOpen, 
    FileText, 
    MessageCircle, 
    ShoppingCart,
    Mail,
    Users
} from "lucide-react";

import BrandLogo from "@/components/BrandLogo";
import Button from "@/components/Button";

const AMAZON_AUTHOR_STORE = "https://www.amazon.com/stores/AJ-Ghost/author/B0HD9D7DRD?ref=ap_rdr&shoppingPortalEnabled=true&ccs_id=5eb73e49-2101-4a5f-b36a-2acfe6ae4c07";

const navLinks = [
    { label: "Books", href: "#books", icon: BookOpen },
    { label: "Reviews", href: "#reviews", icon: MessageCircle },
    { label: "The Story", href: "#introduction", icon: FileText },
    { label: "For Authors", href: "#author-collab", icon: Users },
    { label: "Newsletter", href: "#newsletter", icon: Mail },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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
                className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                    scrolled 
                        ? "py-3 bg-navy-950/80 backdrop-blur-xl border-b border-gold-400/10" 
                        : "py-5 bg-transparent border-transparent"
                }`}
            >
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center">
                        
                        {/* --- LOGO AREA --- */}
                        <a href="#" className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <div className="p-0.5 rounded-full border border-gold-400/40 group-hover:border-gold-400/80 transition duration-500 shadow-md shadow-gold-400/10">
                                    <BrandLogo size={40} showBorder={false} />
                                </div>
                                {/* Subtle glow on hover */}
                                <div className="absolute inset-0 bg-gold-400/0 group-hover:bg-gold-400/20 rounded-full blur-md transition duration-500"></div>
                            </div>
                            <div className="hidden sm:block">
                                <span className="font-serif text-xl tracking-wider text-white font-bold">
                                    AJ <span className="text-gold-400">GHOST</span>
                                </span>
                                <div className="text-[10px] tracking-[0.3em] text-gold-400/50 uppercase font-mono">
                                    Dark Fiction
                                </div>
                            </div>
                        </a>

                        {/* --- DESKTOP NAVIGATION --- */}
                        <div className="hidden lg:flex justify-center items-center">
                            <nav className="flex gap-8 font-medium text-sm">
                                {navLinks.map((link) => (
                                    <a 
                                        href={link.href} 
                                        key={link.label}
                                        className="flex items-center gap-2 text-white/50 hover:text-gold-400 transition duration-300 group"
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
                                <a 
                                    href="#author-collab" 
                                    className="px-5 py-2.5 text-sm font-medium text-gold-300 border border-gold-400/30 rounded-full hover:bg-gold-400/10 hover:border-gold-400/50 transition duration-300"
                                >
                                    Author Free Copy
                                </a>
                                <a 
                                    href={AMAZON_AUTHOR_STORE} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 text-sm font-semibold bg-gold-400 text-navy-950 rounded-full hover:bg-gold-300 transition duration-300 shadow-lg shadow-gold-400/20 flex items-center gap-1.5"
                                >
                                    <ShoppingCart size={15} />
                                    Buy on Amazon
                                </a>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden p-2.5 text-gold-400 bg-gold-400/10 backdrop-blur-md rounded-full border border-gold-400/20"
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
                                className="overflow-hidden lg:hidden mt-4 glass-card rounded-2xl"
                            >
                                <div className="flex flex-col gap-4 p-6">
                                    {navLinks.map((link) => (
                                        <a 
                                            key={link.label} 
                                            href={link.href} 
                                            className="flex items-center gap-4 text-lg font-medium text-white/70 p-2 rounded-lg hover:bg-gold-400/10 hover:text-gold-400 transition"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <link.icon size={20} className="text-gold-400" />
                                            {link.label}
                                        </a>
                                    ))}
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <a href="#books" onClick={() => setIsOpen(false)}>
                                            <Button variant="secondary" className="w-full justify-center text-sm">
                                                Explore Books
                                            </Button>
                                        </a>
                                        <a 
                                            href={AMAZON_AUTHOR_STORE}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Button variant="primary" className="w-full justify-center flex items-center gap-2 text-sm">
                                                <ShoppingCart size={16} /> Buy on Amazon
                                            </Button>
                                        </a>
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