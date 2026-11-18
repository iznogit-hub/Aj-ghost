import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { geoCatalog, pickGeoHint } from "@/lib/content/geo";
import { getContent } from "@/lib/content/load";
import { getNow } from "@/lib/site";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET() {
    const requestHeaders = headers();
    const latitude = Number(requestHeaders.get("x-vercel-ip-latitude"));
    const longitude = Number(requestHeaders.get("x-vercel-ip-longitude"));
    const { places, states } = geoCatalog(getContent(), getNow());
    const hint = pickGeoHint(
        {
            country: requestHeaders.get("x-vercel-ip-country"),
            region: requestHeaders.get("x-vercel-ip-country-region"),
            city: requestHeaders.get("x-vercel-ip-city"),
            latitude: Number.isFinite(latitude) ? latitude : null,
            longitude: Number.isFinite(longitude) ? longitude : null,
        },
        places,
        states,
    );

    return NextResponse.json(hint ?? { href: null }, {
        headers: {
            "Cache-Control": "private, no-store",
            "X-Robots-Tag": "noindex",
        },
    });
}
