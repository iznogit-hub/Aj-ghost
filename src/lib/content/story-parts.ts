import { slugify } from "@/lib/content/text";
import type { StoryPart } from "@/lib/content/types";

/** Split a micro-book into navigable parts without changing its words. */
export function storyParts(body: string): StoryPart[] {
    const text = body.replace(/\r\n/g, "\n").trim();
    if (/^DAY\s+\d+/m.test(text)) {
        return text.split(/\n(?=DAY\s+\d+)/).map((part, index) => {
            const heading = part.match(/^DAY\s+\d+/)?.[0];
            const title = heading ?? (index === 0 ? "Preface" : `Part ${index + 1}`);
            const prose = heading ? part.slice(heading.length).trim() : part.trim();
            return { id: slugify(title) || `part-${index + 1}`, title, body: prose };
        }).filter((part) => part.body);
    }
    const paragraphs = text.split(/\n\n+/).filter(Boolean);
    const size = Math.max(1, Math.ceil(paragraphs.length / 3));
    const titles = ["Opening", "Middle", "Close"];
    return [0, 1, 2]
        .map((index) => ({
            id: slugify(titles[index]),
            title: titles[index],
            body: paragraphs.slice(index * size, (index + 1) * size).join("\n\n"),
        }))
        .filter((part) => part.body);
}
