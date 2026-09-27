"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface SectionDividerProps {
    className?: string;
    subtle?: boolean;
}

export default function SectionDivider({ className, subtle = false }: SectionDividerProps) {
    return (
        <div className={twMerge("relative w-full h-16 md:h-24 overflow-hidden pointer-events-none select-none my-0", className)}>
            <div className="absolute inset-0 z-0">
                <Image
                    src="/section-divider.jpg"
                    alt=""
                    fill
                    className={twMerge(
                        "object-cover object-center",
                        subtle ? "opacity-35" : "opacity-60"
                    )}
                />
            </div>
            {/* Top and bottom gradients to seamlessly blend with navy-950 */}
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-navy-950 to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-navy-950 to-transparent z-10" />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent z-20" />
        </div>
    );
}
