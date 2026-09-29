"use client";

import { useState } from "react";

interface BrandLogoProps {
    className?: string;
    size?: number;
}

export default function BrandLogo({ className = "", size = 28 }: BrandLogoProps) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {!imgError ? (
                // Attempt to load the user's custom logo file from public/logo.png or public/logo.svg
                <img
                    src="/logo.png"
                    alt="AJ Ghost Logo"
                    width={size}
                    height={size}
                    className="object-contain"
                    onError={() => setImgError(true)}
                />
            ) : (
                // Stylized AJ Ghost monogram fallback until logo file is dropped into public/
                <div 
                    className="font-serif font-black text-gold-400 flex items-center justify-center tracking-tighter"
                    style={{ fontSize: `${Math.max(12, size * 0.55)}px` }}
                >
                    <span>AJ</span>
                </div>
            )}
        </div>
    );
}
