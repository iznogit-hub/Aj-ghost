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
    Sparkles
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
    const [postProcessEnabled, setPostProcessEnabled] = useState(true);
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
                preload="none" 
                onEnded={() => setIsAudioPlaying(false)} 
            />

            {/* =========================================================================
                1. BACKGROUND CINEMA CANVAS (Mobile 9:16 Full Screen & Desktop Ambient Fill)
               ========================================================================= */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeScene.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* Mobile: 9:16 Full Screen Direct Cover */}
                        <div className="md:hidden absolute inset-0 w-full h-full overflow-hidden">
                            <img
                                src={activeScene.gifSrc}
                                alt={activeScene.title}
                                className={`w-full h-full object-cover object-center scale-[1.03] transition-all duration-700 ${
                                    postProcessEnabled ? "cinema-media-grade" : ""
                                }`}
                                loading="eager"
                            />

                            {/* Mobile Post-Processing Layers (Smooths low-res pixels & banding) */}
                            {postProcessEnabled && (
                                <>
                                    {/* 35mm Analog Film Grain */}
                                    <div className="absolute inset-0 cinema-grain opacity-40" />
                                    {/* Comic / CRT Micro-Scanlines */}
                                    <div className="absolute inset-0 cinema-scanlines opacity-35" />
                                    {/* Graphic Novel Halftone Matrix */}
                                    <div className="absolute inset-0 cinema-halftone opacity-30" />
                                </>
                            )}

                            {/* Mobile Comic Texture & Darkness Vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/80" />
                            <div className="absolute inset-0 bg-radial-vignette opacity-80" />
                        </div>

                        {/* Desktop: Ambient Blurred Backdrop */}
                        <div className="hidden md:block absolute inset-0 w-full h-full overflow-hidden">
                            <img
                                src={activeScene.gifSrc}
                                alt={activeScene.title}
                                className={`w-full h-full object-cover object-center filter blur-2xl scale-125 opacity-35 brightness-60 transition-all duration-700 ${
                                    postProcessEnabled ? "cinema-media-grade" : ""
                                }`}
                            />
                            {/* Desktop Ambient Grain */}
                            {postProcessEnabled && (
                                <div className="absolute inset-0 cinema-grain opacity-25" />
                            )}
                            <div className="absolute inset-0 bg-navy-950/85" />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950" />
                        </div>
                    </motion.div>
                </AnimatePresence>

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

                {/* Center / Right: Act Selector, Post-Processing FX, Narration Audio & Controls */}
                <div className="flex items-center gap-2">
                    {/* Post-Processing Shaders Toggle (35mm Grain & Scanlines) */}
                    <button
                        onClick={() => setPostProcessEnabled(!postProcessEnabled)}
                        className={`flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-mono border backdrop-blur-md transition-all duration-300 ${
                            postProcessEnabled
                                ? "bg-navy-900/90 border-gold-400/60 text-gold-300 shadow-sm shadow-gold-400/20"
                                : "bg-navy-950/70 border-white/20 text-white/40 hover:text-white/70"
                        }`}
                        title={postProcessEnabled ? "Cinema Post-Processing: Active" : "Cinema Post-Processing: Raw"}
                    >
                        <Sparkles size={13} className={postProcessEnabled ? "text-gold-400 animate-pulse" : "text-white/40"} />
                        <span className="hidden sm:inline">
                            {postProcessEnabled ? "FX: 35mm Noir" : "FX: Raw"}
                        </span>
                    </button>

                    {/* Narration Audio Button */}
                    <button
                        onClick={toggleAudio}
                        className={`flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-mono border backdrop-blur-md transition-all duration-300 ${
                            isAudioPlaying
                                ? "bg-gold-400 text-navy-950 border-gold-400 font-bold shadow-md shadow-gold-400/25"
                                : "bg-navy-900/80 border-gold-400/30 text-white/80 hover:text-gold-300 hover:border-gold-400/50"
                        }`}
                        title={isAudioPlaying ? "Mute Narration" : "Listen to Trailer Narration"}
                    >
                        {isAudioPlaying ? <Volume2 size={13} className="animate-pulse" /> : <VolumeX size={13} />}
                        <span className="hidden sm:inline">{isAudioPlaying ? "Narration: Playing" : "Trailer Narration"}</span>
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

                {/* --- DESKTOP VIEW: CINEMA COMIC PANELS / TRIPTYCH --- */}
                <div className="hidden md:block w-full">
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
                                /* --- 3-PANEL GRAPHIC NOVEL SPREAD --- */
                                <div className="w-full grid grid-cols-12 gap-4 items-center">
                                    {/* Left Flanking Panel (Preceding Action) */}
                                    <div className="col-span-3 aspect-[16/10] relative rounded-xl overflow-hidden border border-gold-400/20 bg-navy-900/90 shadow-2xl group transition-all duration-500 hover:border-gold-400/60 hover:scale-[1.02]">
                                        <img
                                            src={activeScene.subGifs?.[0] || activeScene.gifSrc}
                                            alt=""
                                            className={`w-full h-full object-cover object-center filter grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition duration-500 ${
                                                postProcessEnabled ? "cinema-media-grade" : ""
                                            }`}
                                        />
                                        {postProcessEnabled && (
                                            <>
                                                <div className="absolute inset-0 cinema-grain opacity-25 pointer-events-none" />
                                                <div className="absolute inset-0 cinema-scanlines opacity-20 pointer-events-none" />
                                            </>
                                        )}
                                        <div className="absolute inset-0 bg-navy-950/40 group-hover:bg-transparent transition duration-500 pointer-events-none" />
                                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-navy-950/90 border border-gold-400/30 rounded text-[9px] font-mono text-gold-400 uppercase tracking-widest">
                                            PANEL 01
                                        </div>
                                    </div>

                                    {/* Center Dominant Hero Panel */}
                                    <div className="col-span-6 aspect-video relative rounded-2xl overflow-hidden border-2 border-gold-400/40 bg-navy-900 shadow-[0_0_50px_rgba(212,168,39,0.18)] ring-1 ring-gold-400/20 group">
                                        <img
                                            src={activeScene.gifSrc}
                                            alt={activeScene.title}
                                            className={`w-full h-full object-cover object-center transition-all duration-700 ${
                                                postProcessEnabled ? "cinema-media-grade" : ""
                                            }`}
                                        />

                                        {/* Center Panel Post-Processing Shaders */}
                                        {postProcessEnabled && (
                                            <>
                                                <div className="absolute inset-0 cinema-grain opacity-35 pointer-events-none" />
                                                <div className="absolute inset-0 cinema-scanlines opacity-25 pointer-events-none" />
                                                <div className="absolute inset-0 cinema-halftone opacity-20 pointer-events-none" />
                                            </>
                                        )}

                                        {/* Cinema Letterbox Overlay Inside Panel */}
                                        <div className="absolute inset-0 pointer-events-none border-t-8 border-b-8 border-navy-950/70" />
                                        
                                        {/* Comic Narrative Caption Box */}
                                        <div className="absolute bottom-4 left-4 right-4 bg-navy-950/90 backdrop-blur-md border border-gold-400/40 p-3 rounded-lg shadow-xl">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-mono text-[10px] text-gold-400 font-bold tracking-widest uppercase">
                                                    {activeScene.actName} // {activeScene.title}
                                                </span>
                                                <span className="font-mono text-[10px] text-white/50">{activeScene.timecode}</span>
                                            </div>
                                            <p className="font-serif text-sm text-white/90 italic leading-snug">
                                                "{activeScene.caption}"
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Flanking Panel (Following Action) */}
                                    <div className="col-span-3 aspect-[16/10] relative rounded-xl overflow-hidden border border-gold-400/20 bg-navy-900/90 shadow-2xl group transition-all duration-500 hover:border-gold-400/60 hover:scale-[1.02]">
                                        <img
                                            src={activeScene.subGifs?.[1] || activeScene.gifSrc}
                                            alt=""
                                            className={`w-full h-full object-cover object-center filter grayscale contrast-125 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition duration-500 ${
                                                postProcessEnabled ? "cinema-media-grade" : ""
                                            }`}
                                        />
                                        {postProcessEnabled && (
                                            <>
                                                <div className="absolute inset-0 cinema-grain opacity-25 pointer-events-none" />
                                                <div className="absolute inset-0 cinema-scanlines opacity-20 pointer-events-none" />
                                            </>
                                        )}
                                        <div className="absolute inset-0 bg-navy-950/40 group-hover:bg-transparent transition duration-500 pointer-events-none" />
                                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-navy-950/90 border border-gold-400/30 rounded text-[9px] font-mono text-gold-400 uppercase tracking-widest">
                                            PANEL 03
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* --- WIDESCREEN CINEMA THEATER VIEW --- */
                                <div className="w-full max-w-4xl aspect-[2.35/1] relative rounded-2xl overflow-hidden border-2 border-gold-400/40 shadow-2xl bg-navy-950">
                                    <img
                                        src={activeScene.gifSrc}
                                        alt={activeScene.title}
                                        className={`w-full h-full object-cover object-center transition-all duration-700 ${
                                            postProcessEnabled ? "cinema-media-grade" : ""
                                        }`}
                                    />
                                    {/* Post-Processing Overlays */}
                                    {postProcessEnabled && (
                                        <>
                                            <div className="absolute inset-0 cinema-grain opacity-35 pointer-events-none" />
                                            <div className="absolute inset-0 cinema-scanlines opacity-30 pointer-events-none" />
                                            <div className="absolute inset-0 cinema-halftone opacity-25 pointer-events-none" />
                                        </>
                                    )}
                                    <div className="absolute top-0 inset-x-0 h-8 bg-black/80 flex items-center justify-between px-4 font-mono text-[10px] text-gold-400/70 border-b border-gold-400/20">
                                        <span>PROD: AJ GHOST</span>
                                        <span>ANAMORPHIC 2.35:1</span>
                                        <span>{activeScene.timecode}</span>
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 h-8 bg-black/80 flex items-center justify-between px-4 font-mono text-[10px] text-white/60 border-t border-gold-400/20">
                                        <span>{activeScene.title}</span>
                                        <span className="text-gold-300 italic font-serif">"{activeScene.caption}"</span>
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
                                        className={`w-full h-full object-cover object-center ${
                                            postProcessEnabled ? "cinema-media-grade" : ""
                                        }`}
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
