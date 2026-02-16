import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                "primary-dark": "var(--primary-dark)",
                secondary: "var(--secondary)",
                "secondary-light": "var(--secondary-light)",
                accent: "var(--accent)",
                cream: "var(--cream)",
            },
            fontFamily: {
                amiri: ["Amiri", "serif"],
                inter: ["Inter", "sans-serif"],
            },
            animation: {
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
        },
    },
    plugins: [],
};
export default config;
