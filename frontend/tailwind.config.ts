import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                forest: {
                    50: "#f0faf0",
                    100: "#dcf1dc",
                    200: "#b8e3b8",
                    300: "#84cc84",
                    400: "#4eab4e",
                    500: "#2d6a2d",
                    600: "#235523",
                    700: "#1c441c",
                    800: "#163616",
                    900: "#0f2f0f",
                    950: "#071807",
                },
                plant: {
                    50: "#f2fbf4",
                    100: "#e0f6e4",
                    200: "#c2eccb",
                    300: "#95dcc3",
                    400: "#60c476",
                    500: "#43a047", // Natural plant green
                    600: "#2e7d32", // Darker plant green
                    700: "#1b5e20",
                    800: "#144418",
                    900: "#0e3111",
                    950: "#051608",
                },
                terra: {
                    50: "#fdf6f0",
                    100: "#fdf0e8",
                    200: "#fad9c4",
                    300: "#f6ba96",
                    400: "#c1694f",
                    500: "#a84e39",
                    600: "#8b3a2a",
                    700: "#6e2d1f",
                    800: "#4f1f14",
                    900: "#30120b",
                },
                cream: "#fafaf5",
                charcoal: "#1a1a1a",
                mist: "#f5f7f5",
            },
            fontFamily: {
                outfit: ["Outfit", "sans-serif"],
                inter: ["Inter", "sans-serif"],
            },
            animation: {
                "fade-up": "fadeUp 0.6s ease-out forwards",
                "fade-in": "fadeIn 0.4s ease-out forwards",
                "slide-right": "slideRight 0.5s ease-out forwards",
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "spin-slow": "spin 8s linear infinite",
                "float": "float 6s ease-in-out infinite",
                "gradient": "gradient 8s ease infinite",
            },
            keyframes: {
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(24px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideRight: {
                    "0%": { opacity: "0", transform: "translateX(-24px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-12px)" },
                },
                gradient: {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "hero-pattern": "url('/hero-bg.svg')",
                "noise": "url('/noise.svg')",
            },
            boxShadow: {
                "forest": "0 4px 24px rgba(45, 106, 45, 0.2)",
                "terra": "0 4px 24px rgba(193, 105, 79, 0.2)",
                "card": "0 2px 16px rgba(0, 0, 0, 0.06)",
                "card-hover": "0 8px 32px rgba(0, 0, 0, 0.12)",
            },
            borderRadius: {
                "2xl": "1rem",
                "3xl": "1.5rem",
                "4xl": "2rem",
            },
        },
    },
    plugins: [],
};

export default config;
