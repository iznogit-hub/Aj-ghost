import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/pseo/Breadcrumbs";
import { PageShell } from "@/components/pseo/PageShell";
import { AUTHOR_NAME, SERIES_NAME } from "@/lib/books";
import { publishedLandings } from "@/lib/content/load";
import { stateBySlug } from "@/lib/content/states";

const title = "Free psychological thrillers by city | AJ Ghost";
const description = "City pages for The Ryan Kane Series. Each one has its own introduction, an embedded free short story, and HUNTED free on BookFunnel.";

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/free-thriller/" },
    openGraph: { title, description, url: "/free-thriller/", siteName: AUTHOR_NAME, type: "website" },
    twitter: { card: "summary_large_image", title, description },
};

export default function FreeThrillerIndex() {
    const pages = publishedLandings().filter((page) => page.pageKind === "city");
    const states = [...new Set(pages.map((page) => page.stateSlug))];

    return (
        <PageShell currentPath="/free-thriller/" width="narrow">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Free thriller" }]} />
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold-400/80">{SERIES_NAME}</p>
            <h1 className="mt-3 font-serif text-4xl text-white sm:text-6xl">Read a thriller where you are</h1>
            <p className="mt-5 text-base leading-8 text-white/70">
                These pages pair a reader&apos;s city with a free short story from the Ryan Kane world. The story also has its own home under free reads. Only pages whose publish time has arrived are listed.
            </p>
            <ul className="mt-10 space-y-8">
                {states.map((slug) => {
                    const state = stateBySlug(slug);
                    return (
                        <li key={slug}>
                            <h2 className="font-serif text-3xl text-white">
                                <Link href={`/free-thriller/${slug}/`} className="hover:text-gold-200">{state?.name ?? slug}</Link>
                            </h2>
                            <ul className="mt-4 space-y-3">
                                {pages.filter((page) => page.stateSlug === slug).map((page) => (
                                    <li key={page.route}>
                                        <Link href={page.route} className="block rounded-2xl border border-white/10 p-4 hover:border-gold-400/40">
                                            <span className="font-mono text-[11px] uppercase tracking-wider text-gold-400/80">{page.cityName} · {page.localAngle.label}</span>
                                            <span className="mt-1 block font-serif text-2xl text-white">{page.h1}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </PageShell>
    );
}
