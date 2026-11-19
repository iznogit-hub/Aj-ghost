import Image from "next/image";
import {
    DIGITAL_ASCENT_ARC_URL,
    DIGITAL_ASCENT_TITLE,
    FRACTURED_GROUND_KINDLE_URL,
    FRACTURED_GROUND_TITLE,
    HUNTED_BOOKFUNNEL_URL,
    HUNTED_TITLE,
    SERIES_NAME,
    isHuntedUrl,
} from "@/lib/books";

export function BookCta({ place, huntedUrl }: { place?: string; huntedUrl?: string }) {
    const href = huntedUrl && isHuntedUrl(huntedUrl) ? huntedUrl : HUNTED_BOOKFUNNEL_URL;
    const hunted = place ? `Get ${HUNTED_TITLE} free` : `Get ${HUNTED_TITLE} free`;
    return (
        <aside className="mt-12 rounded-3xl border border-gold-400/25 bg-navy-900/80 p-5 shadow-lg shadow-black/20 sm:p-8" aria-label="Get the books">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative mx-auto aspect-[2/3] w-32 shrink-0 overflow-hidden rounded-xl border border-gold-400/20 shadow-2xl sm:mx-0 sm:w-36">
                    <Image
                        src="/haunted-cover.jpg"
                        alt="Cover of HUNTED by AJ Ghost"
                        fill
                        sizes="144px"
                        className="object-cover"
                    />
                </div>
                <div className="min-w-0 flex-1 text-center sm:text-left">
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold-400/80">{SERIES_NAME}</p>
                    <h2 className="mt-2 font-serif text-3xl text-white sm:text-4xl">Keep the light off and keep reading</h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                        The piece above is a free in-page read{place ? ` for readers in ${place}` : ""}. {HUNTED_TITLE}, the Book 1 prequel, is free on BookFunnel. {FRACTURED_GROUND_TITLE} is on Kindle. {DIGITAL_ASCENT_TITLE}, book three, is an advance review copy on BookSprout.
                    </p>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-gold-400 px-5 text-sm font-semibold text-navy-950 shadow-md shadow-gold-400/20 hover:bg-gold-300"
                        >
                            {hunted}
                        </a>
                        <a
                            href={FRACTURED_GROUND_KINDLE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 items-center justify-center rounded-full border border-gold-400/40 px-5 text-sm font-semibold text-gold-200 hover:border-gold-300 hover:text-gold-100"
                        >
                            {FRACTURED_GROUND_TITLE} on Kindle
                        </a>
                        <a
                            href={DIGITAL_ASCENT_ARC_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white/80 hover:border-gold-400/40 hover:text-gold-200"
                        >
                            Get the free ARC
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
}
