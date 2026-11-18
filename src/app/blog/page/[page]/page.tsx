import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/pseo/Breadcrumbs";
import { PageShell } from "@/components/pseo/PageShell";
import { PostCard } from "@/components/pseo/PostCard";
import { AUTHOR_NAME } from "@/lib/books";
import { publishedPosts } from "@/lib/content/load";
import { BLOG_PAGE_SIZE } from "@/lib/content/paths";

export const dynamicParams = false;

export function generateStaticParams() {
    const pages = Math.ceil(publishedPosts().length / BLOG_PAGE_SIZE);
    return Array.from({ length: Math.max(0, pages - 1) }, (_, index) => ({ page: String(index + 2) }));
}

export function generateMetadata({ params }: { params: { page: string } }): Metadata {
    const page = Number(params.page);
    const title = `Journal page ${page} | AJ Ghost`;
    const description = `Older letters from AJ Ghost, page ${page}. Psychological thrillers and The Ryan Kane Series.`;
    return {
        title,
        description,
        alternates: { canonical: `/blog/page/${page}/`, types: { "application/rss+xml": "/blog/rss.xml" } },
        openGraph: { title, description, url: `/blog/page/${page}/`, siteName: AUTHOR_NAME, type: "website" },
        twitter: { card: "summary_large_image", title, description },
    };
}

export default function BlogPaged({ params }: { params: { page: string } }) {
    const page = Number(params.page);
    const posts = publishedPosts();
    const pages = Math.ceil(posts.length / BLOG_PAGE_SIZE);
    if (!Number.isInteger(page) || page < 2 || page > pages) notFound();
    const slice = posts.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE);

    return (
        <PageShell currentPath={`/blog/page/${page}/`} width="narrow">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog/" }, { label: `Page ${page}` }]} />
            <h1 className="font-serif text-4xl text-white">Journal, page {page}</h1>
            <div className="mt-8 space-y-5">
                {slice.map((post) => <PostCard key={post.slug} post={post} />)}
            </div>
            <div className="mt-8 flex justify-between text-sm">
                {page > 2 ? <Link href={`/blog/page/${page - 1}/`} className="text-gold-300">Newer</Link> : <Link href="/blog/" className="text-gold-300">Newer</Link>}
                {page < pages ? <Link href={`/blog/page/${page + 1}/`} className="text-gold-300">Older</Link> : <span />}
            </div>
        </PageShell>
    );
}
