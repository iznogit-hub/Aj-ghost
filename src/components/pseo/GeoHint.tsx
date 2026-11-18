"use client";

import { useEffect, useState } from "react";

type Hint = {
    href: string;
    label: string;
    city: string;
    state: string;
    matchedBy: "city" | "coordinates" | "state";
};

export function GeoHint({ currentPath }: { currentPath: string }) {
    const [hint, setHint] = useState<Hint | null>(null);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        fetch("/api/geo-hint/", { signal: controller.signal })
            .then((response) => (response.ok ? response.json() : null))
            .then((data: Hint | { href: null } | null) => {
                if (data && "href" in data && data.href && data.href !== currentPath) {
                    setHint(data as Hint);
                }
            })
            .catch(() => {});
        return () => controller.abort();
    }, [currentPath]);

    if (!hint || hidden) return null;

    const message = hint.matchedBy === "state"
        ? <>In {hint.state}? Browse the <a className="text-gold-300 underline decoration-gold-400/40 underline-offset-4" href={hint.href}>{hint.label}</a>.</>
        : <>Reading from {hint.city}? Open <a className="text-gold-300 underline decoration-gold-400/40 underline-offset-4" href={hint.href}>{hint.label}</a>.</>;

    return (
        <aside className="mb-6 flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-white/75">
            <p>{message}</p>
            <button
                type="button"
                className="shrink-0 text-lg leading-none text-white/40 hover:text-white"
                onClick={() => setHidden(true)}
                aria-label="Dismiss location suggestion"
            >
                ×
            </button>
        </aside>
    );
}
