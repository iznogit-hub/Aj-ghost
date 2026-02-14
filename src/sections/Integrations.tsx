"use client";

import Tag from "@/components/Tag";
import Image from "next/image";
import designExample1 from "@/assets/images/design-example-1.png"; // Your Book Cover
import figmaIcon from "@/assets/images/figma-logo.svg"; 
import notionIcon from "@/assets/images/notion-logo.svg"; 
import slackIcon from "@/assets/images/slack-logo.svg"; 
import relumeIcon from "@/assets/images/relume-logo.svg"; 
import framerIcon from "@/assets/images/framer-logo.svg"; 
import githubIcon from "@/assets/images/github-logo.svg"; 

const platforms = [
    { name: "Kindle", icon: figmaIcon },
    { name: "Audible", icon: notionIcon },
    { name: "Paperback", icon: slackIcon },
    { name: "Goodreads", icon: relumeIcon },
    { name: "Apple Books", icon: framerIcon },
    { name: "Hardcover", icon: githubIcon },
];

export default function Integrations() {
    return (
        <section className="py-24 overflow-hidden bg-neutral-950" id="integrations">
            <div className="container">
                <div className="grid lg:grid-cols-2 items-center gap-16">
                    
                    {/* --- LEFT COLUMN: PORTRAIT IMAGE --- */}
                    <div className="flex justify-center lg:justify-start relative">
                        {/* Glow Effect behind book */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-red-600/20 blur-[100px] rounded-full pointer-events-none"></div>
                        
                        <div className="relative w-[300px] md:w-[400px] aspect-[2/3] rotate-3 hover:rotate-0 transition duration-500">
                            <Image
                                src={designExample1}
                                alt="Hunted Book Cover"
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: TEXT & PLATFORMS --- */}
                    <div>
                        <Tag>Availability</Tag>
                        <h2 className="text-6xl font-medium mt-6 tracking-tighter text-white">
                            Read it <span className="text-red-600">Anywhere</span>
                        </h2>

                        <p className="text-white/60 mt-4 text-lg leading-relaxed mb-10">
                            HUNTED is available across all major formats. Whether you prefer digital, audio, or the weight of a book in your hands, the nightmare is ready for you.
                        </p>

                        {/* Static Platform Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {platforms.map((platform) => (
                                <div 
                                    key={platform.name}
                                    className="bg-neutral-900 border border-white/10 p-4 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-red-600/50 hover:bg-neutral-800 transition duration-300 group cursor-pointer"
                                >
                                    <Image 
                                        src={platform.icon} 
                                        alt={platform.name} 
                                        className="size-10 opacity-70 group-hover:opacity-100 transition"
                                    />
                                    <span className="text-sm font-medium text-white/70 group-hover:text-white transition">
                                        {platform.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}