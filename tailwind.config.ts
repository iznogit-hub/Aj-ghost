import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                md: "2rem",
                lg: "4rem",
            },
        },
        fontFamily: {
            sans: ["var(--font-inter)", "sans-serif"],
            serif: ["var(--font-playfair)", "serif"],
            mono: ["var(--font-mono)", "monospace"],
        },
        screens: {
            sm: "375px",
            md: "768px",
            lg: "1200px",
        },
        extend: {
            colors: {
                navy: {
                    950: "#030a1a",
                    900: "#071428",
                    800: "#0c1f3d",
                    700: "#132d56",
                    600: "#1a3b6e",
                },
                gold: {
                    50: "#fdf8e8",
                    100: "#f9edc4",
                    200: "#f0d889",
                    300: "#e6c04e",
                    400: "#d4a827",
                    500: "#c49a1a",
                    600: "#a67c12",
                    700: "#8a6310",
                    800: "#6e4f0e",
                    900: "#503a0c",
                },
            },
            animation: {
                "pulse-gold": "pulseGold 3s ease-in-out infinite",
                "float": "float 6s ease-in-out infinite",
                "crack-glow": "crackGlow 4s ease-in-out infinite",
                "fade-in-up": "fadeInUp 0.8s ease-out forwards",
                "shimmer": "shimmer 3s linear infinite",
            },
            keyframes: {
                pulseGold: {
                    "0%, 100%": { opacity: "0.4" },
                    "50%": { opacity: "1" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                crackGlow: {
                    "0%, 100%": { filter: "brightness(1) drop-shadow(0 0 5px rgba(212, 168, 39, 0.3))" },
                    "50%": { filter: "brightness(1.3) drop-shadow(0 0 20px rgba(212, 168, 39, 0.6))" },
                },
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
