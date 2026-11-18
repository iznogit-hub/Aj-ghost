import Link from "next/link";
import { readingMinutes } from "@/lib/content/text";
import { storyParts } from "@/lib/content/story-parts";
import type { MicroBook as MicroBookType } from "@/lib/content/types";
import { MarkdownBody } from "@/components/pseo/MarkdownBody";

export function MicroBookView({
    book,
    embeddedOn,
}: {
    book: MicroBookType;
    /** When set, this embed is not the story's canonical URL. */
    embeddedOn?: string;
}) {
    const parts = storyParts(book.body);
    const minutes = readingMinutes(book.wordCount);
    const home = embeddedOn && embeddedOn !== book.route;
    return (
        <section className="mt-12" aria-labelledby="micro-book-title">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold-400/80">Free in-page read</p>
            <h2 id="micro-book-title" className="mt-3 font-serif text-4xl leading-tight text-white sm:text-5xl">{book.title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">{book.label || book.logline}</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                {book.wordCount.toLocaleString("en-US")} words · {minutes} min
                {book.pov ? ` · ${book.pov}` : ""}
            </p>
            {home ? (
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                    This page embeds the story. Its canonical home is{" "}
                    <Link href={book.route} className="text-gold-300 underline decoration-gold-400/40 underline-offset-4">{book.title}</Link>.
                </p>
            ) : (
                <p className="mt-4 text-sm text-white/60">This is the canonical home of {book.title}.</p>
            )}
            <div className="mt-8 lg:grid lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-12">
                <nav className="mb-8 hidden lg:block" aria-label="Story sections">
                    <ol className="sticky top-28 space-y-3 text-sm">
                        {parts.map((part, index) => (
                            <li key={part.id}>
                                <a href={`#${part.id}`} className="flex gap-3 text-white/60 hover:text-gold-200">
                                    <span className="font-mono text-[11px] text-gold-400/80">{String(index + 1).padStart(2, "0")}</span>
                                    <span>{part.title}</span>
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>
                <div>
                    <nav className="sticky top-[4.25rem] z-30 -mx-4 mb-8 overflow-x-auto border-y border-gold-400/15 bg-navy-950/95 px-4 py-3 backdrop-blur lg:hidden" aria-label="Story sections">
                        <ol className="flex w-max gap-2">
                            {parts.map((part, index) => (
                                <li key={part.id}>
                                    <a href={`#${part.id}`} className="inline-flex whitespace-nowrap rounded-full border border-gold-400/25 px-3 py-1.5 text-xs text-gold-100">
                                        {index + 1}. {part.title}
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </nav>
                    {parts.map((part, index) => (
                        <article key={part.id} id={part.id} className="chapter-anchor mb-12 scroll-mt-32">
                            <h3 className="font-serif text-2xl text-gold-200 sm:text-3xl">{part.title}</h3>
                            <div className="reading-prose mt-5 space-y-5 font-reading text-[1.075rem] leading-8 text-white/85">
                                <MarkdownBody markdown={part.body} dropCap={index === 0} />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
