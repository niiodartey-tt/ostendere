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
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleX: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        scrollPulse: {
          "0%, 100%": { transform: "scaleY(0)", opacity: "0" },
          "50%": { transform: "scaleY(1)", opacity: "1" },
        },
        "celtic-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both",
        "fade-up-delay": "fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 1.2s both",
        "scale-x": "scaleX 0.8s ease-out 0.9s both",
        "fade-in": "fadeIn 1s ease-out 0.5s both",
        "scroll-pulse": "scrollPulse 2s ease-in-out 2s infinite",
        "celtic-idle": "celtic-spin 12s linear infinite",
        "celtic-fast": "celtic-spin 3s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
