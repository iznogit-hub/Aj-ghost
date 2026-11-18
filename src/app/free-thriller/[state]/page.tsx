import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/pseo/Breadcrumbs";
import { LandingView } from "@/components/pseo/LandingView";
import { PageShell } from "@/components/pseo/PageShell";
import { AUTHOR_NAME } from "@/lib/books";
import { getStateHub, landingsForState, publishedLandings, stateDoc } from "@/lib/content/load";
import { stateBySlug } from "@/lib/content/states";

export const dynamicParams = false;

export function generateStaticParams() {
    const slugs = new Set(publishedLandings().map((page) => page.stateSlug));
    return [...slugs].map((state) => ({ state }));
}

export function generateMetadata({ params }: { params: { state: string } }): Metadata {
    const hub = getStateHub(params.state);
    if (hub) {
        return {
            title: hub.title,
            description: hub.metaDescription,
            alternates: { canonical: hub.route },
            openGraph: { title: hub.title, description: hub.metaDescription, url: hub.route, siteName: AUTHOR_NAME, type: "article" },
            twitter: { card: "summary_large_image", title: hub.title, description: hub.metaDescription },
        };
    }
    const doc = stateDoc(params.state);
    const state = stateBySlug(params.state);
    if (!doc || !state || landingsForState(params.state).length === 0) {
        return { title: "Not found", robots: { index: false, follow: false } };
    }
    return {
        title: doc.seoTitle,
        description: doc.seoDescription,
        alternates: { canonical: `/free-thriller/${state.slug}/` },
        openGraph: { title: doc.seoTitle, description: doc.seoDescription, url: `/free-thriller/${state.slug}/`, siteName: AUTHOR_NAME, type: "website" },
        twitter: { card: "summary_large_image", title: doc.seoTitle, description: doc.seoDescription },
    };
}

export default function StatePage({ params }: { params: { state: string } }) {
    const hub = getStateHub(params.state);
    if (hub) return <LandingView page={hub} />;
    const doc = stateDoc(params.state);
    const state = stateBySlug(params.state);
    const cities = landingsForState(params.state);
    if (!doc || !state || cities.length === 0) notFound();

    return (
        <PageShell currentPath={`/free-thriller/${state.slug}/`} width="narrow">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Free thriller", href: "/free-thriller/" }, { label: state.name }]} />
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold-400/80">{state.code}</p>
            <h1 className="mt-3 font-serif text-4xl text-white sm:text-6xl">{state.name}</h1>
            <div className="mt-6 space-y-5 text-base leading-8 text-white/75">
                {doc.intro.split(/\n\n+/).map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
            </div>
            <ul className="mt-10 space-y-4">
                {cities.map((page) => (
                    <li key={page.route}>
                        <Link href={page.route} className="block rounded-3xl border border-white/10 p-5 hover:border-gold-400/40">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-gold-400/80">{page.cityName}</span>
                            <span className="mt-2 block font-serif text-2xl text-white">{page.h1}</span>
                            <span className="mt-2 block text-sm leading-relaxed text-white/60">{page.metaDescription}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </PageShell>
    );
}
