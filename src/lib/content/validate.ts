import fs from "node:fs";
import path from "node:path";
import {
    DIGITAL_ASCENT_ARC_URL,
    FORBIDDEN_ASIN,
    HUNTED_BOOKFUNNEL_URL,
    SHE_WAS_NEVER_ALONE_URL,
    THE_DEVOTED_LIE_URL,
    isAllowedAmazonUrl,
    isHuntedUrl,
} from "@/lib/books";
import { parseBlogFile, parseCityCoords, parseLandingFile, parseMicrobookFile, parseStates } from "@/lib/content/parse";
import { landingPath, stateByCode } from "@/lib/content/states";
import {
    includesPhrase,
    isIsoDate,
    isSlug,
    MONTHLY_CAP,
    monthKey,
    shingles,
    wordCount,
} from "@/lib/content/text";
import type { BlogPost, ContentIndex, LandingPage, MicroBook, StateDoc } from "@/lib/content/types";

export function contentDir(root: string): string {
    return path.join(root, "content");
}

export function readContent(root = process.cwd()): ContentIndex {
    const problems: string[] = [];
    const base = contentDir(root);
    const statesPath = path.join(base, "locations", "states.json");
    const citiesPath = path.join(base, "locations", "cities.json");
    const states = fs.existsSync(statesPath) ? parseStates(statesPath, problems) : [];
    const cities = fs.existsSync(citiesPath) ? parseCityCoords(citiesPath, problems) : [];
    const landings = listFiles(path.join(base, "landing"), ".json").map((file) => parseLandingFile(file, problems)).filter(isPresent);
    const posts = listFiles(path.join(base, "blog"), ".mdx").map((file) => parseBlogFile(file, problems)).filter(isPresent);
    const microbooks = listFiles(path.join(base, "microbooks"), ".md").map((file) => parseMicrobookFile(file, problems)).filter(isPresent);
    return { root, landings, posts, microbooks, states, cities, problems };
}

export function validateContent(index: ContentIndex): string[] {
    const errors = [...index.problems];
    errors.push(...validateStates(index.states));
    errors.push(...validateMicrobooks(index.microbooks));
    errors.push(...validateLandings(index.landings, index.microbooks, index.states));
    errors.push(...validatePosts(index.posts));
    errors.push(...monthlyCapErrors(index.landings.map((item) => item.publishDate).filter(Boolean), "landing pages"));
    errors.push(...monthlyCapErrors(index.posts.map((item) => item.publishDate).filter(Boolean), "blog posts"));
    errors.push(...scanRawContent(index.root));
    return [...new Set(errors)];
}

export function monthlyCapErrors(dates: string[], kind: string, cap = MONTHLY_CAP): string[] {
    const counts = new Map<string, number>();
    for (const date of dates) {
        if (!isIsoDate(date)) continue;
        const key = monthKey(date);
        counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    const errors: string[] = [];
    for (const [month, count] of [...counts.entries()].sort()) {
        if (count > cap) {
            errors.push(`Monthly cap exceeded for ${kind} in ${month}: scheduled ${count}, maximum ${cap}.`);
        }
    }
    return errors;
}

function validateStates(states: StateDoc[]): string[] {
    const errors: string[] = [];
    const titles = new Set<string>();
    for (const state of states) {
        if (!isSlug(state.slug)) errors.push(`content/locations/states.json: \`${state.slug}\` is not a slug.`);
        const known = stateByCode(state.code);
        if (!known || known.slug !== state.slug) {
            errors.push(`content/locations/states.json: ${state.slug} must use its USPS code and slug.`);
        }
        checkLength(errors, `state ${state.slug} seoTitle`, state.seoTitle, 20, 90);
        checkLength(errors, `state ${state.slug} seoDescription`, state.seoDescription, 80, 200);
        if (wordCount(state.intro) < 80) {
            errors.push(`content/locations/states.json: ${state.slug} intro must be at least 80 words.`);
        }
        if (state.intro && !includesPhrase(state.intro, state.name)) {
            errors.push(`content/locations/states.json: ${state.slug} intro must include ${state.name}.`);
        }
        remember(errors, titles, `state title ${state.slug}`, state.seoTitle);
    }
    return errors;
}

function validateMicrobooks(books: MicroBook[]): string[] {
    const errors: string[] = [];
    const ids = new Set<string>();
    const slugs = new Set<string>();
    const seen = new Map<string, string>();
    for (const book of books) {
        if (ids.has(book.id)) errors.push(`${book.file}: duplicate microbook id ${book.id}.`);
        ids.add(book.id);
        if (!isSlug(book.slug)) errors.push(`${book.file}: slug must be lowercase.`);
        if (slugs.has(book.slug)) errors.push(`${book.file}: duplicate slug ${book.slug}.`);
        slugs.add(book.slug);
        const expected = `content/microbooks/${book.slug}.md`;
        if (book.file !== expected) errors.push(`${book.file}: filename must be ${expected}.`);
        if (book.route !== `/free-reads/${book.slug}/`) {
            errors.push(`${book.file}: url_path must be /free-reads/${book.slug}/.`);
        }
        if (!isIsoDate(book.publishDate)) errors.push(`${book.file}: publish_date must be a real YYYY-MM-DD date.`);
        if (!book.logline) errors.push(`${book.file}: logline is required.`);
        if (!book.label) errors.push(`${book.file}: label is required.`);
        if (book.wordCount < 400 || book.wordCount > 3500) {
            errors.push(`${book.file}: story must be 400–3500 words (has ${book.wordCount}).`);
        }
        trackShingles(errors, seen, book.body, book.file, "story");
    }
    return errors;
}

function validateLandings(landings: LandingPage[], books: MicroBook[], states: StateDoc[]): string[] {
    const errors: string[] = [];
    const bookIds = new Set(books.map((book) => book.id));
    const stateSlugs = new Set(states.map((state) => state.slug));
    const routes = new Set<string>();
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    const headlines = new Set<string>();
    const introShingles = new Map<string, string>();
    const statesUsed = new Set<string>();

    for (const page of landings) {
        const expectedFile = `content/landing/${page.slug}.json`;
        if (page.file !== expectedFile) errors.push(`${page.file}: filename must be ${expectedFile}.`);
        if (!isSlug(page.slug)) errors.push(`${page.file}: slug must be lowercase.`);
        const state = stateByCode(page.stateCode);
        if (!state) errors.push(`${page.file}: state must be a USPS code such as TX or AZ.`);
        if (page.pageKind === "state_hub" && page.cityName) {
            errors.push(`${page.file}: state_hub pages set city to null.`);
        }
        if (page.pageKind === "city" && !page.cityName) {
            errors.push(`${page.file}: city pages need a city name.`);
        }
        const expectedPath = landingPath(page.stateCode, page.pageKind === "state_hub" ? null : page.cityName);
        if (page.urlPath !== expectedPath) {
            errors.push(`${page.file}: url_path must be ${expectedPath}.`);
        }
        if (routes.has(page.route)) errors.push(`${page.file}: duplicate route ${page.route}.`);
        routes.add(page.route);
        if (!isIsoDate(page.publishDate)) errors.push(`${page.file}: publish_date must be a real YYYY-MM-DD date.`);
        if (page.publishAt && Number.isNaN(Date.parse(page.publishAt))) {
            errors.push(`${page.file}: publish_at must be an ISO 8601 timestamp.`);
        }
        if (!bookIds.has(page.microbookId)) {
            errors.push(`${page.file}: microbook_id ${page.microbookId || "(missing)"} does not match a file in content/microbooks.`);
        }
        checkLength(errors, `${page.file} title`, page.title, 20, 110);
        checkLength(errors, `${page.file} meta_description`, page.metaDescription, 80, 200);
        checkLength(errors, `${page.file} h1`, page.h1, 15, 140);
        checkLength(errors, `${page.file} local_angle.label`, page.localAngle.label, 3, 80);
        const introWords = wordCount(page.intro);
        if (introWords < 150 || introWords > 250) {
            errors.push(`${page.file}: intro must be 150–250 words so the page is not a thin copy of the shared story (has ${introWords}).`);
        }
        if (wordCount(page.localAngle.description) < 8) {
            errors.push(`${page.file}: local_angle.description must be at least 8 words.`);
        }
        if (page.huntedHook.text.length < 8) errors.push(`${page.file}: hunted_hook.text is too short.`);
        const place = page.cityName ?? state?.name ?? "";
        const stateName = state?.name ?? "";
        if (page.pageKind === "city" && place) {
            for (const [field, value] of [
                ["title", page.title],
                ["meta_description", page.metaDescription],
                ["h1", page.h1],
                ["intro", page.intro],
            ] as const) {
                if (value && !includesPhrase(value, place)) {
                    errors.push(`${page.file}: ${field} must include the city name ${place}.`);
                }
            }
        }
        if (stateName && page.intro && !includesPhrase(page.intro, stateName)) {
            errors.push(`${page.file}: intro must include the state name ${stateName}.`);
        }
        if (page.example && page.intro && !includesPhrase(page.intro, "example")) {
            errors.push(`${page.file}: example pages must say "example" in the intro.`);
        }
        if (!isHuntedUrl(page.cta.url)) {
            errors.push(`${page.file}: cta.url must be ${HUNTED_BOOKFUNNEL_URL} (a query string for tracking is fine).`);
        }
        if (page.cta.urlTracked && !isHuntedUrl(page.cta.urlTracked)) {
            errors.push(`${page.file}: cta.url_tracked must stay on the HUNTED BookFunnel link.`);
        }
        for (const link of page.secondaryLinks) {
            if (!isAllowedAmazonUrl(link.url) && stripUrl(link.url) !== DIGITAL_ASCENT_ARC_URL) {
                errors.push(`${page.file}: secondary link ${link.url} is not an allowed book link.`);
            }
        }
        const pickUrls = new Set<string>();
        for (const pick of page.picks) {
            if (!isAllowedAmazonUrl(pick.url)) {
                errors.push(`${page.file}: pick "${pick.title}" must use an allowed Amazon link.`);
            }
            const key = stripUrl(pick.url);
            if (pickUrls.has(key)) errors.push(`${page.file}: partner link ${key} is repeated.`);
            pickUrls.add(key);
        }
        if (state) statesUsed.add(state.slug);
        remember(errors, titles, `${page.file} title`, page.title);
        remember(errors, descriptions, `${page.file} meta_description`, page.metaDescription);
        remember(errors, headlines, `${page.file} h1`, page.h1);
        trackShingles(errors, introShingles, page.intro, page.file, "intro");
    }

    for (const slug of statesUsed) {
        if (!stateSlugs.has(slug)) {
            errors.push(`content/locations/states.json: add ${slug} so the state directory is not a thin list.`);
        }
    }
    return errors;
}

function validatePosts(posts: BlogPost[]): string[] {
    const errors: string[] = [];
    const slugs = new Set<string>();
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    const hooks = new Set<string>();
    const bodyShingles = new Map<string, string>();
    for (const post of posts) {
        if (!isSlug(post.slug)) errors.push(`${post.file}: slug must be lowercase.`);
        if (post.file !== `content/blog/${post.slug}.mdx`) {
            errors.push(`${post.file}: filename must be content/blog/${post.slug}.mdx.`);
        }
        if (slugs.has(post.slug)) errors.push(`${post.file}: duplicate slug ${post.slug}.`);
        slugs.add(post.slug);
        if (post.route !== `/blog/${post.slug}/`) errors.push(`${post.file}: url_path must be /blog/${post.slug}/.`);
        if (!isIsoDate(post.publishDate)) errors.push(`${post.file}: publish_date must be a real YYYY-MM-DD date.`);
        checkLength(errors, `${post.file} title`, post.title, 20, 110);
        checkLength(errors, `${post.file} meta_description`, post.metaDescription, 80, 200);
        checkLength(errors, `${post.file} hook`, post.hook, 20, 180);
        if (!post.categorySlug) errors.push(`${post.file}: category is required.`);
        if (post.tags.length < 2 || post.tags.length > 6) errors.push(`${post.file}: use 2 to 6 tags.`);
        if (post.social.xThread.length < 3 || post.social.xThread.length > 8) {
            errors.push(`${post.file}: social.xThread needs 3 to 8 posts.`);
        }
        for (const tweet of post.social.xThread) {
            if (tweet.length < 20 || tweet.length > 280) errors.push(`${post.file}: each X post must be 20–280 characters.`);
        }
        if (post.social.carousel.length < 3 || post.social.carousel.length > 8) {
            errors.push(`${post.file}: social.carousel needs 3 to 8 slides.`);
        }
        for (const slide of post.social.carousel) {
            if (slide.length < 10 || slide.length > 200) errors.push(`${post.file}: each carousel slide must be 10–200 characters.`);
        }
        checkLength(errors, `${post.file} shortFormHook`, post.social.shortFormHook, 20, 160);
        if (post.sourcePromo && (post.sourcePromo.length > 300 || /[\r\n]/.test(post.sourcePromo))) {
            errors.push(`${post.file}: source_promo must be a single line of at most 300 characters.`);
        }
        if (post.wordCount < 280) errors.push(`${post.file}: body must be at least 280 words (has ${post.wordCount}).`);
        if (!/\]\((\/free-thriller\/|\/free-reads\/|\/blog\/)/.test(post.body)) {
            errors.push(`${post.file}: body must link to a /free-thriller/, /free-reads/, or /blog/ URL.`);
        }
        if (!post.body.includes("<BookCta") && !post.body.includes(HUNTED_BOOKFUNNEL_URL)) {
            errors.push(`${post.file}: include <BookCta /> or the HUNTED BookFunnel URL.`);
        }
        if (post.cta.url && !isHuntedUrl(post.cta.url)) {
            errors.push(`${post.file}: cta.url must be the HUNTED BookFunnel link.`);
        }
        if (post.example && !includesPhrase(`${post.title} ${post.body.slice(0, 500)}`, "example")) {
            errors.push(`${post.file}: example posts must say "example" in the title or opening.`);
        }
        remember(errors, titles, `${post.file} title`, post.title);
        remember(errors, descriptions, `${post.file} meta_description`, post.metaDescription);
        remember(errors, hooks, `${post.file} hook`, post.hook);
        trackShingles(errors, bodyShingles, post.body, post.file, "body");
    }
    return errors;
}

function scanRawContent(root: string): string[] {
    const errors: string[] = [];
    const base = contentDir(root);
    if (!fs.existsSync(base)) return errors;
    for (const file of walk(base).filter((item) => /\.(mdx|md|json|txt|yml|yaml)$/.test(item))) {
        const text = fs.readFileSync(file, "utf8");
        const relPath = path.relative(root, file).split(path.sep).join("/");
        if (relPath.startsWith("plans/")) continue;
        if (text.toUpperCase().includes(FORBIDDEN_ASIN)) {
            errors.push(`${relPath}: contains forbidden ASIN ${FORBIDDEN_ASIN}.`);
        }
        const amazon = text.match(/https?:\/\/(?:www\.)?amazon\.com\/[^\s)"']+/gi) ?? [];
        for (const url of amazon) {
            if (!isAllowedAmazonUrl(url)) {
                errors.push(`${relPath}: Amazon URL ${stripUrl(url)} is not allowed. HUNTED uses BookFunnel. Other Amazon links must be Fractured Ground or a named partner book.`);
            }
        }
        if (text.includes("booksprout.co") && !text.includes(DIGITAL_ASCENT_ARC_URL)) {
            errors.push(`${relPath}: BookSprout links must use the Digital Ascent ARC URL.`);
        }
        for (const partner of [SHE_WAS_NEVER_ALONE_URL, THE_DEVOTED_LIE_URL]) {
            const count = text.split(partner).length - 1;
            if (count > 1) errors.push(`${relPath}: partner link ${partner} appears ${count} times. Use it once.`);
        }
    }
    return errors;
}

function stripUrl(url: string): string {
    return url.replace(/[),.;]+$/, "").split("?")[0].replace(/\/$/, "");
}

function trackShingles(errors: string[], seen: Map<string, string>, text: string, file: string, label: string) {
    const local = new Set<string>();
    for (const shingle of shingles(text)) {
        if (local.has(shingle)) continue;
        local.add(shingle);
        const owner = seen.get(shingle);
        if (owner && owner !== file) {
            errors.push(`${file}: ${label} repeats a 10-word sequence also used in ${owner}. Rewrite it so this page is not a template swap.`);
            return;
        }
        seen.set(shingle, file);
    }
}

function remember(errors: string[], seen: Set<string>, label: string, value: string) {
    const key = value.trim().toLowerCase();
    if (!key) return;
    if (seen.has(key)) errors.push(`${label} duplicates another page: "${value.trim()}".`);
    seen.add(key);
}

function checkLength(errors: string[], label: string, value: string, min: number, max: number) {
    const length = value.trim().length;
    if (length < min || length > max) errors.push(`${label} must be ${min}–${max} characters (has ${length}).`);
}

function listFiles(dir: string, extension: string): string[] {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter((name) => name.endsWith(extension) && !name.startsWith(".")).map((name) => path.join(dir, name)).sort();
}

function walk(dir: string): string[] {
    const out: string[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) out.push(...walk(full));
        else out.push(full);
    }
    return out;
}

function isPresent<T>(value: T | null): value is T {
    return value != null;
}
