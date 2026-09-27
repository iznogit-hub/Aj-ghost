"use client";

import { AnimationPlaybackControls, motion, useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function CallToAction() {
    const animation = useRef<AnimationPlaybackControls>();
    const [scope, animate] = useAnimate();

    const [slowDownAnimation, setSlowDownAnimation] = useState(false);

    useEffect(() => {
        animation.current = animate(
            scope.current,
            { x: "-50%" },
            { duration: 30, ease: "linear", repeat: Infinity }
        );
    }, []);

    useEffect(() => {
        if (animation.current) {
            animation.current.speed = slowDownAnimation ? 0.5 : 1;
        }
    }, [slowDownAnimation]);

    return (
        <section className="py-20 overflow-hidden bg-navy-900 relative">
            {/* Top crack */}
            <div className="crack-divider mb-10"></div>

            <div className="overflow-x-clip p-4 flex">
                <motion.div
                    ref={scope}
                    className="flex flex-none gap-16 pr-16 text-6xl md:text-8xl font-serif font-bold tracking-tight"
                    onMouseEnter={() => setSlowDownAnimation(true)}
                    onMouseLeave={() => setSlowDownAnimation(false)}
                >
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-16">
                            <span className="text-gold-400 text-5xl">
                                ✦
                            </span>
                            <span className={twMerge(
                                "text-white/20 transition duration-500 cursor-default",
                                slowDownAnimation && "text-gold-gradient"
                            )}>
                                Enter the Darkness
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom crack */}
            <div className="crack-divider mt-10"></div>
        </section>
    );
}