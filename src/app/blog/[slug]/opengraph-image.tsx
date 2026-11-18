import { ImageResponse } from "next/og";
import { getPost, publishedPosts } from "@/lib/content/load";
import { ogCard } from "@/lib/og/card";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AJ Ghost journal";

export function generateStaticParams() {
    return publishedPosts().map((post) => ({ slug: post.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
    const post = getPost(params.slug);
    return new ImageResponse(
        ogCard(post?.category ?? "Journal", post?.title ?? "AJ Ghost", post?.hook ?? "Psychological thrillers"),
        { ...size },
    );
}
