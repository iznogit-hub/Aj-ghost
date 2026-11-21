/** Canonical book links for new pages. HUNTED is always the BookFunnel download. */
export const HUNTED_BOOKFUNNEL_URL = "https://dl.bookfunnel.com/j4e3jsxfr6";
export const FRACTURED_GROUND_KINDLE_URL = "https://www.amazon.com/dp/B0H9SXX81F";
export const SHE_WAS_NEVER_ALONE_URL = "https://www.amazon.com/dp/B0HP5BB2Q5";
export const THE_DEVOTED_LIE_URL = "https://www.amazon.com/dp/B0HRYLLZFG";
export const THE_ONES_WORTH_KEEPING_URL = "https://www.amazon.com/dp/B0HCH1QPV1";
export const COLD_HARD_MURDER_URL = "https://www.amazon.com/dp/B0DHV4463Q";
export const BROKEN_CITY_URL = "https://www.amazon.com/dp/B0G1X5MYV9";
export const THE_EMPTY_BOAT_URL = "https://www.amazon.com/dp/B0HPMMMFNR";
export const THEIRS_URL = "https://www.amazon.com/dp/B0HNN4MJ6D";
export const STALKER_BOOKFUNNEL_URL = "https://dl.bookfunnel.com/dt9msoegf9";
export const GARDEN_OF_LIES_URL = "https://BookHip.com/LMKTHQV";
export const DIGITAL_ASCENT_ARC_URL =
    "https://booksprout.co/reviewer/review-copy/view/333083/digital-ascent-book-three-in-the-ryan-kane-series";

/** Retired ASIN. Must never appear in content, metadata, or new links. */
export const FORBIDDEN_ASIN = "B0HJS668XN";

const ALLOWED_AMAZON_URLS = new Set([
    FRACTURED_GROUND_KINDLE_URL,
    SHE_WAS_NEVER_ALONE_URL,
    THE_DEVOTED_LIE_URL,
    THE_ONES_WORTH_KEEPING_URL,
    COLD_HARD_MURDER_URL,
    BROKEN_CITY_URL,
    THE_EMPTY_BOAT_URL,
    THEIRS_URL,
]);

export function bareUrl(url: string): string {
    return url.replace(/[),.;]+$/, "").split("?")[0].replace(/\/$/, "");
}

export function isAllowedAmazonUrl(url: string): boolean {
    const bare = bareUrl(url);
    if (bare.toUpperCase().includes(FORBIDDEN_ASIN)) return false;
    return ALLOWED_AMAZON_URLS.has(bare);
}

export function isAllowedPartnerPickUrl(url: string): boolean {
    if (isAllowedAmazonUrl(url)) return true;
    const bare = bareUrl(url);
    if (bare === bareUrl(STALKER_BOOKFUNNEL_URL)) return true;
    try {
        const parsed = new URL(url);
        const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
        const path = parsed.pathname.replace(/\/$/, "").toUpperCase();
        if (host === "bookhip.com" && path === "/LMKTHQV") return true;
    } catch {
        return false;
    }
    return false;
}

export function isHuntedUrl(url: string): boolean {
    try {
        const parsed = new URL(url);
        return (
            parsed.protocol === "https:" &&
            parsed.hostname === "dl.bookfunnel.com" &&
            parsed.pathname.replace(/\/$/, "") === "/j4e3jsxfr6"
        );
    } catch {
        return false;
    }
}

export const HUNTED_TITLE = "HUNTED";
export const FRACTURED_GROUND_TITLE = "Fractured Ground";
export const DIGITAL_ASCENT_TITLE = "Digital Ascent";
export const SERIES_NAME = "The Ryan Kane Series";
export const AUTHOR_NAME = "AJ Ghost";
