import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingView } from "@/components/pseo/LandingView";
import { AUTHOR_NAME } from "@/lib/books";
import { getCityLanding, publishedLandings } from "@/lib/content/load";

export const dynamicParams = false;

export function generateStaticParams() {
    return publishedLandings()
        .filter((page) => page.pageKind === "city" && page.citySlug)
        .map((page) => ({ state: page.stateSlug, city: page.citySlug as string }));
}

export function generateMetadata({ params }: { params: { state: string; city: string } }): Metadata {
    const page = getCityLanding(params.state, params.city);
    if (!page) return { title: "Not found", robots: { index: false, follow: false } };
    return {
        title: page.title,
        description: page.metaDescription,
        alternates: { canonical: page.route },
        authors: [{ name: AUTHOR_NAME }],
        openGraph: {
            title: page.title,
            description: page.metaDescription,
            type: "article",
            url: page.route,
            siteName: AUTHOR_NAME,
            publishedTime: page.publishAt || page.publishDate,
            images: page.ogImage ? [{ url: page.ogImage }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: page.title,
            description: page.metaDescription,
            images: page.ogImage ? [page.ogImage] : undefined,
        },
        robots: { index: true, follow: true },
    };
}

export default function CityLandingPage({ params }: { params: { state: string; city: string } }) {
    const page = getCityLanding(params.state, params.city);
    if (!page) notFound();
    return <LandingView page={page} />;
}
