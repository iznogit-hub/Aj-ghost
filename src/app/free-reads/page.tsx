import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/pseo/Breadcrumbs";
import { PageShell } from "@/components/pseo/PageShell";
import { AUTHOR_NAME, SERIES_NAME } from "@/lib/books";
import { publishedMicrobooks } from "@/lib/content/load";
import { readingMinutes } from "@/lib/content/text";

const title = "Free reads | AJ Ghost";
const description = "Five original short stories set in the world of The Ryan Kane Series. Each story has one canonical page. City pages may embed them.";

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/free-reads/" },
    openGraph: { title, description, url: "/free-reads/", siteName: AUTHOR_NAME, type: "website" },
    twitter: { card: "summary_large_image", title, description },
};

export default function FreeReadsIndex() {
    const stories = publishedMicrobooks();
    return (
        <PageShell currentPath="/free-reads/" width="narrow">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Free reads" }]} />
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold-400/80">{SERIES_NAME}</p>
            <h1 className="mt-3 font-serif text-4xl text-white sm:text-6xl">Free reads</h1>
            <p className="mt-5 text-base leading-8 text-white/70">{description}</p>
            <ul className="mt-10 space-y-4">
                {stories.map((story) => (
                    <li key={story.slug}>
                        <Link href={story.route} className="block rounded-3xl border border-white/10 p-5 hover:border-gold-400/40">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-gold-400/80">{story.id} · {readingMinutes(story.wordCount)} min</span>
                            <span className="mt-2 block font-serif text-2xl text-white">{story.title}</span>
                            <span className="mt-2 block text-sm leading-relaxed text-white/60">{story.logline}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </PageShell>
    );
}
