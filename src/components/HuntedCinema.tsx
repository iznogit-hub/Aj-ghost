"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import PANELS from "@/data/huntedCinema.json";

const CTA = "https://dl.bookfunnel.com/j4e3jsxfr6?utm_source=ajghost&utm_medium=hero&utm_campaign=hunted_cinema&utm_content=cta";
const SPEEDS = [3, 5, 8] as const;
const N = PANELS.length + 1; // + end card

export default function HuntedCinema() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(5);
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const end = i === N - 1;
  const p = end ? null : PANELS[i];

  useEffect(() => {
    if (reduce || end) return;
    const t = setTimeout(() => setI((n) => Math.min(n + 1, N - 1)), speed * 1000);
    return () => clearTimeout(t);
  }, [i, reduce, end, speed]);

  const go = (d: number) => setI((n) => (n + d + N) % N);
  const toggle = () => {
    const a = audio.current; if (!a) return;
    if (a.paused) { a.play(); setPlaying(true); } else { a.pause(); setPlaying(false); }
  };

  return (
    <div className="mx-auto mt-8 max-w-4xl text-white">
      <h1 className="text-center font-serif text-5xl md:text-7xl font-bold tracking-tight text-white">HUNTED</h1>
      <p className="mt-3 text-center text-base md:text-lg text-white/90">
        A veteran hunted by a predator who knows how to use invisibility as a weapon.
      </p>

      <div
        className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-[#d4a827]/30 bg-[#030a1a] shadow-2xl outline-none"
        role="region" aria-roledescription="carousel" aria-label="HUNTED story preview. Use arrow keys to move between panels."
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}
      >
        <AnimatePresence mode="wait">
          {p ? (
            <motion.div key={p.id} className="absolute inset-0" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              {p.media && (
                <video key={p.media} src={p.media} autoPlay={!reduce} loop muted playsInline preload="auto"
                  className={`absolute inset-0 h-full w-full object-cover ${p.still ? "brightness-75 saturate-50" : ""}`} aria-hidden="true" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030a1a] via-[#030a1a]/30 to-transparent" />
              <div className="absolute left-4 top-4 rounded-md bg-[#030a1a]/70 px-3 py-1 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-white">
                {p.scene}. {p.title}
              </div>
              <div className="absolute bottom-12 left-3 right-3 md:left-8 md:right-8">
                <p className="mx-auto max-w-3xl rounded-md border border-[#d4a827]/40 bg-[#030a1a]/85 px-4 py-2 text-center font-serif text-sm md:text-xl leading-snug text-white">
                  {p.caption}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="end" className="absolute inset-0" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <img src="/haunted-cover.jpg" alt="The cover of HUNTED by AJ Ghost." className="absolute inset-0 h-full w-full object-contain p-6" />
              <div className="absolute inset-0 bg-[#030a1a]/75" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
                <p className="font-serif text-2xl md:text-4xl text-white">He knows where you are. He always has.</p>
                <a href={CTA} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-[#d4a827] bg-[#0c1f3d] px-8 py-3 font-semibold tracking-wide text-white transition hover:bg-[#122b52]">
                  GET HUNTED FREE
                </a>
                <p className="text-xs text-white/85">Book One of the Ryan Kane Series · Free on BookFunnel</p>
                <button onClick={() => setI(0)} className="text-xs text-white/70 underline hover:text-white">Replay</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-3 text-xs text-white/85">
          <button aria-label="Previous panel" onClick={() => go(-1)} className="p-1 hover:text-white"><ChevronLeft size={20} /></button>
          <span>{i + 1} / {N}</span>
          <div className="h-1 w-32 md:w-56 overflow-hidden rounded-full bg-white/20"><div className="h-full bg-[#d4a827]" style={{ width: `${((i + 1) / N) * 100}%` }} /></div>
          <button aria-label="Next panel" onClick={() => go(1)} className="p-1 hover:text-white"><ChevronRight size={20} /></button>
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
