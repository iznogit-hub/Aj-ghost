import Link from "next/link";
import type { BlogPost } from "@/lib/content/types";
import { readingMinutes } from "@/lib/content/text";

export function PostCard({ post }: { post: BlogPost }) {
    return (
        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:border-gold-400/35 sm:p-6">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-gold-400/80">
                        <Link href={`/blog/category/${post.categorySlug}/`} className="hover:text-gold-200">{post.category}</Link>
                <span aria-hidden="true">·</span>
                <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
                <span aria-hidden="true">·</span>
                <span>{readingMinutes(post.wordCount)} min</span>
                {post.example ? <span className="rounded-full border border-gold-400/30 px-2 py-0.5 text-gold-200">Example</span> : null}
            </div>
            <h2 className="mt-3 font-serif text-2xl leading-snug text-white sm:text-3xl">
                <Link href={post.route} className="hover:text-gold-200">{post.title}</Link>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">{post.hook}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                {post.tagSlugs.map((tag) => (
                    <Link
                        key={tag.slug}
                        href={`/blog/tag/${tag.slug}/`}
                        className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white/55 hover:border-gold-400/30 hover:text-gold-200"
                    >
                        {tag.name}
                    </Link>
                ))}
            </div>
        </article>
    );
}

export function formatDate(iso: string): string {
    const [year, month, day] = iso.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    });
}
