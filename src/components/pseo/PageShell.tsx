import type { ReactNode } from "react";
import Footer from "@/sections/Footer";
import Navbar from "@/sections/Navbar";
import { GeoHint } from "@/components/pseo/GeoHint";

export function PageShell({
    children,
    currentPath,
    width = "wide",
}: {
    children: ReactNode;
    currentPath: string;
    width?: "wide" | "narrow";
}) {
    const measure = width === "narrow" ? "max-w-3xl" : "max-w-5xl";
    return (
        <div className="min-h-screen bg-navy-950 text-white selection:bg-gold-400 selection:text-navy-950">
            <Navbar />
            <main className="px-4 pb-8 pt-28 sm:px-6 md:pt-32">
                <div className={`mx-auto w-full ${measure}`}>
                    <GeoHint currentPath={currentPath} />
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
