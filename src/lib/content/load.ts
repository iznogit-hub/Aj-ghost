import { getNow } from "@/lib/site";
import { isLive } from "@/lib/content/text";
import type { BlogPost, ContentIndex, LandingPage, MicroBook } from "@/lib/content/types";
import { readContent, validateContent } from "@/lib/content/validate";

let cached: ContentIndex | null = null;

export function getContent(): ContentIndex {
    if (cached) return cached;
    const index = readContent(process.cwd());
    const errors = validateContent(index);
    if (errors.length) {
        throw new Error(`Content validation failed:\n${errors.map((error) => `- ${error}`).join("\n")}`);
    }
    cached = index;
    return cached;
}

export function publishedLandings(now = getNow(), index = getContent()): LandingPage[] {
    return index.landings
        .filter((page) => isLive(page, now))
        .sort((a, b) => b.publishDate.localeCompare(a.publishDate) || a.route.localeCompare(b.route));
}

export function publishedPosts(now = getNow(), index = getContent()): BlogPost[] {
    return index.posts
        .filter((post) => isLive(post, now))
        .sort((a, b) => b.publishDate.localeCompare(a.publishDate) || a.slug.localeCompare(b.slug));
}

export function publishedMicrobooks(now = getNow(), index = getContent()): MicroBook[] {
    return index.microbooks
        .filter((book) => isLive(book, now))
        .sort((a, b) => a.title.localeCompare(b.title));
}

export function getLanding(stateSlug: string, citySlug: string | null, now = getNow()): LandingPage | undefined {
    return publishedLandings(now).find((page) => page.stateSlug === stateSlug && (citySlug ? page.citySlug === citySlug : page.pageKind === "state_hub"));
}

export function getCityLanding(stateSlug: string, citySlug: string, now = getNow()): LandingPage | undefined {
    return publishedLandings(now).find((page) => page.stateSlug === stateSlug && page.citySlug === citySlug && page.pageKind === "city");
}

export function getStateHub(stateSlug: string, now = getNow()): LandingPage | undefined {
    return publishedLandings(now).find((page) => page.stateSlug === stateSlug && page.pageKind === "state_hub");
}

export function getPost(slug: string, now = getNow()): BlogPost | undefined {
    return publishedPosts(now).find((post) => post.slug === slug);
}

export function getMicrobook(slug: string, now = getNow()): MicroBook | undefined {
    return publishedMicrobooks(now).find((book) => book.slug === slug);
}

export function microbookById(id: string, index = getContent()): MicroBook | undefined {
    return index.microbooks.find((book) => book.id === id);
}

export function landingsForState(stateSlug: string, now = getNow()): LandingPage[] {
    return publishedLandings(now).filter((page) => page.stateSlug === stateSlug && page.pageKind === "city");
}

export function landingsUsing(microbookId: string, now = getNow()): LandingPage[] {
    return publishedLandings(now).filter((page) => page.microbookId === microbookId);
}

export function relatedPosts(post: BlogPost, now = getNow(), limit = 3): BlogPost[] {
    return publishedPosts(now)
        .filter((item) => item.slug !== post.slug)
        .map((item) => {
            const shared = item.tagSlugs.filter((tag) => post.tagSlugs.some((own) => own.slug === tag.slug)).length;
            return { item, score: (item.categorySlug === post.categorySlug ? 2 : 0) + shared };
        })
        .sort((a, b) => b.score - a.score || b.item.publishDate.localeCompare(a.item.publishDate))
        .slice(0, limit)
        .map((entry) => entry.item);
}

export function stateDoc(slug: string, index = getContent()) {
    return index.states.find((state) => state.slug === slug);
}

export { readContent, validateContent };
