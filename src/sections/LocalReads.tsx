import Link from "next/link";
import Tag from "@/components/Tag";
import { publishedLandings } from "@/lib/content/load";

export default function LocalReads() {
    const pages = publishedLandings().filter((page) => page.pageKind === "city").slice(0, 6);
    if (!pages.length) return null;

    return (
        <section id="local-reads" className="relative overflow-hidden bg-navy-950 py-20">
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
            <div className="container relative">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="flex justify-center">
                        <Tag>Read locally</Tag>
                    </div>
                    <h2 className="mt-6 font-serif text-4xl font-bold tracking-tight text-white md:text-5xl">
                        A page for the city you are actually in
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-white/50 md:text-lg">
                        One city page is live: a short story you can read here, then HUNTED, the Book 1 prequel, free on BookFunnel.
                    </p>
                </div>
                <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
                    {pages.map((page) => (
                        <Link
                            key={page.route}
                            href={page.route}
                            className="glass-card block rounded-3xl p-6 transition duration-300 hover:border-gold-400/40"
                        >
                            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold-400/80">{page.cityName}</span>
                            <span className="mt-3 block font-serif text-2xl text-white">{page.h1}</span>
                            <span className="mt-3 block text-sm leading-relaxed text-white/50">{page.localAngle.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
