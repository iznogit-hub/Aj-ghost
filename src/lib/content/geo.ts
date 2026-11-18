import { isLive, slugify } from "@/lib/content/text";
import type { ContentIndex, GeoHint, GeoPlace, GeoState } from "@/lib/content/types";

export const GEO_MAX_MILES = 500;

/** Published cities only, so a scheduled page cannot be suggested before its date. */
export function geoCatalog(index: ContentIndex, now: Date): { places: GeoPlace[]; states: GeoState[] } {
    const landings = index.landings.filter((page) => isLive(page, now) && page.pageKind === "city");
    const newest = new Map<string, (typeof landings)[number]>();
    for (const page of landings) {
        const key = `${page.stateSlug}/${page.citySlug}`;
        const current = newest.get(key);
        if (!current || page.publishDate > current.publishDate) newest.set(key, page);
    }

    const places: GeoPlace[] = [];
    for (const page of newest.values()) {
        const city = index.cities.find((item) => item.stateSlug === page.stateSlug && item.slug === page.citySlug);
        const state = index.states.find((item) => item.slug === page.stateSlug) ?? {
            code: page.stateCode,
            name: page.stateName,
            slug: page.stateSlug,
        };
        if (!city || !state) continue;
        places.push({
            state: page.stateSlug,
            stateName: state.name,
            stateCode: state.code,
            city: page.citySlug ?? "",
            cityName: city.name,
            lat: city.lat,
            lng: city.lng,
            href: page.route,
            label: page.h1,
            });
    }

    const states = index.states
        .filter((state) => index.landings.some((page) => isLive(page, now) && page.stateSlug === state.slug))
        .map((state) => ({ code: state.code, name: state.name, href: `/free-thriller/${state.slug}/` }));

    return { places, states };
}

export type GeoInput = {
    country: string | null;
    region: string | null;
    city: string | null;
    latitude: number | null;
    longitude: number | null;
};

export function pickGeoHint(input: GeoInput, places: GeoPlace[], states: GeoState[]): GeoHint | null {
    const country = (input.country ?? "").trim().toUpperCase();
    if (country !== "US") return null;

    const citySlug = slugify(decodeCity(input.city));
    const named = citySlug ? places.find((place) => place.city === citySlug) : undefined;
    if (named) {
        return {
            href: named.href,
            label: named.label,
            city: named.cityName,
            state: named.stateName,
            matchedBy: "city",
        };
    }

    if (input.latitude != null && input.longitude != null) {
        let best: { place: GeoPlace; miles: number } | null = null;
        for (const place of places) {
            const distance = milesBetween(input.latitude, input.longitude, place.lat, place.lng);
            if (!best || distance < best.miles) best = { place, miles: distance };
        }
        if (best && best.miles <= GEO_MAX_MILES) {
            return {
                href: best.place.href,
                label: best.place.label,
                city: best.place.cityName,
                state: best.place.stateName,
                matchedBy: "coordinates",
            };
        }
    }

    const region = (input.region ?? "").trim().toUpperCase();
    const state = states.find((item) => item.code === region);
    if (state) {
        return {
            href: state.href,
            label: `${state.name} pages`,
            city: state.name,
            state: state.name,
            matchedBy: "state",
        };
    }

    return null;
}

export function milesBetween(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const earth = 3958.8;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return 2 * earth * Math.asin(Math.min(1, Math.sqrt(a)));
}

function decodeCity(value: string | null): string {
    if (!value) return "";
    try {
        return decodeURIComponent(value.replace(/\+/g, " "));
    } catch {
        return value;
    }
}
