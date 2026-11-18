import type { MetadataRoute } from "next";
import { absolutePublicPaths, publicPaths, sitemapChunkSize } from "@/lib/content/paths";
import { getContent } from "@/lib/content/load";
import { getNow } from "@/lib/site";

export async function generateSitemaps() {
    const count = publicPaths(getContent(), getNow()).length;
    const parts = Math.max(1, Math.ceil(count / sitemapChunkSize()));
    return Array.from({ length: parts }, (_, id) => ({ id }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
    const chunk = sitemapChunkSize();
    const all = absolutePublicPaths(getContent(), getNow());
    return all.slice(id * chunk, (id + 1) * chunk).map((item) => ({
        url: item.url,
        lastModified: item.lastModified,
        changeFrequency: item.changeFrequency,
        priority: item.priority,
    }));
}
