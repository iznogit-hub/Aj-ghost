import { ImageResponse } from "next/og";
import { getCityLanding, publishedLandings } from "@/lib/content/load";
import { ogCard } from "@/lib/og/card";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AJ Ghost free thriller page";

export function generateStaticParams() {
    return publishedLandings()
        .filter((page) => page.pageKind === "city" && page.citySlug)
        .map((page) => ({ state: page.stateSlug, city: page.citySlug as string }));
}

export default function Image({ params }: { params: { state: string; city: string } }) {
    const page = getCityLanding(params.state, params.city);
    const kicker = page?.cityName ? `${page.cityName} · ${page.stateName}` : "AJ Ghost";
    return new ImageResponse(ogCard(kicker, page?.h1 ?? "Free thriller", "Free in-page read"), { ...size });
}
