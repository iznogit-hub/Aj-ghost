import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; // Added Mono font for thriller vibe
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
    axes: ["opsz"],
});

// Optional: You can use this for the "Mono" feel in headers
const mono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "HUNTED | A Dark Psychological Thriller",
    description: "He's invisible. Homeless. Hunted. Ryan Kane lost more than his memory in Kandahar.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${mono.variable} font-sans antialiased bg-white text-neutral-950`}
            >
                {children}
            </body>
        </html>
    );
}