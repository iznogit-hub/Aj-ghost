export function ExampleBanner({ kind }: { kind: "landing" | "post" }) {
    const copy = kind === "landing"
        ? "Example placeholder page. The local note and in-page story are sample copy for the content system, not a chapter of the published books."
        : "Example placeholder post. The essay, hook, and social pack are sample copy so a content agent can see the schema.";
    return (
        <p className="mb-6 rounded-2xl border border-gold-400/30 bg-gold-400/10 px-4 py-3 text-sm leading-relaxed text-gold-50">
            {copy}
        </p>
    );
}
