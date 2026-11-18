import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
    return (
        <nav aria-label="Breadcrumb" className="mb-6 text-[11px] font-mono uppercase tracking-[0.18em] text-white/45">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {items.map((item, index) => (
                    <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                        {index > 0 ? <span aria-hidden="true" className="text-gold-400/50">/</span> : null}
                        {item.href ? (
                            <Link href={item.href} className="hover:text-gold-300">{item.label}</Link>
                        ) : (
                            <span className="text-white/75" aria-current="page">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
