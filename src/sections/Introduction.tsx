"use client";

import Tag from "@/components/Tag";
import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import bookCover from "@/assets/images/design-example-1.png"; // Your cover image

const text = `Ryan Kane lost more than his memory in Kandahar—he lost the ability to trust his own mind. Now he's living in his car in Phoenix, dismissed by society, forgotten by family. He's exactly the kind of prey the man in the gray suit hunts.`;
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
        <section className="py-28 lg:py-40 bg-white" id="introduction">
            <div className="container">
                <div className="sticky top-28 md:top-32">
                    
                    {/* --- BACKGROUND WATERMARK (STRAIGHT) --- */}
                    {/* Removed 'rotate-6' so it stands straight */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none flex items-center justify-center">
                        <div className="relative w-[600px] h-[800px] opacity-[0.12] grayscale">
                            <Image
                                src={bookCover}
                                alt="Background Book Cover"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* --- FOREGROUND CONTENT --- */}
                    <div className="relative z-10">
                        <div className="flex justify-center">
                            <Tag>The Premise</Tag>
                        </div>
                        <div className="text-4xl md:text-6xl lg:text-7xl text-center font-medium mt-10 tracking-tighter">
                            <span>When they vanish,&nbsp;</span>
                            <span className="text-neutral-200">
                                {words.map((word, wordIndex) => (
                                    <span
                                        key={wordIndex}
                                        className={twMerge(
                                            "transition duration-500 text-neutral-200",
                                            wordIndex < currentWord && "text-neutral-950"
                                        )}
                                    >{`${word} `}</span>
                                ))}
                            </span>
                            <span className="text-red-600 block mt-6 font-bold">
                                No one looks.
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Scroll Spacer */}
                <div ref={scrollTarget} className="h-[150vh]"></div>
            </div>
        </section>
    );
}