import { siteUrl } from "@/lib/site";

export function ShareBar({ path, text }: { path: string; text: string }) {
    const url = `${siteUrl()}${path}`;
    const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    const mail = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;

    const link = "inline-flex h-10 items-center rounded-full border border-white/15 px-4 text-[11px] font-mono uppercase tracking-[0.16em] text-white/70 hover:border-gold-400/40 hover:text-gold-200";

    return (
        <div className="mt-6 flex flex-wrap gap-2" aria-label="Share this post">
            <a className={link} href={tweet} target="_blank" rel="noopener noreferrer">Share on X</a>
            <a className={link} href={facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a className={link} href={mail}>Email</a>
        </div>
    );
}
