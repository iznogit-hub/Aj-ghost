"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";

const CTA = "https://dl.bookfunnel.com/j4e3jsxfr6?utm_source=ajghost&utm_medium=hero&utm_campaign=hunted_cinema&utm_content=cta";

type Panel = {
  id: number; gif: string | null; src: string; alt: string; speaker: "narrator" | "skull" | null;
  bubble: string | null; pendingApproval?: boolean; prose: string; burst: string | null;
  ms: number | null; counter?: string; cta?: { label: string; href: string };
};

export const HUNTED_PANELS: Panel[] = [
  { id: 1, gif: null, src: "/hunted/panels/panel_01.jpg", alt: "A soldier's silhouette walks alone down a dark corridor toward a single gold light.", speaker: "narrator", bubble: "Home from Kandahar.", prose: "Ryan Kane came home from Kandahar with a traumatic brain injury.", burst: "HOME", ms: 5000 },
  { id: 2, gif: null, src: "/hunted/panels/panel_02.jpg", alt: "An old car parked alone in a Phoenix lot at night, a man slumped behind the window.", speaker: "narrator", bubble: "Phoenix. The car. That's home now.", pendingApproval: true, prose: "He lives in his car in Phoenix.", burst: "STILL", ms: 5000 },
  { id: 3, gif: null, src: "/hunted/panels/panel_03.jpg", alt: "Hands grip a steering wheel beside a dashboard clock; the windshield reflection is doubled.", speaker: "narrator", bubble: "Was it an hour? Was it a day?", pendingApproval: true, prose: "His own memory doesn't always tell him the truth.", burst: "GLITCH", ms: 5000 },
  { id: 4, gif: null, src: "/hunted/panels/panel_04.jpg", alt: "A yellow notice pinned under a windshield wiper at dawn.", speaker: "narrator", bubble: "Seventy-two hours.", prose: "Then a yellow notice on his windshield starts a 72-hour clock.", burst: "TICK", ms: 6000, counter: "72:00:00" },
  { id: 5, gif: null, src: "/hunted/panels/panel_05.jpg", alt: "A faceless figure watches a sleeping street; tally marks cover the wall behind him.", speaker: "skull", bubble: "No one looks.", prose: "A predator called Skull has already been counting for weeks. He picks people society has stopped seeing. When they vanish, no one looks. Ryan is one of those people.", burst: "COUNTING", ms: 6000 },
  { id: 6, gif: null, src: "/haunted-cover.jpg", alt: "The cover of HUNTED by AJ Ghost.", speaker: null, bubble: null, prose: "HUNTED · The Ryan Kane Series, Book One. Free.", burst: null, ms: null, cta: { label: "GET HUNTED FREE", href: CTA } },
];

const SPEEDS = [3, 5, 8] as const;
const N = HUNTED_PANELS.length;

export default function HuntedCinema() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(5);
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const p = HUNTED_PANELS[i];
  const dur = p.ms ? (p.ms / 5000) * speed * 1000 : null; // 5s = default pacing

  useEffect(() => {
    if (reduce || !dur) return; // CTA panel holds
    const t = setTimeout(() => setI((n) => Math.min(n + 1, N - 1)), dur);
    return () => clearTimeout(t);
  }, [i, reduce, dur]);

  const go = (d: number) => setI((n) => (n + d + N) % N);
  const toggle = () => {
    const a = audio.current; if (!a) return;
    if (a.paused) { a.play(); setPlaying(true); } else { a.pause(); setPlaying(false); }
  };
  const img = !reduce && p.gif ? p.gif : p.src;

  return (
    <div className="mx-auto mt-8 max-w-4xl text-white">
      <h1 className="text-center font-serif text-5xl md:text-7xl font-bold tracking-tight text-white">HUNTED</h1>
      <p className="mt-3 text-center text-base md:text-lg text-white/90">
        A veteran hunted by a predator who knows how to use invisibility as a weapon.
      </p>

      <div
        className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-[#d4a827]/30 bg-[#030a1a] shadow-2xl outline-none"
        role="region" aria-roledescription="carousel"
        aria-label="HUNTED story preview, six panels. Use arrow keys to move between panels."
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={p.id} src={img} alt={p.alt}
            className={`absolute inset-0 h-full w-full ${p.cta ? "object-contain p-6" : "object-cover"}`}
            initial={reduce ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: reduce || p.gif || p.cta ? 1 : 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.7 }, scale: { duration: (dur ?? 5000) / 1000, ease: "linear" } }}
          />
        </AnimatePresence>
        <div className={`absolute inset-0 ${p.cta ? "bg-[#030a1a]/75" : "bg-gradient-to-t from-[#030a1a] via-[#030a1a]/25 to-transparent"}`} />

        <AnimatePresence mode="wait">
          <motion.div key={p.id} className="absolute inset-0" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            {p.counter && (
              <div className="absolute right-4 top-4 rounded-md border border-[#d4a827]/70 bg-[#030a1a]/85 px-3 py-1 font-mono text-lg text-white">{p.counter}</div>
            )}
            {p.burst && (
              <motion.div
                className="absolute left-4 top-4 md:left-6 md:top-6 rotate-[-6deg] font-serif text-3xl md:text-5xl font-black tracking-widest text-white"
                style={{ textShadow: "0 0 18px rgba(212,168,39,.55), 2px 2px 0 #030a1a" }}
                initial={reduce ? false : { scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.4 }}
              >{p.burst}</motion.div>
            )}
            {p.bubble && (
              <div className={`absolute top-16 md:top-20 max-w-[60%] ${p.speaker === "skull" ? "right-4 md:right-8" : "left-1/2 -translate-x-1/2"}`}>
                <div className={`relative rounded-2xl border-2 px-4 py-2 text-sm md:text-lg font-semibold text-white ${p.pendingApproval ? "border-dashed border-orange-400 bg-[#0c1f3d]/90" : "border-[#d4a827] bg-[#0c1f3d]/90"}`}>
                  &ldquo;{p.bubble}&rdquo;
                  {p.pendingApproval && (
                    <span className="mt-1 block text-[10px] md:text-xs font-bold uppercase tracking-wider text-orange-300">⚠ Pending approval (preview only)</span>
                  )}
                </div>
              </div>
            )}
            {p.cta ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
                <p className="font-serif text-xl md:text-3xl text-white">{p.prose}</p>
                <a href={p.cta.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-[#d4a827] bg-[#0c1f3d] px-8 py-3 font-semibold tracking-wide text-white transition hover:bg-[#122b52]">
                  {p.cta.label}
                </a>
                <p className="text-xs text-white/85">Book One of the Ryan Kane Series · Free on BookFunnel</p>
                <button onClick={() => setI(0)} className="text-xs text-white/70 underline hover:text-white">Replay</button>
              </div>
            ) : (
              <div className="absolute bottom-12 left-3 right-3 md:left-6 md:right-6">
                <p className="mx-auto max-w-2xl rounded-md border border-[#d4a827]/40 bg-[#030a1a]/80 px-4 py-2 text-center font-serif text-sm md:text-xl text-white">{p.prose}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-3">
          <button aria-label="Previous panel" onClick={() => go(-1)} className="p-1 text-white/80 hover:text-white"><ChevronLeft size={20} /></button>
          {HUNTED_PANELS.map((x, k) => (
            <button key={x.id} aria-label={`Panel ${k + 1}`} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-[#d4a827]" : "w-1.5 bg-white/40"}`} />
          ))}
          <button aria-label="Next panel" onClick={() => go(1)} className="p-1 text-white/80 hover:text-white"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
        <span className="text-white/80">Speed</span>
        {SPEEDS.map((s) => (
          <button key={s} onClick={() => setSpeed(s)} aria-pressed={speed === s}
            className={`rounded-md border px-3 py-1 text-white ${speed === s ? "border-[#d4a827] bg-[#0c1f3d]" : "border-white/25 hover:border-white/60"}`}>{s}s</button>
        ))}
        <button onClick={toggle} aria-pressed={playing}
          className="ml-2 inline-flex items-center gap-2 rounded-md border border-white/30 bg-[#0c1f3d]/60 px-4 py-1.5 text-white hover:border-white/60">
          {playing ? <Pause size={14} /> : <Play size={14} />}{playing ? "Pause narration" : "Listen to the trailer"}
        </button>
        <audio ref={audio} src="/hunted/audio/hunted_hero_narration.mp3" preload="none" onEnded={() => setPlaying(false)} />
      </div>
      <p className="mt-8 text-center text-sm text-white/90">Or get Chapter 1 of every new thriller in your inbox:</p>
    </div>
  );
}
