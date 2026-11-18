import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/pseo/Breadcrumbs";
import { PageShell } from "@/components/pseo/PageShell";
import { PostCard } from "@/components/pseo/PostCard";
import { AUTHOR_NAME } from "@/lib/books";
import { publishedPosts } from "@/lib/content/load";

export const dynamicParams = false;

export function generateStaticParams() {
    const posts = publishedPosts();
    return [...new Set(posts.map((post) => post.categorySlug))].map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
    const posts = publishedPosts().filter((post) => post.categorySlug === params.category);
    const name = posts[0]?.category ?? "Category";
    const title = `${name} | AJ Ghost journal`;
    const description = posts.length
        ? `${name} from AJ Ghost: ${posts.map((post) => post.title).join("; ")}`.slice(0, 170)
        : `${name} from AJ Ghost.`;
    return {
        title,
        description,
        alternates: { canonical: `/blog/category/${params.category}/`, types: { "application/rss+xml": "/blog/rss.xml" } },
        openGraph: { title, description, url: `/blog/category/${params.category}/`, siteName: AUTHOR_NAME, type: "website" },
        twitter: { card: "summary_large_image", title, description },
    };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
    const posts = publishedPosts().filter((post) => post.categorySlug === params.category);
    if (!posts.length) notFound();
    return (
        <PageShell currentPath={`/blog/category/${params.category}/`} width="narrow">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog/" }, { label: posts[0].category }]} />
            <h1 className="font-serif text-4xl text-white sm:text-5xl">{posts[0].category}</h1>
            <p className="mt-4 text-white/65">Letters filed under {posts[0].category}. Only published dates are listed.</p>
            <div className="mt-8 space-y-5">
                {posts.map((post) => <PostCard key={post.slug} post={post} />)}
            </div>
        </PageShell>
    );
}
