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
        <section className="py-24 border-t border-neutral-100 bg-neutral-50 overflow-hidden">
            <div className="overflow-x-clip p-4 flex">
                <motion.div
                    ref={scope}
                    className="flex flex-none gap-16 pr-16 text-7xl md:text-8xl font-medium tracking-tighter"
                    onMouseEnter={() => setSlowDownAnimation(true)}
                    onMouseLeave={() => setSlowDownAnimation(false)}
                >
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-16">
                            <span className="text-red-600 text-7xl">
                                &#10038;
                            </span>
                            <span className={twMerge("text-neutral-950 group-hover:text-red-600 transition", slowDownAnimation && "text-red-600")}>
                                Read HUNTED Now
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}