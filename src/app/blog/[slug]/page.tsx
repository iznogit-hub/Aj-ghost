import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Breadcrumbs } from "@/components/pseo/Breadcrumbs";
import { blogMdxComponents } from "@/components/pseo/blog-mdx";
import { ExampleBanner } from "@/components/pseo/ExampleBanner";
import { JsonLd } from "@/components/pseo/JsonLd";
import { PageShell } from "@/components/pseo/PageShell";
import { PostCard, formatDate } from "@/components/pseo/PostCard";
import { ShareBar } from "@/components/pseo/ShareBar";
import { AUTHOR_NAME } from "@/lib/books";
import { getPost, publishedPosts, relatedPosts } from "@/lib/content/load";
import { postJsonLd } from "@/lib/content/schema";
import { readingMinutes } from "@/lib/content/text";

export const dynamicParams = false;

export function generateStaticParams() {
    return publishedPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const post = getPost(params.slug);
    if (!post) return { title: "Not found", robots: { index: false, follow: false } };
    return {
        title: post.title,
        description: post.metaDescription,
        authors: [{ name: post.author }],
        alternates: {
            canonical: post.route,
            types: { "application/rss+xml": "/blog/rss.xml" },
        },
        openGraph: {
            title: post.title,
            description: post.metaDescription,
            type: "article",
            url: post.route,
            siteName: AUTHOR_NAME,
            publishedTime: post.publishDate,
            authors: [post.author],
            tags: post.tags,
            section: post.category,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.social.shortFormHook || post.metaDescription,
        },
        robots: { index: true, follow: true },
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = getPost(params.slug);
    if (!post) notFound();
    const related = relatedPosts(post);

    return (
        <PageShell currentPath={post.route} width="narrow">
            <JsonLd data={postJsonLd(post)} />
            {post.example ? <ExampleBanner kind="post" /> : null}
            <Breadcrumbs
                items={[
                    { label: "Home", href: "/" },
                    { label: "Blog", href: "/blog" },
                    { label: post.category, href: `/blog/category/${post.categorySlug}/` },
                    { label: post.title },
                ]}
            />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold-400/80">
                <Link href={`/blog/category/${post.categorySlug}/`} className="hover:text-gold-200">{post.category}</Link>
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-white sm:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-white/70">{post.hook}</p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
                <span> · {post.author} · {readingMinutes(post.wordCount)} min</span>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
                {post.tagSlugs.map((tag) => (
                    <Link key={tag.slug} href={`/blog/tag/${tag.slug}/`} className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white/55 hover:text-gold-200">
                        {tag.name}
                    </Link>
                ))}
            </div>
            <ShareBar path={post.route} text={post.social.shortFormHook} />
            <div className="font-reading">
                <MDXRemote source={post.body} components={blogMdxComponents} />
            </div>
            {related.length ? (
                <section className="mt-14" aria-labelledby="related-title">
                    <h2 id="related-title" className="font-serif text-3xl text-white">Related</h2>
                    <div className="mt-5 space-y-4">
                        {related.map((item) => <PostCard key={item.slug} post={item} />)}
                    </div>
                </section>
            ) : null}
        </PageShell>
    );
}
