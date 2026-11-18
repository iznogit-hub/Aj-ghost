import { AUTHOR_NAME, HUNTED_BOOKFUNNEL_URL, HUNTED_TITLE, SERIES_NAME } from "@/lib/books";
import { siteUrl } from "@/lib/site";
import type { BlogPost, LandingPage, MicroBook } from "@/lib/content/types";

export function landingJsonLd(page: LandingPage, story?: MicroBook) {
    const base = siteUrl();
    const url = `${base}${page.route}`;
    const graph: Record<string, unknown>[] = [
        {
            "@type": "Article",
            "@id": `${url}#article`,
            headline: page.h1,
            description: page.metaDescription,
            datePublished: page.publishDate,
            dateModified: page.publishDate,
            author: { "@type": "Person", name: AUTHOR_NAME, url: base },
            publisher: { "@type": "Organization", name: AUTHOR_NAME, url: base },
            mainEntityOfPage: url,
            contentLocation: {
                "@type": "Place",
                name: page.cityName ? `${page.cityName}, ${page.stateName}` : page.stateName,
                address: {
                    "@type": "PostalAddress",
                    addressLocality: page.cityName ?? undefined,
                    addressRegion: page.stateCode,
                    addressCountry: "US",
                },
            },
        },
        bookNode(`${url}#hunted`, HUNTED_TITLE, "Book 1 prequel in The Ryan Kane Series.", HUNTED_BOOKFUNNEL_URL, "0"),
        {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumbs`,
            itemListElement: [
                crumb(1, "Home", `${base}/`),
                crumb(2, "Free thriller", `${base}/free-thriller/`),
                crumb(3, page.stateName, `${base}/free-thriller/${page.stateSlug}/`),
                ...(page.cityName ? [crumb(4, page.cityName, url)] : []),
            ],
        },
    ];
    if (story) {
        graph.push({
            "@type": "ShortStory",
            "@id": `${base}${story.route}#story`,
            name: story.title,
            url: `${base}${story.route}`,
            author: { "@type": "Person", name: AUTHOR_NAME },
            description: story.logline,
            isPartOf: { "@type": "BookSeries", name: SERIES_NAME },
        });
    }
    return { "@context": "https://schema.org", "@graph": graph };
}

export function storyJsonLd(story: MicroBook) {
    const base = siteUrl();
    const url = `${base}${story.route}`;
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ShortStory",
                "@id": `${url}#story`,
                name: story.title,
                headline: story.title,
                description: story.logline,
                datePublished: story.publishDate,
                url,
                author: { "@type": "Person", name: AUTHOR_NAME, url: base },
                publisher: { "@type": "Organization", name: AUTHOR_NAME, url: base },
                isPartOf: { "@type": "BookSeries", name: SERIES_NAME },
            },
            bookNode(`${url}#hunted`, HUNTED_TITLE, `${SERIES_NAME}. Free on BookFunnel.`, HUNTED_BOOKFUNNEL_URL, "0"),
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    crumb(1, "Home", `${base}/`),
                    crumb(2, "Free reads", `${base}/free-reads/`),
                    crumb(3, story.title, url),
                ],
            },
        ],
    };
}

export function postJsonLd(post: BlogPost) {
    const base = siteUrl();
    const url = `${base}${post.route}`;
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "@id": `${url}#article`,
                headline: post.title,
                description: post.metaDescription,
                datePublished: post.publishDate,
                dateModified: post.publishDate,
                articleSection: post.category,
                keywords: post.tags.join(", "),
                author: { "@type": "Person", name: post.author, url: base },
                publisher: { "@type": "Organization", name: AUTHOR_NAME, url: base },
                mainEntityOfPage: url,
            },
            bookNode(`${url}#hunted`, HUNTED_TITLE, `${SERIES_NAME}. Free on BookFunnel.`, HUNTED_BOOKFUNNEL_URL, "0"),
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    crumb(1, "Home", `${base}/`),
                    crumb(2, "Blog", `${base}/blog/`),
                    crumb(3, post.category, `${base}/blog/category/${post.categorySlug}/`),
                    crumb(4, post.title, url),
                ],
            },
        ],
    };
}

function bookNode(id: string, name: string, description: string, url: string, price: string) {
    return {
        "@type": "Book",
        "@id": id,
        name,
        author: { "@type": "Person", name: AUTHOR_NAME },
        description,
        url,
        bookSeries: { "@type": "BookSeries", name: SERIES_NAME },
        offers: { "@type": "Offer", price, priceCurrency: "USD", availability: "https://schema.org/InStock", url },
    };
}

function crumb(position: number, name: string, item: string) {
    return { "@type": "ListItem", position, name, item };
}
