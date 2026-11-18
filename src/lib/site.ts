export const DEFAULT_SITE_URL = "https://ajghost.com";

export function siteUrl(): string {
    const raw = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
    return raw.replace(/\/$/, "");
}

/**
 * Build clock for publish dates.
 * Date-only PSEO_NOW is noon UTC so the calendar day does not slip.
 * Ignored when VERCEL_ENV=production so a preview override cannot ship early.
 */
export function getNow(): Date {
    const raw = process.env.PSEO_NOW?.trim();
    const allowOverride = process.env.VERCEL_ENV !== "production" && !!raw;
    if (allowOverride && raw) {
        const iso = /^\d{4}-\d{2}-\d{2}$/.test(raw) ? `${raw}T12:00:00.000Z` : raw;
        const parsed = new Date(iso);
        if (!Number.isNaN(parsed.getTime())) return parsed;
    }
    return new Date();
}

export function utcDay(date: Date): string {
    return date.toISOString().slice(0, 10);
}
