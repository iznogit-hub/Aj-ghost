import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { AUTHOR_NAME } from "@/lib/books";
import { citySlug, landingPath, stateByCode } from "@/lib/content/states";
import { asDateString, slugify, wordCount } from "@/lib/content/text";
import type { BlogPost, Cta, CityCoord, LandingPage, LinkItem, MicroBook, StateDoc } from "@/lib/content/types";

export function normalizePath(value: string): string {
    if (!value.startsWith("/")) return value;
    const [pathname, query] = value.split("?");
    if (pathname === "/") return "/";
    if (/\.[a-z0-9]+$/i.test(pathname)) return value;
    const withSlash = pathname.endsWith("/") ? pathname : `${pathname}/`;
    return query ? `${withSlash}?${query}` : withSlash;
}

export function readMatter(filePath: string): { data: Record<string, unknown>; body: string } {
    const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
    const parsed = matter(raw);
    return { data: parsed.data as Record<string, unknown>, body: parsed.content.trim() };
}

export function parseLandingFile(filePath: string, problems: string[]): LandingPage | null {
    const file = rel(filePath);
    let data: Record<string, unknown>;
    try {
        data = JSON.parse(fs.readFileSync(filePath, "utf8")) as Record<string, unknown>;
    } catch (error) {
        problems.push(`${file}: invalid JSON (${message(error)}).`);
        return null;
    }

    const id = str(data, "id", file, problems);
    const type = str(data, "type", file, problems);
    if (type && type !== "landing_page") problems.push(`${file}: type must be "landing_page".`);
    const slug = str(data, "slug", file, problems);
    const stateCode = str(data, "state", file, problems).toUpperCase();
    const cityRaw = data.city;
    const cityName = cityRaw == null || cityRaw === "" ? null : typeof cityRaw === "string" ? cityRaw.trim() : "";
    if (cityName === "") problems.push(`${file}: city must be a string or null.`);
    const pageKind = str(data, "page_kind", file, problems);
    if (pageKind && pageKind !== "city" && pageKind !== "state_hub") {
        problems.push(`${file}: page_kind must be "city" or "state_hub".`);
    }
    const searchIntent = str(data, "search_intent", file, problems);
    const targetKeyword = str(data, "target_keyword", file, problems);
    const title = str(data, "title", file, problems);
    const metaDescription = str(data, "meta_description", file, problems);
    const h1 = str(data, "h1", file, problems);
    const intro = str(data, "intro", file, problems);
    const local = (data.local_angle ?? {}) as Record<string, unknown>;
    const localAngle = {
        label: typeof local.label === "string" ? local.label.trim() : "",
        description: typeof local.description === "string" ? local.description.trim() : "",
    };
    if (!localAngle.label || !localAngle.description) {
        problems.push(`${file}: local_angle.label and local_angle.description are required.`);
    }
    const hook = (data.hunted_hook ?? {}) as Record<string, unknown>;
    const huntedHook = {
        manuscriptLine: typeof hook.manuscript_line === "number" ? hook.manuscript_line : undefined,
        text: typeof hook.text === "string" ? hook.text.trim() : "",
        source: typeof hook.source === "string" ? hook.source.trim() : "",
    };
    if (!huntedHook.text) problems.push(`${file}: hunted_hook.text is required.`);
    const microbookId = str(data, "microbook_id", file, problems);
    const cta = parseCta(data.cta, file, problems);
    const secondaryLinks = parseLinks(data.secondary_links, "secondary_links", file, problems);
    const picks = parsePicks(data.picks, file, problems);
    const internalLinks = parsePathList(data.internal_links, file, problems);
    const publishDate = asDateString(data.publish_date ?? data.publishDate);
    if (!publishDate) problems.push(`${file}: publish_date must be YYYY-MM-DD.`);
    const publishAt = optionalString(data.publish_at ?? data.publishAt);
    const status = optionalString(data.status) || "scheduled";
    const example = data.example === true;
    const state = stateByCode(stateCode);
    const urlPath = normalizePath(typeof data.url_path === "string" && data.url_path.trim()
        ? data.url_path.trim()
        : landingPath(stateCode, pageKind === "state_hub" ? null : cityName));

    if (!id || !slug) return null;

    return {
        id,
        type: "landing_page",
        slug,
        urlPath,
        stateCode,
        stateSlug: state?.slug ?? "",
        stateName: state?.name ?? "",
        cityName,
        citySlug: cityName ? citySlug(cityName) : null,
        pageKind: pageKind === "state_hub" ? "state_hub" : "city",
        searchIntent,
        targetKeyword,
        title,
        metaDescription,
        h1,
        intro,
        localAngle,
        huntedHook,
        microbookId,
        cta,
        secondaryLinks,
        picks,
        ogImage: optionalString(data.og_image) || undefined,
        internalLinks,
        publishDate,
        publishAt,
        status,
        example,
        file,
        route: urlPath,
    };
}

export function parseMicrobookFile(filePath: string, problems: string[]): MicroBook | null {
    const file = rel(filePath);
    let data: Record<string, unknown>;
    let body: string;
    try {
        const parsed = readMatter(filePath);
        data = parsed.data;
        body = parsed.body;
    } catch (error) {
        problems.push(`${file}: could not parse front matter (${message(error)}).`);
        return null;
    }
    const id = str(data, "id", file, problems);
    const title = str(data, "title", file, problems);
    const slug = str(data, "slug", file, problems) || path.basename(filePath, path.extname(filePath));
    const urlPath = normalizePath(optionalString(data.url_path) || `/free-reads/${slug}/`);
    const publishDate = asDateString(data.publish_date ?? data.publishDate);
    if (!publishDate) problems.push(`${file}: publish_date must be YYYY-MM-DD.`);
    if (!id || !title) return null;
    return {
        id,
        title,
        slug,
        urlPath,
        pov: optionalString(data.pov),
        when: optionalString(data.when),
        settingMood: optionalString(data.setting_mood),
        logline: optionalString(data.logline),
        canonNotes: optionalString(data.canon_notes),
        label: optionalString(data.label),
        publishDate,
        publishAt: optionalString(data.publish_at),
        status: optionalString(data.status) || "scheduled",
        example: data.example === true,
        body,
        wordCount: wordCount(body),
        route: urlPath,
        file,
    };
}

export function parseBlogFile(filePath: string, problems: string[]): BlogPost | null {
    const file = rel(filePath);
    let data: Record<string, unknown>;
    let body: string;
    try {
        const parsed = readMatter(filePath);
        data = parsed.data;
        body = parsed.body;
    } catch (error) {
        problems.push(`${file}: could not parse front matter (${message(error)}).`);
        return null;
    }
    const slug = str(data, "slug", file, problems) || path.basename(filePath, path.extname(filePath));
    const title = str(data, "title", file, problems);
    const metaDescription = optionalString(data.meta_description) || optionalString(data.description);
    if (!metaDescription) problems.push(`${file}: \`meta_description\` must be a non-empty string.`);
    const publishDate = asDateString(data.publish_date ?? data.publishDate);
    if (!publishDate) problems.push(`${file}: publish_date must be YYYY-MM-DD.`);
    const category = str(data, "category", file, problems);
    const hook = str(data, "hook", file, problems);
    const tags = stringList(data.tags, "tags", file, problems);
    const socialRaw = (data.social ?? {}) as Record<string, unknown>;
    if (!data.social || typeof data.social !== "object") {
        problems.push(`${file}: social object is required (xThread, carousel, shortFormHook).`);
    }
    const urlPath = normalizePath(optionalString(data.url_path) || `/blog/${slug}/`);
    const sourcePromo = optionalString(data.source_promo ?? data.sourceCampaignId);
    if (!title || !slug) return null;
    return {
        id: optionalString(data.id) || slug,
        type: "blog_post",
        slug,
        urlPath,
        title,
        metaDescription,
        targetKeyword: optionalString(data.target_keyword),
        searchIntent: optionalString(data.search_intent),
        sourcePromo: sourcePromo || undefined,
        outline: stringList(data.outline_h2, "outline_h2", file, problems, true),
        internalLinks: parseLinks(data.internal_links, "internal_links", file, problems, true),
        cta: parseCta(data.cta, file, problems),
        publishDate,
        publishAt: optionalString(data.publish_at),
        status: optionalString(data.status) || "scheduled",
        example: data.example === true,
        category,
        categorySlug: slugify(category),
        tags,
        tagSlugs: tags.map((name) => ({ name, slug: slugify(name) })),
        hook,
        author: optionalString(data.author) || AUTHOR_NAME,
        social: {
            xThread: stringList(socialRaw.xThread, "social.xThread", file, problems),
            carousel: stringList(socialRaw.carousel, "social.carousel", file, problems),
            shortFormHook: optionalString(socialRaw.shortFormHook),
        },
        ogImage: optionalString(data.og_image) || undefined,
        body,
        wordCount: wordCount(body),
        route: urlPath,
        file,
    };
}

export function parseStates(filePath: string, problems: string[]): StateDoc[] {
    const file = rel(filePath);
    const raw = readJson(filePath, file, problems);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return [];
    return Object.entries(raw as Record<string, unknown>).map(([slug, value]) => {
        const data = (value ?? {}) as Record<string, unknown>;
        return {
            slug,
            name: str(data, "name", file, problems),
            code: str(data, "code", file, problems),
            seoTitle: str(data, "seoTitle", file, problems),
            seoDescription: str(data, "seoDescription", file, problems),
            intro: str(data, "intro", file, problems),
        };
    });
}

export function parseCityCoords(filePath: string, problems: string[]): CityCoord[] {
    const file = rel(filePath);
    const raw = readJson(filePath, file, problems);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return [];
    const cities: CityCoord[] = [];
    for (const [stateSlug, group] of Object.entries(raw as Record<string, unknown>)) {
        if (!group || typeof group !== "object" || Array.isArray(group)) continue;
        for (const [slug, value] of Object.entries(group as Record<string, unknown>)) {
            const data = (value ?? {}) as Record<string, unknown>;
            const lat = typeof data.lat === "number" ? data.lat : Number.NaN;
            const lng = typeof data.lng === "number" ? data.lng : Number.NaN;
            if (Number.isNaN(lat) || Number.isNaN(lng)) {
                problems.push(`${file}: ${stateSlug}/${slug} needs numeric lat and lng.`);
            }
            cities.push({
                stateSlug,
                slug,
                name: typeof data.name === "string" ? data.name.trim() : slug,
                lat,
                lng,
            });
        }
    }
    return cities;
}

function parseCta(value: unknown, file: string, problems: string[], optional = false): Cta {
    if (value == null && optional) return { text: "", url: "" };
    const data = (value ?? {}) as Record<string, unknown>;
    const text = typeof data.text === "string" ? data.text.trim() : "";
    const url = typeof data.url === "string" ? data.url.trim() : "";
    if (!optional && (!text || !url)) problems.push(`${file}: cta.text and cta.url are required.`);
    return {
        text,
        url,
        subtext: optionalString(data.subtext),
        urlTracked: optionalString(data.url_tracked),
    };
}

function parsePicks(value: unknown, file: string, problems: string[]) {
    if (value == null) return [];
    if (!Array.isArray(value)) {
        problems.push(`${file}: picks must be an array.`);
        return [];
    }
    return value.map((item, index) => {
        const data = (item ?? {}) as Record<string, unknown>;
        const title = typeof data.title === "string" ? data.title.trim() : "";
        const url = typeof data.url === "string" ? data.url.trim() : "";
        if (!title || !url) problems.push(`${file}: picks[${index}] needs a title and a url.`);
        return {
            title,
            author: typeof data.author === "string" ? data.author.trim() : "",
            kicker: typeof data.kicker === "string" ? data.kicker.trim() : "",
            tagline: typeof data.tagline === "string" ? data.tagline.trim() : "",
            blurb: typeof data.blurb === "string" ? data.blurb.trim() : "",
            url,
            cover: typeof data.cover === "string" ? data.cover.trim() : "",
        };
    });
}

function parseLinks(value: unknown, field: string, file: string, problems: string[], optional = false): LinkItem[] {
    if (value == null && optional) return [];
    if (!Array.isArray(value)) {
        if (!optional) problems.push(`${file}: ${field} must be an array.`);
        return [];
    }
    return value.map((item) => {
        if (typeof item === "string") return { text: item, url: item };
        const data = (item ?? {}) as Record<string, unknown>;
        return {
            text: typeof data.text === "string" ? data.text.trim() : "",
            url: typeof data.url === "string" ? data.url.trim() : "",
            kind: optionalString(data.kind),
        };
    });
}

function parsePathList(value: unknown, file: string, problems: string[]): string[] {
    if (value == null) return [];
    if (!Array.isArray(value)) {
        problems.push(`${file}: internal_links must be an array of paths.`);
        return [];
    }
    return value
        .map((item) => {
            if (typeof item === "string") return normalizePath(item.trim());
            const data = (item ?? {}) as Record<string, unknown>;
            return typeof data.url === "string" ? data.url.trim() : "";
        })
        .filter(Boolean);
}

function stringList(value: unknown, field: string, file: string, problems: string[], optional = false): string[] {
    if (value == null && optional) return [];
    if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
        problems.push(`${file}: \`${field}\` must be an array of strings.`);
        return [];
    }
    return value.map((item) => item.trim()).filter(Boolean);
}

function str(data: Record<string, unknown>, key: string, file: string, problems: string[]): string {
    const value = data[key];
    if (typeof value !== "string" || !value.trim()) {
        problems.push(`${file}: \`${key}\` must be a non-empty string.`);
        return "";
    }
    return value.trim();
}

function optionalString(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

function readJson(filePath: string, file: string, problems: string[]): unknown {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (error) {
        problems.push(`${file}: invalid JSON (${message(error)}).`);
        return null;
    }
}

function rel(filePath: string): string {
    const marker = `${path.sep}content${path.sep}`;
    const index = filePath.lastIndexOf(marker);
    if (index === -1) return filePath;
    return filePath.slice(index + 1).split(path.sep).join("/");
}

function message(error: unknown): string {
    return error instanceof Error ? error.message : "unknown error";
}
