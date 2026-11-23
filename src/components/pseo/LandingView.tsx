import Link from "next/link";
import { BookCta } from "@/components/pseo/BookCta";
import { Breadcrumbs } from "@/components/pseo/Breadcrumbs";
import { ExampleBanner } from "@/components/pseo/ExampleBanner";
import { JsonLd } from "@/components/pseo/JsonLd";
import { MarkdownBody } from "@/components/pseo/MarkdownBody";
import { MicroBookView } from "@/components/pseo/MicroBook";
import { PageShell } from "@/components/pseo/PageShell";
import { isLive, readingMinutes, wordCount } from "@/lib/content/text";
import { getNow } from "@/lib/site";
import { landingsForState, microbookById, publishedLandings, publishedMicrobooks, publishedPosts } from "@/lib/content/load";
import { livePathSet } from "@/lib/content/paths";
import { landingJsonLd } from "@/lib/content/schema";
import type { BookPick, LandingPage } from "@/lib/content/types";

function pickHeading(count: number): string {
    if (count === 1) return "Featured psychological thriller";
    if (count === 2) return "Two picks from fellow thriller authors";
    return "Thriller picks from fellow authors";
}

function pickCtaLabel(pick: BookPick): string {
    try {
        const host = new URL(pick.url).hostname.replace(/^www\./, "").toLowerCase();
        if (host === "buy.bookfunnel.com") return `Get ${pick.title}`;
        if (host === "dl.bookfunnel.com") return `Get ${pick.title} free on BookFunnel`;
        if (host === "bookhip.com") return `Get ${pick.title}`;
    } catch {
        return `Get ${pick.title} on Amazon`;
    }
    return `Get ${pick.title} on Amazon`;
}

export function LandingView({ page }: { page: LandingPage }) {
    const now = getNow();
    const story = microbookById(page.microbookId);
    const storyLive = story && isLive(story, now) ? story : undefined;
    const siblings = landingsForState(page.stateSlug).filter((item) => item.route !== page.route);
    const livePaths = livePathSet({ landings: publishedLandings(now), posts: publishedPosts(now), microbooks: publishedMicrobooks(now), states: [], cities: [], root: "", problems: [] }, now);
    const extraLinks = page.internalLinks.filter((href) => livePaths.has(href) && href !== page.route);
    const minutes = readingMinutes(wordCount(page.intro) + (storyLive?.wordCount ?? 0));
    const place = page.cityName ?? page.stateName;

    return (
        <PageShell currentPath={page.route}>
            <JsonLd data={landingJsonLd(page, storyLive)} />
            {page.example ? <ExampleBanner kind="landing" /> : null}
            <Breadcrumbs
                items={[
                    { label: "Home", href: "/" },
                    { label: "Free thriller", href: "/free-thriller/" },
                    { label: page.stateName, href: `/free-thriller/${page.stateSlug}/` },
                    ...(page.cityName ? [{ label: page.cityName }] : []),
                ]}
            />
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold-400/80">
                {page.stateName}{page.cityName ? ` · ${page.cityName}` : ""} · {page.localAngle.label}
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-[1.05] text-white sm:text-6xl">{page.h1}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{page.localAngle.description}</p>
            <p className="mt-4 text-sm text-white/45">
                For readers searching: <span className="text-gold-200/90">{page.searchIntent}</span>
                {" · "}
                <span className="text-white/55">{page.targetKeyword}</span>
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                <time dateTime={page.publishDate}>{page.publishDate}</time>
                <span> · {minutes} min with the free read</span>
            </p>

            <div className="reading-prose mt-10 space-y-5 font-reading text-[1.05rem] leading-8 text-white/85">
                <MarkdownBody markdown={page.intro} />
            </div>

            {page.huntedHook.text ? (
                <blockquote className="mt-8 border-l-2 border-gold-400/60 pl-4">
                    <p className="font-serif text-2xl leading-snug text-gold-100">{page.huntedHook.text}</p>
                    <footer className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                        HUNTED{page.huntedHook.source ? ` · ${page.huntedHook.source}` : ""}
                    </footer>
                </blockquote>
            ) : null}

            {page.picks.length ? (
                <section className="mt-12" aria-labelledby="picks-title">
                    <h2 id="picks-title" className="font-serif text-3xl text-white">
                        {pickHeading(page.picks.length)}
                    </h2>
                    <ul className="mt-6 space-y-6">
                        {page.picks.map((pick) => (
                            <li key={pick.url} className="rounded-3xl border border-white/10 p-5 sm:flex sm:gap-5">
                                {pick.cover ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={pick.cover} alt={`Cover of ${pick.title} by ${pick.author}`} className="mx-auto mb-4 aspect-[2/3] w-36 rounded-lg object-cover sm:mx-0 sm:mb-0" />
                                ) : null}
                                <div>
                                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-400/80">{pick.author}{pick.kicker ? ` · ${pick.kicker}` : ""}</p>
                                    <h3 className="mt-2 font-serif text-2xl text-white">{pick.title}</h3>
                                    {pick.tagline ? <p className="mt-2 text-gold-100/90 italic">{pick.tagline}</p> : null}
                                    <p className="mt-3 text-sm leading-relaxed text-white/70">{pick.blurb}</p>
                                    <a href={pick.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-semibold text-gold-300 underline decoration-gold-400/40 underline-offset-4">
                                        {pickCtaLabel(pick)}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}

            {storyLive ? <MicroBookView book={storyLive} embeddedOn={page.route} /> : null}
            <BookCta place={place} huntedUrl={page.cta.urlTracked || page.cta.url} />

            <section className="mt-14" aria-labelledby="more-title">
                <h2 id="more-title" className="font-serif text-3xl text-white">Keep moving</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {siblings.map((item) => (
                        <li key={item.route}>
                            <Link href={item.route} className="block rounded-2xl border border-white/10 p-4 hover:border-gold-400/40">
                                <span className="font-mono text-[11px] uppercase tracking-wider text-gold-400/70">{item.cityName}</span>
                                <span className="mt-1 block font-serif text-xl text-white">{item.h1}</span>
                            </Link>
                        </li>
                    ))}
                    {extraLinks.map((href) => (
                        <li key={href}>
                            <Link href={href} className="block rounded-2xl border border-white/10 p-4 text-gold-200 hover:border-gold-400/40">{href}</Link>
                        </li>
                    ))}
                    <li>
                        <Link href="/free-reads/" className="block rounded-2xl border border-white/10 p-4 hover:border-gold-400/40">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-gold-400/70">Free reads</span>
                            <span className="mt-1 block font-serif text-xl text-white">All five short stories</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog/" className="block rounded-2xl border border-white/10 p-4 hover:border-gold-400/40">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-gold-400/70">Journal</span>
                            <span className="mt-1 block font-serif text-xl text-white">Notes from the weekly letters</span>
                        </Link>
                    </li>
                </ul>
            </section>
        </PageShell>
    );
}
