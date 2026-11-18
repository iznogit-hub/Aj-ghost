import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return parts.filter(Boolean).map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={index} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
            return <em key={index}>{part.slice(1, -1)}</em>;
        }
        return <span key={index}>{part}</span>;
    });
}

/** Small markdown subset for landing micro books: paragraphs, emphasis, blockquotes. */
export function MarkdownBody({ markdown, dropCap = false }: { markdown: string; dropCap?: boolean }) {
    const blocks = markdown.replace(/\r\n/g, "\n").trim().split(/\n\n+/);
    return (
        <>
            {blocks.map((block, index) => {
                const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
                if (lines.length && lines.every((line) => line.startsWith(">"))) {
                    const quote = lines.map((line) => line.replace(/^>\s?/, "")).join(" ");
                    return (
                        <blockquote key={index} className="border-l-2 border-gold-400/50 pl-4 text-gold-100/90 italic">
                            {inline(quote)}
                        </blockquote>
                    );
                }
                return (
                    <p key={index} className={dropCap && index === 0 ? "drop-cap" : undefined}>
                        {inline(lines.join(" "))}
                    </p>
                );
            })}
        </>
    );
}
