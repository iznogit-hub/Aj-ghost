import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { readContent } from "@/lib/content/validate";
import { isLive } from "@/lib/content/text";
import { getNow, utcDay } from "@/lib/site";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Vercel Cron hits this daily. It asks Vercel to rebuild production so any
 * landing page or post whose publishDate arrived overnight becomes static HTML,
 * and the sitemap and RSS drop anything still in the future.
 * A git push already deploys that commit. This route covers dates that arrive
 * with no new commit.
 */
export async function GET(request: Request) {
    const secret = process.env.CRON_SECRET ?? "";
    const header = request.headers.get("authorization") ?? "";
    const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : "";
    if (!secret || !token || !safeEqual(token, secret)) {
        return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401, headers: { "X-Robots-Tag": "noindex" } });
    }

    const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
    if (!hook) {
        return NextResponse.json(
            { ok: false, error: "VERCEL_DEPLOY_HOOK_URL is not set" },
            { status: 500, headers: { "X-Robots-Tag": "noindex" } },
        );
    }

    const now = getNow();
    const today = utcDay(now);
    let scheduledToday = 0;
    let publishedLandings = 0;
    let publishedPosts = 0;
    try {
        const index = readContent(process.cwd());
        const dates = [...index.landings.map((page) => page.publishDate), ...index.posts.map((post) => post.publishDate)];
        scheduledToday = dates.filter((date) => date === today).length;
        publishedLandings = index.landings.filter((page) => isLive(page, now)).length;
        publishedPosts = index.posts.filter((post) => isLive(post, now)).length;
    } catch {
        scheduledToday = -1;
    }

    let status = 0;
    try {
        const response = await fetch(hook, { method: "POST", cache: "no-store" });
        status = response.status;
        if (!response.ok) {
            return NextResponse.json(
                { ok: false, error: "deploy hook failed", status },
                { status: 502, headers: { "X-Robots-Tag": "noindex" } },
            );
        }
    } catch {
        return NextResponse.json(
            { ok: false, error: "deploy hook unreachable" },
            { status: 502, headers: { "X-Robots-Tag": "noindex" } },
        );
    }

    return NextResponse.json(
        { ok: true, triggered: true, status, scheduledToday, publishedLandings, publishedPosts },
        { headers: { "X-Robots-Tag": "noindex" } },
    );
}

function safeEqual(leftValue: string, rightValue: string): boolean {
    const left = Buffer.from(leftValue);
    const right = Buffer.from(rightValue);
    if (left.length !== right.length) return false;
    return timingSafeEqual(left, right);
}
