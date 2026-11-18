import { ImageResponse } from "next/og";
import { getMicrobook, publishedMicrobooks } from "@/lib/content/load";
import { ogCard } from "@/lib/og/card";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AJ Ghost free read";

export function generateStaticParams() {
    return publishedMicrobooks().map((book) => ({ slug: book.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
    const story = getMicrobook(params.slug);
    return new ImageResponse(ogCard("Free read", story?.title ?? "AJ Ghost", story?.logline ?? "The Ryan Kane Series"), { ...size });
}
