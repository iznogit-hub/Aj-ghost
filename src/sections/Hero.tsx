"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/Button";
import BrandLogo from "@/components/BrandLogo";
import { 
    CheckCircle2, 
    Loader2, 
    ChevronLeft, 
    ChevronRight, 
    Play, 
    Pause, 
    Layers, 
    Maximize2,
    Film,
    Volume2,
    VolumeX,
    ChevronDown
} from "lucide-react";
import { CINEMA_ACTS, ALL_FEATURED_SCENES, CinemaScene } from "@/data/cinemaScenes";

const BOOKFUNNEL_CTA = "https://dl.bookfunnel.com/j4e3jsxfr6?utm_source=ajghost&utm_medium=hero&utm_campaign=hunted_cinema&utm_content=cta";

export default function Hero() {
    // Form State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    // Cinema Comic State
    const [activeSceneIndex, setActiveSceneIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [viewMode, setViewMode] = useState<"comic" | "cinema">("comic");
    const [timecodeSeconds, setTimecodeSeconds] = useState(134); // starts around 00:02:14

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const autoAdvanceTimer = useRef<NodeJS.Timeout | null>(null);
    const activeScene: CinemaScene = ALL_FEATURED_SCENES[activeSceneIndex] || ALL_FEATURED_SCENES[0];

    // Auto-advance scenes every 6.5 seconds when playing
    useEffect(() => {
        if (!isPlaying) {
            if (autoAdvanceTimer.current) clearInterval(autoAdvanceTimer.current);
            return;
        }

        autoAdvanceTimer.current = setInterval(() => {
            setActiveSceneIndex((prev) => (prev + 1) % ALL_FEATURED_SCENES.length);
        }, 6500);

        return () => {
            if (autoAdvanceTimer.current) clearInterval(autoAdvanceTimer.current);
        };
    }, [isPlaying]);

    // Live ticking cinema timecode
    useEffect(() => {
        const timer = setInterval(() => {
            setTimecodeSeconds((prev) => (prev + 1) % 3600);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Autoplay Trailer Narration (Attempts immediate play; triggers on first user interaction if blocked by browser policy)
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const attemptPlay = () => {
            audio.play()
                .then(() => {
                    setIsAudioPlaying(true);
                    cleanup();
                })
                .catch(() => {
                    // Modern browser autoplay restrictions: will play on first interaction
                    setIsAudioPlaying(false);
                });
        };

        const cleanup = () => {
            window.removeEventListener("click", attemptPlay);
            window.removeEventListener("touchstart", attemptPlay);
            window.removeEventListener("scroll", attemptPlay);
            window.removeEventListener("keydown", attemptPlay);
        };

        // 1. Direct autoplay attempt on mount
        attemptPlay();

        // 2. Fallback listeners for first touch/click/scroll/keypress
        window.addEventListener("click", attemptPlay, { once: true });
        window.addEventListener("touchstart", attemptPlay, { once: true });
        window.addEventListener("scroll", attemptPlay, { once: true });
        window.addEventListener("keydown", attemptPlay, { once: true });

        return () => {
            cleanup();
        };
    }, []);

    const formatTimecode = (totalSec: number) => {
        const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
        const secs = String(totalSec % 60).padStart(2, "0");
        return `00:${mins}:${secs}:12`;
    };

    const handlePrev = () => {
        setActiveSceneIndex((prev) => (prev === 0 ? ALL_FEATURED_SCENES.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveSceneIndex((prev) => (prev + 1) % ALL_FEATURED_SCENES.length);
    };

    const selectAct = (actNumber: number) => {
        const targetIndex = ALL_FEATURED_SCENES.findIndex((s) => s.act === actNumber);
        if (targetIndex !== -1) {
            setActiveSceneIndex(targetIndex);
        }
    };

    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (audioRef.current.paused) {
            audioRef.current.play().then(() => setIsAudioPlaying(true)).catch(() => setIsAudioPlaying(false));
        } else {
            audioRef.current.pause();
            setIsAudioPlaying(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, source: "hero-cinema" }),
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
            id="hero"
            className="relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden bg-navy-950 flex flex-col justify-between select-none"
        >
            {/* Audio Trailer narration */}
            <audio 
                ref={audioRef} 
                src="/hunted/audio/hunted_hero_narration.mp3" 
                preload="auto" 
                autoPlay
                playsInline
                onEnded={() => setIsAudioPlaying(false)} 
            />

            {/* =========================================================================
                1. BACKGROUND CANVAS: Clean Website Background (Desktop) / 9:16 Cinema (Mobile)
               ========================================================================= */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* --- DESKTOP: Clean Website Background (NO GIF in background, only in panels) --- */}
                <div className="hidden md:block absolute inset-0 w-full h-full">
                    <img
                        src="/hero-bg.jpg"
                        alt=""
                        className="h-full w-full object-cover opacity-50"
                    />
                    {/* Dark navy overlay for deep contrast */}
                    <div className="absolute inset-0 bg-navy-950/80" />
                    
                    {/* Top & bottom vignettes */}
                    <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-navy-950 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-navy-950 to-transparent" />

                    {/* Floating subtle gold particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-gold-400 rounded-full"
                                style={{
                                    left: `${15 + i * 15}%`,
                                    top: `${20 + (i % 3) * 25}%`,
                                }}
                                animate={{
                                    y: [0, -25, 0],
                                    opacity: [0.15, 0.6, 0.15],
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
                </div>

                {/* --- MOBILE: 9:16 Full Screen Direct GIF Cover with Post-Processing on Top --- */}
                <div className="md:hidden absolute inset-0 w-full h-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeScene.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 w-full h-full overflow-hidden"
                        >
                            <img
                                src={activeScene.gifSrc}
                                alt={activeScene.title}
                                className={`w-full h-full object-cover object-center scale-[1.03] transition-all duration-700 cinema-media-grade${activeScene.still ? " brightness-75 saturate-50" : ""}`}
                                loading="eager"
                            />

                            {/* Mobile Post-Processing Overlays (Smoothes low-res pixels & banding directly on top of mobile view) */}
                            <div className="absolute inset-0 cinema-grain opacity-40 pointer-events-none" />
                            <div className="absolute inset-0 cinema-scanlines opacity-35 pointer-events-none" />
                            <div className="absolute inset-0 cinema-halftone opacity-30 pointer-events-none" />

                            {/* Mobile Comic Texture & Darkness Vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/80 pointer-events-none" />
                            <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Golden Anamorphic Atmospheric Glow */}
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* =========================================================================
                2. TOP CINEMA HUD (Header & Production Slate)
               ========================================================================= */}
            <div className="relative z-20 pt-20 md:pt-24 px-4 md:px-8 w-full max-w-7xl mx-auto flex items-center justify-between">
                {/* Left: Author Badge & Scene Slate */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 py-1 px-3 bg-navy-900/90 border border-gold-400/30 rounded-full backdrop-blur-md shadow-md">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="font-mono text-[11px] text-gold-300 uppercase tracking-widest font-semibold">
                            REC <span className="text-white/60 hidden sm:inline">[{formatTimecode(timecodeSeconds)}]</span>
                        </span>
                    </div>

                    <div className="hidden sm:inline-flex items-center gap-2 py-1 px-3 bg-navy-900/70 border border-gold-400/20 rounded-full backdrop-blur-md text-xs font-mono text-white/70">
                        <Film size={12} className="text-gold-400" />
                        <span>SCENE {activeSceneIndex + 1}/{ALL_FEATURED_SCENES.length}</span>
                        <span className="text-gold-400/50">//</span>
                        <span className="text-gold-300 font-semibold">{activeScene.tag}</span>
                    </div>
                </div>

                {/* Center / Right: Act Selector, Narration Audio & Controls */}
                <div className="flex items-center gap-2">
                    {/* Prominently Highlighted Narration Audio Button */}
                    <button
                        onClick={toggleAudio}
                        className={`group relative flex items-center gap-2 py-1.5 px-3.5 rounded-full text-xs font-mono border backdrop-blur-xl transition-all duration-300 ${
                            isAudioPlaying
                                ? "bg-gold-400 text-navy-950 border-gold-400 font-black shadow-[0_0_25px_rgba(212,168,39,0.55)] ring-2 ring-gold-400/60 scale-[1.02]"
                                : "bg-gold-400/20 border-gold-400 text-gold-300 font-extrabold shadow-[0_0_20px_rgba(212,168,39,0.3)] ring-2 ring-gold-400/40 hover:bg-gold-400/30 hover:scale-[1.03]"
                        }`}
                        title={isAudioPlaying ? "Mute Trailer Narration" : "Play Trailer Narration"}
                    >
                        {/* Audio Wave / Pulse Indicator */}
                        {isAudioPlaying ? (
                            <div className="flex items-end gap-0.5 h-3">
                                <span className="w-0.5 bg-navy-950 rounded-full animate-pulse h-full" />
                                <span className="w-0.5 bg-navy-950 rounded-full animate-pulse delay-75 h-2/3" />
                                <span className="w-0.5 bg-navy-950 rounded-full animate-pulse delay-150 h-5/6" />
                            </div>
                        ) : (
                            <div className="relative flex items-center justify-center">
                                <Volume2 size={13} className="text-gold-400" />
                                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gold-400 animate-ping opacity-75" />
                            </div>
                        )}

                        <span className="tracking-wide uppercase text-[11px]">
                            {isAudioPlaying ? "Narration Playing" : "▶ Play Narration"}
                        </span>

                        {/* Pulsing Aura */}
                        <div className="absolute inset-0 rounded-full bg-gold-400/10 blur-sm pointer-events-none group-hover:bg-gold-400/25 transition duration-300" />
                    </button>

                    {/* Desktop Act Pills */}
                    <div className="hidden lg:flex items-center gap-1 bg-navy-900/80 border border-gold-400/20 p-1 rounded-full backdrop-blur-md">
                        {CINEMA_ACTS.map((actItem) => {
                            const isCurrentAct = activeScene.act === actItem.act;
                            return (
                                <button
                                    key={actItem.act}
                                    onClick={() => selectAct(actItem.act)}
                                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                                        isCurrentAct 
                                            ? "bg-gold-400 text-navy-950 font-bold shadow-md shadow-gold-400/20" 
                                            : "text-white/60 hover:text-gold-300 hover:bg-gold-400/10"
                                    }`}
                                >
                                    {actItem.name}
                                </button>
                            );
                        })}
                    </div>

                    {/* View Mode Switcher (Desktop) */}
                    <div className="hidden md:flex items-center gap-1 bg-navy-900/80 border border-gold-400/20 p-1 rounded-full backdrop-blur-md">
                        <button
                            onClick={() => setViewMode("comic")}
                            title="Comic Graphic Novel Triptych"
                            className={`p-1.5 rounded-full transition ${
                                viewMode === "comic" ? "bg-gold-400/20 text-gold-300 border border-gold-400/40" : "text-white/40 hover:text-white"
                            }`}
                        >
                            <Layers size={14} />
                        </button>
                        <button
                            onClick={() => setViewMode("cinema")}
                            title="Full Widescreen Cinema"
                            className={`p-1.5 rounded-full transition ${
                                viewMode === "cinema" ? "bg-gold-400/20 text-gold-300 border border-gold-400/40" : "text-white/40 hover:text-white"
                            }`}
                        >
                            <Maximize2 size={14} />
                        </button>
                    </div>

                    {/* Play / Pause Toggle */}
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 rounded-full bg-navy-900/80 border border-gold-400/30 text-gold-300 hover:bg-gold-400/20 backdrop-blur-md transition"
                        title={isPlaying ? "Pause Reel" : "Play Reel"}
                    >
                        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                </div>
            </div>

            {/* =========================================================================
                3. CENTER STAGE: THE "CINEMA COMIC" EXPERIENCE
               ========================================================================= */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 my-auto flex flex-col items-center justify-center">

                {/* --- DESKTOP VIEW: AUTHENTIC COMIC BOOK PANELS SPREAD --- */}
                <div className="hidden md:block w-full max-w-6xl xl:max-w-7xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${activeScene.id}-${viewMode}`}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-full flex flex-col items-center"
                        >
                            {viewMode === "comic" ? (
                                /* --- 3-PANEL GRAPHIC NOVEL COMIC BOOK SPREAD --- */
                                <div className="w-full flex flex-col">
                                    {/* Graphic Novel Top Ribbon */}
                                    <div className="flex items-center justify-between w-full mb-2.5 px-1">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 bg-gold-400 text-navy-950 font-mono text-[10px] font-black uppercase tracking-widest rounded-sm shadow-md">
                                                ISSUE #01 // ACT {activeScene.act}
                                            </span>
                                            <span className="font-mono text-xs text-white/70 font-semibold tracking-wider">
                                                {activeScene.actName.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 font-mono text-[11px] text-gold-400/70">
                                            <span className="hidden lg:inline text-white/40">THE RYAN KANE THRILLERS</span>
                                            <span className="hidden lg:inline text-white/20">|</span>
                                            <span className="text-white/80 font-bold">{activeScene.timecode}</span>
                                        </div>
                                    </div>

                                    {/* The 3 Comic Panels Grid */}
                                    <div className="w-full grid grid-cols-12 gap-3.5 lg:gap-4 items-stretch">
                                        {/* PANEL 1: LEFT FLANKING (Vertical Graphic Novel Panel) */}
                                        <div className="col-span-3 relative rounded-xl p-1 bg-navy-950 border-2 border-gold-400/30 ring-1 ring-black/80 shadow-[0_12px_35px_rgba(0,0,0,0.85)] group transition-all duration-300 hover:border-gold-400/70 hover:scale-[1.02] overflow-hidden flex flex-col">
                                            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-navy-900">
                                                <img
                                                    src={activeScene.subGifs?.[0] || activeScene.gifSrc}
                                                    alt=""
                                                    className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-80 group-hover:grayscale-0 group-hover:brightness-100 transition duration-500"
                                                />
                                                <div className="absolute inset-0 bg-navy-950/30 group-hover:bg-transparent transition duration-500 pointer-events-none" />
                                                
                                                {/* Comic Badge */}
                                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-gold-400/90 text-navy-950 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest shadow-md">
                                                    PANEL 01
                                                </div>

                                                {/* Mini Comic Caption */}
                                                <div className="absolute bottom-2 inset-x-2 bg-navy-950/90 border border-gold-400/30 p-1.5 rounded text-[10px] font-serif text-white/80 italic leading-tight pointer-events-none">
                                                    {activeScene.flankText?.[0]}
                                                </div>
                                            </div>
                                        </div>

                                        {/* PANEL 2: CENTER HEROIC SPLASH (Dominant Widescreen Action Splash) */}
                                        <div className="col-span-6 relative rounded-2xl p-1.5 bg-navy-950 border-2 border-gold-400/60 ring-2 ring-gold-400/20 shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,168,39,0.18)] group transition-all duration-300 hover:border-gold-400 hover:scale-[1.01] overflow-hidden flex flex-col">
                                            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-navy-900">
                                                <img
                                                    src={activeScene.gifSrc}
                                                    alt={activeScene.title}
                                                    className={`w-full h-full object-cover object-center transition-all duration-500${activeScene.still ? " brightness-75 saturate-50" : ""}`}
                                                />

                                                {/* Comic Gutter Lines Inside Panel */}
                                                <div className="absolute inset-0 pointer-events-none border-t-4 border-b-4 border-navy-950/70" />
                                                
                                                {/* Heroic Comic Header Badges */}
                                                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                                    <span className="px-2.5 py-0.5 bg-gold-400 text-navy-950 rounded-sm text-[10px] font-mono font-black uppercase tracking-widest shadow-md">
                                                        SPLASH FRAME
                                                    </span>
                                                    <span className="px-2 py-0.5 bg-navy-950/90 border border-gold-400/40 text-gold-300 rounded-sm text-[10px] font-mono">
                                                        {activeScene.title}
                                                    </span>
                                                </div>

                                                {/* Comic Narrative Caption Box */}
                                                <div className="absolute bottom-3 left-3 right-3 bg-navy-950/95 backdrop-blur-md border border-gold-400/50 p-3 rounded-lg shadow-2xl">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="font-mono text-[10px] text-gold-400 font-bold tracking-widest uppercase">
                                                            {activeScene.actName} // {activeScene.tag}
                                                        </span>
                                                        <span className="font-mono text-[10px] text-white/50">{activeScene.timecode}</span>
                                                    </div>
                                                    {activeScene.bubble ? (
                                                        <p className="font-serif text-sm md:text-base text-white leading-snug">
                                                            {activeScene.bubble}
                                                        </p>
                                                    ) : null}
                                                    <p className="font-serif text-sm md:text-base text-white/95 italic leading-snug">
                                                        "{activeScene.caption}"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* PANEL 3: RIGHT FLANKING (Vertical Graphic Novel Panel) */}
                                        <div className="col-span-3 relative rounded-xl p-1 bg-navy-950 border-2 border-gold-400/30 ring-1 ring-black/80 shadow-[0_12px_35px_rgba(0,0,0,0.85)] group transition-all duration-300 hover:border-gold-400/70 hover:scale-[1.02] overflow-hidden flex flex-col">
                                            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-navy-900">
                                                <img
                                                    src={activeScene.subGifs?.[1] || activeScene.gifSrc}
                                                    alt=""
                                                    className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-80 group-hover:grayscale-0 group-hover:brightness-100 transition duration-500"
                                                />
                                                <div className="absolute inset-0 bg-navy-950/30 group-hover:bg-transparent transition duration-500 pointer-events-none" />
                                                
                                                {/* Comic Badge */}
                                                <div className="absolute top-2 right-2 px-2 py-0.5 bg-gold-400/90 text-navy-950 rounded-sm text-[9px] font-mono font-bold uppercase tracking-widest shadow-md">
                                                    PANEL 03
                                                </div>

                                                {/* Mini Comic Caption */}
                                                <div className="absolute bottom-2 inset-x-2 bg-navy-950/90 border border-gold-400/30 p-1.5 rounded text-[10px] font-serif text-white/80 italic leading-tight text-right pointer-events-none">
                                                    {activeScene.flankText?.[1]}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* --- WIDESCREEN CINEMA THEATER VIEW --- */
                                <div className="w-full max-w-5xl xl:max-w-6xl aspect-[2.35/1] relative rounded-2xl p-1 bg-navy-950 border-2 border-gold-400/50 shadow-2xl overflow-hidden">
                                    <div className="relative w-full h-full overflow-hidden rounded-xl">
                                        <img
                                            src={activeScene.gifSrc}
                                            alt={activeScene.title}
                                            className={`w-full h-full object-cover object-center transition-all duration-500${activeScene.still ? " brightness-75 saturate-50" : ""}`}
                                        />
                                        <div className="absolute top-0 inset-x-0 h-8 bg-black/80 flex items-center justify-between px-4 font-mono text-[10px] text-gold-400/70 border-b border-gold-400/20">
                                            <span>PROD: AJ GHOST</span>
                                            <span>ANAMORPHIC 2.35:1</span>
                                            <span>{activeScene.timecode}</span>
                                        </div>
                                        <div className="absolute bottom-0 inset-x-0 h-8 bg-black/80 flex items-center justify-between px-4 font-mono text-[10px] text-white/60 border-t border-gold-400/20">
                                            <span>{activeScene.title}</span>
                                            <span className="text-gold-300 italic font-serif">{activeScene.bubble ? `${activeScene.bubble} ` : ""}"{activeScene.caption}"</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* --- MOBILE VIEW: 9:16 SCREEN TAKEOVER CONTENT --- */}
                <div className="md:hidden w-full flex flex-col items-center justify-center text-center px-2 py-4">
                    {/* Comic Caption Box Overlay */}
                    <div className="w-full bg-navy-900/90 backdrop-blur-xl border border-gold-400/40 rounded-xl p-3.5 shadow-2xl mb-4 text-left">
                        <div className="flex items-center justify-between border-b border-gold-400/20 pb-1.5 mb-2">
                            <span className="font-mono text-[10px] text-gold-400 font-bold uppercase tracking-widest">
                                {activeScene.actName}
                            </span>
                            <span className="font-mono text-[9px] text-white/50">{activeScene.timecode}</span>
                        </div>
                        {activeScene.bubble ? (
                            <p className="font-serif text-sm text-white leading-snug">
                                {activeScene.bubble}
                            </p>
                        ) : null}
                        <p className="font-serif text-sm text-white/95 leading-snug italic">
                            "{activeScene.caption}"
                        </p>
                    </div>

                    {/* Touch Swipe / Navigation Indicator */}
                    <div className="flex items-center justify-center gap-4 text-xs font-mono text-gold-300">
                        <button 
                            onClick={handlePrev}
                            className="p-1.5 rounded-full bg-navy-900/80 border border-gold-400/30 active:scale-95 transition"
                            aria-label="Previous scene"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span>SCENE {activeSceneIndex + 1} OF {ALL_FEATURED_SCENES.length}</span>
                        <button 
                            onClick={handleNext}
                            className="p-1.5 rounded-full bg-navy-900/80 border border-gold-400/30 active:scale-95 transition"
                            aria-label="Next scene"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* --- FOREGROUND HERO HEADLINE & EMAIL CAPTURE --- */}
                <div className="w-full max-w-2xl mt-4 md:mt-6 text-center">
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white drop-shadow-md">
                        Every mind has a{" "}
                        <span className="text-gold-gradient">fracture point.</span>
                    </h1>
                    
                    <p className="text-white/70 text-xs sm:text-sm md:text-base mt-2 max-w-xl mx-auto line-clamp-2 md:line-clamp-none">
                        AJ Ghost writes psychological thrillers that crawl under your skin and leave you questioning reality.
                    </p>

                    {/* Lead Generation Form & Direct BookFunnel Access */}
                    {status === "success" ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mx-auto mt-4 max-w-md p-3 bg-gold-400/15 border border-gold-400/40 rounded-xl flex items-center justify-center gap-2 text-gold-300 text-sm font-medium backdrop-blur-md"
                        >
                            <CheckCircle2 className="text-gold-400 shrink-0" size={18} />
                            <span>{message}</span>
                        </motion.div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="mx-auto flex flex-col sm:flex-row items-center border border-gold-400/30 rounded-2xl sm:rounded-full p-1.5 mt-4 max-w-lg bg-navy-900/90 backdrop-blur-xl shadow-2xl transition duration-300 hover:border-gold-400/50 gap-2 sm:gap-0"
                        >
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="First Name"
                                className="bg-transparent px-3 py-1.5 sm:py-0 w-full sm:w-1/3 text-white placeholder:text-white/40 outline-none text-xs sm:text-sm font-medium border-b sm:border-b-0 sm:border-r border-gold-400/20"
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Your email address"
                                className="bg-transparent px-3 py-1.5 sm:py-0 flex-1 w-full text-white placeholder:text-white/40 outline-none text-xs sm:text-sm font-medium"
                            />
                            <Button
                                size="sm"
                                type="submit"
                                variant="primary"
                                disabled={status === "loading"}
                                className="w-full sm:w-auto whitespace-nowrap text-xs font-semibold py-2 px-4 flex items-center justify-center gap-1.5"
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 size={14} className="animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    "Read Chapter 1 Free"
                                )}
                            </Button>
                        </form>
                    )}

                    {status === "error" && (
                        <p className="text-center text-red-400 text-xs mt-1.5">{message}</p>
                    )}

                    {/* BookFunnel Instant Download Link */}
                    <div className="mt-3">
                        <a 
                            href={BOOKFUNNEL_CTA}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-gold-300/80 hover:text-gold-300 underline underline-offset-4 transition"
                        >
                            Or claim HUNTED instantly on BookFunnel &rarr;
                        </a>
                    </div>

                    {/* Animated Scroll Down Arrow */}
                    <div className="mt-2 flex justify-center">
                        <motion.a
                            href="#reviews"
                            className="inline-flex flex-col items-center text-gold-400/60 hover:text-gold-300 transition-colors group cursor-pointer"
                            aria-label="Scroll down to explore"
                        >
                            <motion.div
                                animate={{ y: [0, 5, 0] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                                className="flex flex-col items-center"
                            >
                                <ChevronDown size={18} className="group-hover:scale-110 transition-transform" />
                            </motion.div>
                        </motion.a>
                    </div>
                </div>
            </div>

            {/* =========================================================================
                4. BOTTOM CINEMA BAR: FILMSTRIP REEL & SCRUBBER (Desktop & Mobile)
               ========================================================================= */}
            <div className="relative z-20 pb-4 md:pb-6 px-4 w-full max-w-7xl mx-auto flex flex-col items-center">
                {/* Desktop Filmstrip Thumbnail Scrubber */}
                <div className="hidden md:flex items-center gap-2 overflow-x-auto py-2 px-4 bg-navy-950/85 border border-gold-400/20 rounded-xl backdrop-blur-md max-w-4xl w-full justify-between shadow-2xl">
                    <span className="font-mono text-[10px] text-gold-400/60 uppercase tracking-widest pl-1 shrink-0">
                        FILM REEL:
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                        {ALL_FEATURED_SCENES.map((scene, idx) => {
                            const isCurrent = idx === activeSceneIndex;
                            return (
                                <button
                                    key={scene.id}
                                    onClick={() => setActiveSceneIndex(idx)}
                                    className={`relative group shrink-0 w-16 h-10 rounded overflow-hidden border transition-all duration-300 ${
                                        isCurrent 
                                            ? "border-gold-400 ring-2 ring-gold-400/40 scale-105" 
                                            : "border-white/20 opacity-50 hover:opacity-100 hover:border-gold-400/40"
                                    }`}
                                >
                                    <img
                                        src={scene.gifSrc}
                                        alt={scene.title}
                                        className="w-full h-full object-cover object-center"
                                    />
                                    <span className="absolute bottom-0 inset-x-0 bg-navy-950/90 text-[8px] font-mono text-center text-white/80 py-0.2">
                                        {idx + 1}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-1 shrink-0">
                        <button
                            onClick={handlePrev}
                            className="p-1 rounded bg-navy-900 border border-gold-400/30 text-gold-300 hover:bg-gold-400/20 transition"
                            aria-label="Previous reel scene"
                        >
                            <ChevronLeft size={14} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-1 rounded bg-navy-900 border border-gold-400/30 text-gold-300 hover:bg-gold-400/20 transition"
                            aria-label="Next reel scene"
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

                {/* Mobile Pagination Indicator Dots */}
                <div className="md:hidden flex items-center justify-center gap-1.5 pt-1">
                    {ALL_FEATURED_SCENES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveSceneIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                idx === activeSceneIndex ? "w-6 bg-gold-400" : "w-1.5 bg-white/30"
                            }`}
                            aria-label={`Go to scene ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
