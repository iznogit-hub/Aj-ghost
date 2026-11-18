import { siteUrl } from "@/lib/site";
import { isLive } from "@/lib/content/text";
import { stateBySlug } from "@/lib/content/states";
import type { ContentIndex } from "@/lib/content/types";

export type PublicPath = {
    path: string;
    lastModified: string;
    changeFrequency: "weekly" | "monthly" | "yearly";
    priority: number;
};

const CHUNK = 1000;
export const BLOG_PAGE_SIZE = 12;

export function sitemapChunkSize(): number {
    return CHUNK;
}

/** Indexable URLs. Withheld and future-dated items are omitted. */
export function publicPaths(index: ContentIndex, now: Date): PublicPath[] {
    const landings = index.landings.filter((page) => isLive(page, now));
    const posts = index.posts.filter((post) => isLive(post, now));
    const books = index.microbooks.filter((book) => isLive(book, now));
    const paths: PublicPath[] = [
        { path: "/", lastModified: newest([...landings, ...posts, ...books].map((item) => item.publishDate), now), changeFrequency: "weekly", priority: 1 },
        { path: "/contact/", lastModified: utcStamp(now), changeFrequency: "yearly", priority: 0.3 },
    ];

    if (landings.length) {
        paths.push({ path: "/free-thriller/", lastModified: newest(landings.map((page) => page.publishDate), now), changeFrequency: "weekly", priority: 0.7 });
    }
    if (books.length) {
        paths.push({ path: "/free-reads/", lastModified: newest(books.map((book) => book.publishDate), now), changeFrequency: "weekly", priority: 0.7 });
    }
    if (posts.length) {
        paths.push({ path: "/blog/", lastModified: newest(posts.map((post) => post.publishDate), now), changeFrequency: "weekly", priority: 0.7 });
        const pages = Math.ceil(posts.length / BLOG_PAGE_SIZE);
        for (let page = 2; page <= pages; page += 1) {
            paths.push({ path: `/blog/page/${page}/`, lastModified: newest(posts.map((post) => post.publishDate), now), changeFrequency: "weekly", priority: 0.3 });
        }
    }

    const stateSlugs = new Set(landings.map((page) => page.stateSlug));
    for (const slug of stateSlugs) {
        const inState = landings.filter((page) => page.stateSlug === slug);
        paths.push({
            path: `/free-thriller/${slug}/`,
            lastModified: newest(inState.map((page) => page.publishDate), now),
            changeFrequency: "weekly",
            priority: 0.6,
        });
    }

    for (const page of landings) {
        if (page.pageKind === "state_hub") continue;
        paths.push({ path: page.route, lastModified: page.publishDate, changeFrequency: "monthly", priority: 0.8 });
    }
    for (const book of books) {
        paths.push({ path: book.route, lastModified: book.publishDate, changeFrequency: "monthly", priority: 0.7 });
    }
    for (const post of posts) {
        paths.push({ path: post.route, lastModified: post.publishDate, changeFrequency: "monthly", priority: 0.6 });
    }

    for (const category of new Set(posts.map((post) => post.categorySlug).filter(Boolean))) {
        const inCategory = posts.filter((post) => post.categorySlug === category);
        paths.push({
            path: `/blog/category/${category}/`,
            lastModified: newest(inCategory.map((post) => post.publishDate), now),
            changeFrequency: "weekly",
            priority: 0.4,
        });
    }
    for (const tag of new Set(posts.flatMap((post) => post.tagSlugs.map((item) => item.slug)).filter(Boolean))) {
        const tagged = posts.filter((post) => post.tagSlugs.some((item) => item.slug === tag));
        paths.push({
            path: `/blog/tag/${tag}/`,
            lastModified: newest(tagged.map((post) => post.publishDate), now),
            changeFrequency: "weekly",
            priority: 0.3,
        });
    }

    const unique = new Map<string, PublicPath>();
    for (const item of paths) unique.set(item.path, item);
    return [...unique.values()].sort((a, b) => a.path.localeCompare(b.path));
}

export function absolutePublicPaths(index: ContentIndex, now: Date) {
    const base = siteUrl();
    return publicPaths(index, now).map((item) => ({ ...item, url: `${base}${item.path === "/" ? "/" : item.path}` }));
}

export function livePathSet(index: ContentIndex, now: Date): Set<string> {
    return new Set(publicPaths(index, now).map((item) => item.path));
}

export function stateName(slug: string): string {
    return stateBySlug(slug)?.name ?? slug;
}

function newest(dates: string[], now: Date): string {
    const valid = dates.filter(Boolean).sort();
    return valid.at(-1) ?? utcStamp(now);
}

function utcStamp(now: Date): string {
    return now.toISOString().slice(0, 10);
}
