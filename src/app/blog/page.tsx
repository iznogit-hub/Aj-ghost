import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/pseo/Breadcrumbs";
import { PageShell } from "@/components/pseo/PageShell";
import { PostCard } from "@/components/pseo/PostCard";
import { AUTHOR_NAME } from "@/lib/books";
import { publishedPosts } from "@/lib/content/load";
import { BLOG_PAGE_SIZE } from "@/lib/content/paths";

const title = "Journal | AJ Ghost psychological thrillers";
const description = "Essays and reading notes from AJ Ghost on The Ryan Kane Series, night drives, and the weekly letters behind the books.";

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: "/blog/",
        types: { "application/rss+xml": "/blog/rss.xml" },
    },
    openGraph: { title, description, url: "/blog/", siteName: AUTHOR_NAME, type: "website" },
    twitter: { card: "summary_large_image", title, description },
};

export default function BlogIndexPage() {
    const posts = publishedPosts();
    const pagePosts = posts.slice(0, BLOG_PAGE_SIZE);
    const pages = Math.ceil(posts.length / BLOG_PAGE_SIZE);
    const categories = [...new Map(posts.map((post) => [post.categorySlug, post.category])).entries()];

    return (
        <PageShell currentPath="/blog/" width="narrow">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold-400/80">AJ Ghost</p>
                    <h1 className="mt-3 font-serif text-4xl text-white sm:text-6xl">Journal</h1>
                </div>
                <Link href="/blog/rss.xml" className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-300 hover:text-gold-100">RSS</Link>
            </div>
            <p className="mt-5 text-base leading-8 text-white/70">{description}</p>
            {categories.length ? (
                <ul className="mt-6 flex flex-wrap gap-2">
                    {categories.map(([slug, name]) => (
                        <li key={slug}>
                            <Link href={`/blog/category/${slug}/`} className="rounded-full border border-gold-400/25 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-gold-200 hover:bg-gold-400/10">
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : null}
            <div className="mt-10 space-y-5">
                {pagePosts.length === 0 ? <p className="text-white/60">The next letter is scheduled. Nothing is live for this date yet.</p> : null}
                {pagePosts.map((post) => <PostCard key={post.slug} post={post} />)}
            </div>
            {pages > 1 ? (
                <p className="mt-8">
                    <Link href="/blog/page/2/" className="text-gold-300 underline underline-offset-4">Older letters</Link>
                </p>
            ) : null}
        </PageShell>
    );
}
