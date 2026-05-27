import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0a0d1a",
          deep: "#060810",
          surface: "#0f1428",
        },
        navy: {
          DEFAULT: "#0a0d1a",
          light: "#141830",
          border: "#1e2440",
        },
        silver: {
          DEFAULT: "#C0C0C0",
          light: "#E8E8E8",
          dark: "#8a8a8a",
          platinum: "#E5E4E2",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#D4AF6A",
        },
        text: {
          primary: "#F5F5F5",
          secondary: "#A0A0A0",
          muted: "#606060",
        },
      },
      fontFamily: {
        sans: ["var(--font-primary)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
