import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
    axes: ["opsz"],
});

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    display: "swap",
});

const mono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "AJ Ghost | Psychological Thriller Author — Dark Fiction That Haunts You",
    description:
        "AJ Ghost writes dark psychological thrillers that explore fractured minds, buried secrets, and the thin line between predator and prey. Discover HUNTED, Fractured Ground, and The Ryan Kane Series.",
    keywords: "AJ Ghost, psychological thriller, dark fiction, HUNTED, Fractured Ground, The Ryan Kane Series, thriller author, suspense novels",
    openGraph: {
        title: "AJ Ghost | Psychological Thriller Author",
        description: "Dark fiction that haunts you long after the last page.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${playfair.variable} ${mono.variable} font-sans antialiased bg-navy-950 text-white`}
            >
                {children}
            </body>
        </html>
    );
}