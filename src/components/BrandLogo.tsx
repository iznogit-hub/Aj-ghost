"use client";

import { useState } from "react";

interface BrandLogoProps {
    className?: string;
    size?: number;
    showBorder?: boolean;
}

export default function BrandLogo({ className = "", size = 36, showBorder = true }: BrandLogoProps) {
    const [imgError, setImgError] = useState(false);

    return (
        <div
            className={`relative flex items-center justify-center rounded-full overflow-hidden select-none shrink-0 ${
                showBorder ? "ring-1 ring-gold-400/40 shadow-md shadow-gold-400/10" : ""
            } ${className}`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                minWidth: `${size}px`,
                minHeight: `${size}px`,
                clipPath: "circle(50% at 50% 50%)",
            }}
        >
            {!imgError ? (
                <img
                    src="/logo.png"
                    alt="AJ Ghost Logo"
                    width={size}
                    height={size}
                    className="w-full h-full object-cover rounded-full scale-[1.03] transition-transform duration-300 pointer-events-none"
                    style={{ clipPath: "circle(49.8% at 50% 50%)" }}
                    onError={() => setImgError(true)}
                />
            ) : (
                <div 
                    className="font-serif font-black text-gold-400 flex items-center justify-center tracking-tighter"
                    style={{ fontSize: `${Math.max(12, size * 0.5)}px` }}
                >
                    <span>AJ</span>
                </div>
            )}
        </div>
    );
}
