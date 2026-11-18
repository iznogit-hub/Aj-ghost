import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCta } from "@/components/pseo/BookCta";
import { Breadcrumbs } from "@/components/pseo/Breadcrumbs";
import { JsonLd } from "@/components/pseo/JsonLd";
import { MicroBookView } from "@/components/pseo/MicroBook";
import { PageShell } from "@/components/pseo/PageShell";
import { AUTHOR_NAME } from "@/lib/books";
import { getMicrobook, landingsUsing, publishedMicrobooks } from "@/lib/content/load";
import { storyJsonLd } from "@/lib/content/schema";

export const dynamicParams = false;

export function generateStaticParams() {
    return publishedMicrobooks().map((book) => ({ slug: book.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const story = getMicrobook(params.slug);
    if (!story) return { title: "Not found", robots: { index: false, follow: false } };
    const title = `${story.title} | Free read | AJ Ghost`;
    return {
        title,
        description: story.logline,
        alternates: { canonical: story.route },
        authors: [{ name: AUTHOR_NAME }],
        openGraph: { title, description: story.logline, type: "article", url: story.route, siteName: AUTHOR_NAME, publishedTime: story.publishAt || story.publishDate },
        twitter: { card: "summary_large_image", title, description: story.logline },
    };
}

export default function FreeReadPage({ params }: { params: { slug: string } }) {
    const story = getMicrobook(params.slug);
    if (!story) notFound();
    const usedBy = landingsUsing(story.id);

    return (
        <PageShell currentPath={story.route}>
            <JsonLd data={storyJsonLd(story)} />
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Free reads", href: "/free-reads/" }, { label: story.title }]} />
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold-400/80">{story.id}</p>
            <h1 className="mt-3 font-serif text-4xl text-white sm:text-6xl">{story.title}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">{story.logline}</p>
            <p className="mt-3 text-sm text-white/50">{story.when}</p>
            <MicroBookView book={story} />
            <BookCta />
            {usedBy.length ? (
                <section className="mt-12">
                    <h2 className="font-serif text-3xl text-white">Also embedded on</h2>
                    <ul className="mt-4 space-y-2">
                        {usedBy.map((page) => (
                            <li key={page.route}>
                                <Link href={page.route} className="text-gold-300 underline decoration-gold-400/40 underline-offset-4">{page.h1}</Link>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}
        </PageShell>
    );
}
