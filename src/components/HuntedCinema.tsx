"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";

const CTA_HREF =
  "https://dl.bookfunnel.com/j4e3jsxfr6?utm_source=ajghost&utm_medium=hero&utm_campaign=hunted_cinema&utm_content=cta";

const PANELS = [
  { src: "/hunted/panels/panel_01.jpg", alt: "A soldier's silhouette walks alone down a dark corridor toward a single gold light.", line: "Ryan Kane came home from Kandahar with a traumatic brain injury.", ms: 5000 },
  { src: "/hunted/panels/panel_02.jpg", alt: "An old car parked alone in a Phoenix lot at night, a man slumped behind the window.", line: "He lives in his car in Phoenix.", ms: 5000 },
  { src: "/hunted/panels/panel_03.jpg", alt: "Hands grip a steering wheel beside a dashboard clock; the windshield reflection is doubled.", line: "His own memory doesn't always tell him the truth.", ms: 5000 },
  { src: "/hunted/panels/panel_04.jpg", alt: "A yellow notice pinned under a windshield wiper at dawn.", line: "Then a yellow notice on his windshield starts a 72-hour clock.", ms: 6000, counter: "72:00:00" },
  { src: "/hunted/panels/panel_05.jpg", alt: "A faceless figure watches a sleeping street; tally marks cover the wall behind him.", line: "A predator called Skull has already been counting for weeks. When they vanish, no one looks. Ryan is one of those people.", ms: 7000 },
];

export default function HuntedCinema() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setI((n) => (n + 1) % PANELS.length), PANELS[i].ms);
    return () => clearTimeout(t);
  }, [i, reduce]);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) { a.play(); setPlaying(true); } else { a.pause(); setPlaying(false); }
  };
  const p = PANELS[i];

  return (
    <div className="mx-auto mt-8 max-w-4xl text-white">
      <h1 className="text-center font-serif text-5xl md:text-7xl font-bold tracking-tight text-white">HUNTED</h1>
      <p className="mt-3 text-center text-base md:text-lg text-white/90">
        A veteran hunted by a predator who knows how to use invisibility as a weapon.
      </p>

      <div
        className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-[#d4a827]/30 bg-[#030a1a] shadow-2xl"
        role="region"
        aria-roledescription="carousel"
        aria-label="HUNTED story preview, five panels"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setI((n) => (n + 1) % PANELS.length);
          if (e.key === "ArrowLeft") setI((n) => (n - 1 + PANELS.length) % PANELS.length);
        }}
        tabIndex={0}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={p.src}
            src={p.src}
            alt={p.alt}
            className="absolute inset-0 h-full w-full object-cover"
            initial={reduce ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: reduce ? 1 : 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.8 }, scale: { duration: p.ms / 1000, ease: "linear" } }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030a1a] via-[#030a1a]/30 to-transparent" />
        {p.counter && (
          <div className="absolute right-4 top-4 rounded-md border border-[#d4a827]/60 bg-[#030a1a]/80 px-3 py-1 font-mono text-lg text-white">
            {p.counter}
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.p
            key={p.line}
            className="absolute bottom-14 left-0 right-0 px-6 text-center font-serif text-lg md:text-2xl text-white drop-shadow-lg"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {p.line}
          </motion.p>
        </AnimatePresence>
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-3">
          <button aria-label="Previous panel" onClick={() => setI((n) => (n - 1 + PANELS.length) % PANELS.length)} className="p-1 text-white/80 hover:text-white"><ChevronLeft size={20} /></button>
          {PANELS.map((_, k) => (
            <button key={k} aria-label={`Panel ${k + 1}`} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-[#d4a827]" : "w-1.5 bg-white/40"}`} />
          ))}
          <button aria-label="Next panel" onClick={() => setI((n) => (n + 1) % PANELS.length)} className="p-1 text-white/80 hover:text-white"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={CTA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg border-2 border-[#d4a827] bg-[#0c1f3d] px-7 py-3 font-semibold tracking-wide text-white transition hover:bg-[#122b52]"
        >
          GET HUNTED FREE
        </a>
        <button
          onClick={toggle}
          aria-pressed={playing}
          className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-[#0c1f3d]/60 px-5 py-3 text-sm text-white hover:border-white/60"
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
          {playing ? "Pause narration" : "Listen to the trailer"}
        </button>
        <audio ref={audio} src="/hunted/audio/hunted_hero_narration.mp3" preload="none" onEnded={() => setPlaying(false)} />
      </div>
      <p className="mt-2 text-center text-xs text-white/80">Book One of the Ryan Kane Series · Free on BookFunnel</p>
      <p className="mt-8 text-center text-sm text-white/90">Or get Chapter 1 of every new thriller in your inbox:</p>
    </div>
  );
}
