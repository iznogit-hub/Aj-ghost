"use client";

import Button from "@/components/Button";
import cursorImage from "@/assets/images/cursor-you.svg";

export default function Hero() {
    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden py-0" // Removed py-24 to let it control spacing via flex
            style={{
                cursor: `url(${cursorImage.src}), auto`,
            }}
        >
            {/* --- VIDEO BACKGROUND --- */}
            {/* Added 'h-[120vh]' to ensure it stretches slightly beyond scroll for safety, or just 'h-full' if parent is screen */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                >
                    <source src="/intro.mp4" type="video/mp4" />
                </video>
                
                {/* --- OPACITY LAYER --- */}
                {/* Adjust 'bg-white/60' to control visibility. 
                    /40 = Video is stronger. 
                    /80 = Video is fainter. */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]"></div>
                
                {/* Bottom Fade Gradient (optional, makes smooth transition to next section) */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
            </div>

            {/* --- FOREGROUND CONTENT --- */}
            <div className="container relative z-10 mt-20"> {/* Added mt-20 to offset the fixed Navbar */}
                <div className="flex justify-center">
                    <div className="inline-flex py-1 px-3 bg-white/70 backdrop-blur-md border border-neutral-200 rounded-full text-neutral-950 font-semibold text-sm shadow-sm">
                        ✨ #1 New Release in Psychological Thrillers
                    </div>
                </div>
                
                <h1 className="text-6xl md:text-7xl lg:text-9xl font-medium text-center mt-6 tracking-tighter text-neutral-950 drop-shadow-sm">
                    He&apos;s invisible. Homeless. <br/>
                    <span className="line-through decoration-red-600 decoration-4 text-neutral-600">Hunted.</span>
                </h1>
                
                <p className="text-center text-xl md:text-2xl text-neutral-800 mt-8 max-w-2xl mx-auto font-medium">
                    You can&apos;t escape a predator who&apos;s already inside your head.
                </p>
                
                <form className="mx-auto flex border border-neutral-300 rounded-full p-2 mt-10 max-w-lg bg-white/80 backdrop-blur-xl shadow-2xl transition duration-300 hover:border-red-600/50">
                    <input
                        type="email"
                        placeholder="Enter your email for Chapter 1"
                        className="bg-transparent px-4 flex-1 w-full text-neutral-950 placeholder:text-neutral-500 outline-none font-medium"
                    />
                    <Button
                        size="sm"
                        className="whitespace-nowrap bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700"
                        type="submit"
                        variant="primary"
                    >
                        Get Free Chapter
                    </Button>
                </form>
            </div>
        </section>
    );
}