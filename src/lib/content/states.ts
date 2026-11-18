import { slugify } from "@/lib/content/text";

/** All US states so a new landing only needs a state code the plan already uses. */
const RAW: [string, string][] = [
    ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"],
    ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"],
    ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"],
    ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"],
    ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"], ["MD", "Maryland"],
    ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"], ["MS", "Mississippi"],
    ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"], ["NV", "Nevada"],
    ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"], ["NY", "New York"],
    ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"],
    ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"],
    ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"],
    ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"], ["WV", "West Virginia"],
    ["WI", "Wisconsin"], ["WY", "Wyoming"], ["DC", "District of Columbia"],
];

export type UsState = { code: string; name: string; slug: string };

export const US_STATES: UsState[] = RAW.map(([code, name]) => ({
    code,
    name,
    slug: slugify(name),
}));

const BY_CODE = new Map(US_STATES.map((state) => [state.code, state]));
const BY_SLUG = new Map(US_STATES.map((state) => [state.slug, state]));

export function stateByCode(code: string): UsState | undefined {
    return BY_CODE.get(code.trim().toUpperCase());
}

export function stateBySlug(slug: string): UsState | undefined {
    return BY_SLUG.get(slug);
}

export function citySlug(name: string): string {
    return slugify(name);
}

/** Plan paths, always with a trailing slash so they match url_path. */
export function landingPath(stateCode: string, city: string | null): string {
    const state = stateByCode(stateCode);
    const stateSlug = state?.slug ?? slugify(stateCode);
    if (!city) return `/free-thriller/${stateSlug}/`;
    return `/free-thriller/${stateSlug}/${citySlug(city)}/`;
}
