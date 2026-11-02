import Tag from "@/components/Tag";
import { ExternalLink } from "lucide-react";

const HUNTED_AMAZON = "https://www.amazon.com/dp/B0H9V75G1M";
const FRACTURED_GROUND_AMAZON = "https://www.amazon.com/dp/B0H9SXX81F";
const AMAZON_AUTHOR_STORE = "https://www.amazon.com/stores/author/B0HD9D7DRD";

const books = [
    {
        title: "HUNTED",
        detail: "The Ryan Kane Series, Book One",
        href: HUNTED_AMAZON,
    },
    {
        title: "Fractured Ground",
        detail: "The Ryan Kane Series, Book Two",
        href: FRACTURED_GROUND_AMAZON,
    },
];

export default function Reviews() {
    return (
        <section className="py-24 bg-navy-950 relative overflow-hidden" id="reviews">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold-400/5 blur-[180px] pointer-events-none rounded-full" />

            <div className="container relative z-10 max-w-5xl mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="flex justify-center">
                        <Tag>Reader Reviews</Tag>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-6 tracking-tight text-white">
                        Readers on <span className="text-gold-gradient">The Ryan Kane Series</span>
                    </h2>
                    <p className="text-white/45 mt-4 text-base md:text-lg">
                        Reader reviews for HUNTED and Fractured Ground are on Amazon. Read them there, in the reviewer&apos;s own words.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {books.map((book) => (
                        <a
                            key={book.title}
                            href={book.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card rounded-3xl p-8 md:p-10 border border-gold-400/30 hover:border-gold-400/60 transition duration-300 group"
                        >
                            <p className="text-xs font-mono uppercase tracking-widest text-gold-400/80">
                                {book.detail}
                            </p>
                            <h3 className="text-3xl font-serif font-bold text-white mt-3 group-hover:text-gold-300 transition">
                                {book.title}
                            </h3>
                            <span className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-gold-300 group-hover:text-gold-200 transition">
                                Read reviews on Amazon
                                <ExternalLink size={15} />
                            </span>
                        </a>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href={AMAZON_AUTHOR_STORE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-gold-400/80 hover:text-gold-300 font-semibold transition"
                    >
                        <span>AJ Ghost on Amazon</span>
                        <ExternalLink size={15} />
                    </a>
                </div>
            </div>
        </section>
    );
}
