"use client";

import Button from "@/components/Button";
import designExample1 from "@/assets/images/design-example-1.png"; // Placeholder for Book Cover
import designExample2 from "@/assets/images/design-example-2.png"; // Placeholder for Skull/Villain
import Image from "next/image";
import Pointer from "@/components/Pointer";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import cursorImage from "@/assets/images/cursor-you.svg";

export default function Hero() {
    const [leftDesignScope, leftDesignAnimate] = useAnimate();
    const [leftPointerScope, leftPointerAnimate] = useAnimate();
    const [rightDesignScope, rightDesignAnimate] = useAnimate();
    const [rightPointerScope, rightPointerAnimate] = useAnimate();

    useEffect(() => {
        leftDesignAnimate([
            [leftDesignScope.current, { opacity: 1 }, { duration: 0.5 }],
            [leftDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
        ]);

        leftPointerAnimate([
            [leftPointerScope.current, { opacity: 1 }, { duration: 0.5 }],
            [leftPointerScope.current, { y: 0, x: -100 }, { duration: 0.5 }],
            [
                leftPointerScope.current,
                { y: [0, 16, 0], x: 0 },
                { duration: 0.5, ease: "easeInOut" },
            ],
        ]);

        rightDesignAnimate([
            [
                rightDesignScope.current,
                { opacity: 1 },
                { duration: 0.5, delay: 1.5 },
            ],
            [rightDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
        ]);

        rightPointerAnimate([
            [
                rightPointerScope.current,
                { opacity: 1 },
                { duration: 0.5, delay: 1.5 },
            ],
            [rightPointerScope.current, { y: 0, x: 175 }, { duration: 0.5 }],
            [
                rightPointerScope.current,
                { y: [0, 20, 0], x: 0 },
                { duration: 0.5, ease: "easeInOut" },
            ],
        ]);
    }, []);

    return (
        <section
            className="py-24 overflow-x-clip"
            style={{
                cursor: `url(${cursorImage.src}), auto`,
            }}
        >
            <div className="container relative ">
                <motion.div
                    ref={leftDesignScope}
                    initial={{ opacity: 0, y: 100, x: -100 }}
                    className="absolute -left-32 top-16 hidden lg:block"
                    drag
                >
                    <Image
                        draggable={false}
                        src={designExample1}
                        alt="Hunted Book Cover"
                    />
                </motion.div>
                <motion.div
                    ref={leftPointerScope}
                    initial={{ opacity: 0, y: 100, x: -200 }}
                    className="absolute top-96 left-56 hidden lg:block"
                >
                    <Pointer name="Ryan Kane" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 100, x: 100 }}
                    ref={rightDesignScope}
                    className="absolute -right-64 -top-16 hidden lg:block"
                    drag
                >
                    <Image
                        draggable={false}
                        src={designExample2}
                        alt="Skull Antagonist"
                    />
                </motion.div>
                <motion.div
                    ref={rightPointerScope}
                    initial={{ opacity: 0, x: 275, y: 100 }}
                    className="absolute -top-4 right-80 hidden lg:block"
                >
                    <Pointer color="red" name="Skull" />
                </motion.div>

                <div className="flex justify-center">
                    <div className="inline-flex py-1 px-3 bg-neutral-100 border border-neutral-200 rounded-full text-neutral-950 font-semibold text-sm">
                        ✨ New from AJ GHOST
                    </div>
                </div>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-center mt-6 tracking-tighter">
                    He knows where <br/>
                    you are. <span className="text-red-600">He always has.</span>
                </h1>
                <p className="text-center text-xl text-neutral-500 mt-8 max-w-2xl mx-auto">
                    The Watcher Series: Book 1. Predators recognize prey by the desperation in their eyes.
                </p>
                <form className="mx-auto flex border border-neutral-300 rounded-full p-2 mt-8 max-w-lg bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition">
                    <input
                        type="email"
                        placeholder="Enter email for Chapter 1"
                        className="bg-transparent px-4 flex-1 w-full text-neutral-950 placeholder:text-neutral-400 outline-none"
                    />
                    <Button
                        size="sm"
                        className="whitespace-nowrap bg-red-600 text-white border-red-600 hover:bg-red-700"
                        type="submit"
                        variant="primary"
                    >
                        Start Reading
                    </Button>
                </form>
            </div>
        </section>
    );
}