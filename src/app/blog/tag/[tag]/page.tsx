import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/pseo/Breadcrumbs";
import { PageShell } from "@/components/pseo/PageShell";
import { PostCard } from "@/components/pseo/PostCard";
import { AUTHOR_NAME } from "@/lib/books";
import { publishedPosts } from "@/lib/content/load";

export const dynamicParams = false;

export function generateStaticParams() {
    const tags = new Set(publishedPosts().flatMap((post) => post.tagSlugs.map((tag) => tag.slug)));
    return [...tags].map((tag) => ({ tag }));
}

export function generateMetadata({ params }: { params: { tag: string } }): Metadata {
    const posts = publishedPosts().filter((post) => post.tagSlugs.some((tag) => tag.slug === params.tag));
    const name = posts[0]?.tagSlugs.find((tag) => tag.slug === params.tag)?.name ?? params.tag;
    const title = `${name} | AJ Ghost journal`;
    const description = posts.length
        ? `AJ Ghost on ${name}: ${posts.map((post) => post.title).join("; ")}`.slice(0, 170)
        : `AJ Ghost on ${name}.`;
    return {
        title,
        description,
        alternates: { canonical: `/blog/tag/${params.tag}/`, types: { "application/rss+xml": "/blog/rss.xml" } },
        openGraph: { title, description, url: `/blog/tag/${params.tag}/`, siteName: AUTHOR_NAME, type: "website" },
        twitter: { card: "summary_large_image", title, description },
    };
}

export default function TagPage({ params }: { params: { tag: string } }) {
    const posts = publishedPosts().filter((post) => post.tagSlugs.some((tag) => tag.slug === params.tag));
    if (!posts.length) notFound();
    const name = posts[0].tagSlugs.find((tag) => tag.slug === params.tag)?.name ?? params.tag;
    return (
        <PageShell currentPath={`/blog/tag/${params.tag}/`} width="narrow">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog/" }, { label: name }]} />
            <h1 className="font-serif text-4xl text-white sm:text-5xl">{name}</h1>
            <div className="mt-8 space-y-5">
                {posts.map((post) => <PostCard key={post.slug} post={post} />)}
            </div>
        </PageShell>
    );
}
