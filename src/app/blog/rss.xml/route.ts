import { AUTHOR_NAME, SERIES_NAME } from "@/lib/books";
import { publishedPosts } from "@/lib/content/load";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

export function GET() {
    const base = siteUrl();
    const posts = publishedPosts();
    const items = posts.map((post) => {
        const link = `${base}${post.route}`;
        const categories = [post.category, ...post.tags]
            .map((category) => `<category>${escapeXml(category)}</category>`)
            .join("");
        const pubDate = new Date(`${post.publishDate}T00:00:00.000Z`).toUTCString();
        return `<item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.metaDescription)}</description>
      ${categories}
    </item>`;
    }).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${AUTHOR_NAME} journal`)}</title>
    <link>${base}/blog</link>
    <description>${escapeXml(`Essays from ${AUTHOR_NAME} on ${SERIES_NAME}.`)}</description>
    <language>en-us</language>
    <atom:link href="${base}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
        },
    });
}
