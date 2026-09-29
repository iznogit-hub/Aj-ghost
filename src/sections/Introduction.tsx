"use client";

import Tag from "@/components/Tag";
import {
    useScroll,
    useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const text = `They told Ryan to "get help". They didn't warn him that the man offering salvation is a predator. And they didn't tell him that survival comes at a cost no veteran should ever have to pay.`;
const words = text.split(" ");

export default function Introduction() {
    const scrollTarget = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: scrollTarget,
        offset: ["start end", "end end"],
    });

    const [currentWord, setCurrentWord] = useState(0);

    const wordIndex = useTransform(scrollYProgress, [0, 1], [0, words.length]);

    useEffect(() => {
        wordIndex.on("change", (latest) => {
            setCurrentWord(latest);
        });
    }, [wordIndex]);

    return (
        <section className="py-28 lg:py-40 bg-navy-950 relative" id="introduction">
            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(212, 168, 39, 0.1) 0%, transparent 50%),
                                      radial-gradient(circle at 75% 75%, rgba(212, 168, 39, 0.05) 0%, transparent 50%)`,
                }}></div>
            </div>

            <div className="container relative">
                <div className="sticky top-28 md:top-32">
                    <div className="flex justify-center">
                        <Tag>The Premise</Tag>
                    </div>
                    <div className="text-4xl md:text-6xl lg:text-7xl text-center font-serif font-medium mt-10 tracking-tight leading-tight">
                        <span className="text-gold-gradient">When they vanish,&nbsp;</span>
                        <span className="text-navy-700">
                            {words.map((word, wordIdx) => (
                                <span
                                    key={wordIdx}
                                    className={twMerge(
                                        "transition duration-500 text-navy-700",
                                        wordIdx < currentWord && "text-white/90"
                                    )}
                                >{`${word} `}</span>
                            ))}
                        </span>
                        <span className="text-gold-400 block mt-6 font-bold">
                            No one looks.
                        </span>
                    </div>
                </div>
                <div ref={scrollTarget} className="h-[150vh]"></div>
            </div>
        </section>
    );
}