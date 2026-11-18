import { utcDay } from "@/lib/site";

export const MONTHLY_CAP = 50;
export const SHINGLE_SIZE = 10;

export function isIsoDate(value: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split("-").map(Number);
    const utc = new Date(Date.UTC(year, month - 1, day));
    return (
        utc.getUTCFullYear() === year &&
        utc.getUTCMonth() === month - 1 &&
        utc.getUTCDate() === day
    );
}

/** True when the UTC calendar day of publishDate is today or earlier. */
export function isPublished(publishDate: string, now: Date): boolean {
    return publishDate <= utcDay(now);
}

const WITHHELD = new Set(["draft", "draft_planned"]);

export function isWithheld(status?: string): boolean {
    return !!status && WITHHELD.has(status);
}

/**
 * Live when the item is not withheld and its instant has arrived.
 * publishAt (ISO 8601, offset allowed) wins. Otherwise publishDate is a UTC day.
 */
export function isLive(
    item: { publishDate: string; publishAt?: string; status?: string },
    now: Date,
): boolean {
    if (isWithheld(item.status)) return false;
    if (item.publishAt) {
        const instant = Date.parse(item.publishAt);
        if (!Number.isNaN(instant)) return instant <= now.getTime();
    }
    return isPublished(item.publishDate, now);
}

export function monthKey(publishDate: string): string {
    return publishDate.slice(0, 7);
}

export function slugify(value: string): string {
    return value
        .toLowerCase()
        .normalize("NFKD")
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function isSlug(value: string): boolean {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

export function wordCount(text: string): number {
    return words(text).length;
}

export function words(text: string): string[] {
    const plain = text
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/`[^`]*`/g, " ")
        .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
        .replace(/\[[^\]]*]\([^)]*\)/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/[#>*_~]/g, " ");
    return plain
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean);
}

export function shingles(text: string, size = SHINGLE_SIZE): string[] {
    const tokens = words(text);
    if (tokens.length < size) return [];
    const out: string[] = [];
    for (let i = 0; i <= tokens.length - size; i += 1) {
        out.push(tokens.slice(i, i + size).join(" "));
    }
    return out;
}

export function readingMinutes(count: number): number {
    return Math.max(1, Math.round(count / 230));
}

export function includesPhrase(haystack: string, needle: string): boolean {
    return haystack.toLowerCase().includes(needle.toLowerCase());
}

export function asDateString(value: unknown): string {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return value.toISOString().slice(0, 10);
    }
    if (typeof value === "string") return value.trim();
    return "";
}

export function excerpt(text: string, max = 180): string {
    const flat = text.replace(/\s+/g, " ").trim();
    if (flat.length <= max) return flat;
    return `${flat.slice(0, max - 1).trimEnd()}…`;
}
