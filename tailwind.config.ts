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
        espresso: {
          DEFAULT: "#1c1611",
          2: "#241b14",
        },
        coffee: {
          DEFAULT: "#2f231a",
          3: "#3b2c20",
        },
        cream: {
          DEFAULT: "#ece3d2",
          dim: "#b9ac97",
          faint: "#8a7d6b",
        },
        brass: {
          DEFAULT: "#c79a6b",
          deep: "#a87f52",
        },
        line: {
          DEFAULT: "rgba(236,227,210,0.14)",
          soft: "rgba(236,227,210,0.08)",
        },
      },
      fontFamily: {
        sans:    ["var(--font-primary)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        serif:   ["var(--font-serif)",   "Georgia", "serif"],
        mono:    ["var(--font-mono)",    "Helvetica Neue", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleX: {
          "0%":   { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        drop: {
          "0%":   { top: "-50%" },
          "100%": { top: "100%" },
        },
        pulse: {
          "0%":   { boxShadow: "0 0 0 0 rgba(199,154,107,0.6)" },
          "70%":  { boxShadow: "0 0 0 9px rgba(199,154,107,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(199,154,107,0)" },
        },
        scrub: {
          to: { transform: "scaleX(1)" },
        },
        scardIn: {
          to: { opacity: "1", transform: "none" },
        },
        introChar: {
          to: { transform: "translateY(0)", opacity: "1" },
        },
        introEmblem: {
          to: { opacity: "0.95", transform: "scale(1) rotate(0deg)" },
        },
        introGlow: {
          "0%":   { opacity: "0" },
          "60%":  { opacity: "1" },
          "100%": { opacity: "0.6" },
        },
        introRule: {
          to: { width: "min(280px, 60vw)" },
        },
        introTag: {
          to: { opacity: "1" },
        },
        "celtic-spin": {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up":       "fadeUp 1.4s cubic-bezier(0.22,1,0.36,1) 0.3s both",
        "fade-up-delay": "fadeUp 1s cubic-bezier(0.22,1,0.36,1) 1.2s both",
        "scale-x":       "scaleX 0.8s ease-out 0.9s both",
        "fade-in":       "fadeIn 1s ease-out 0.5s both",
        "drop":          "drop 1.8s cubic-bezier(0.22,1,0.36,1) infinite",
        "pulse-brass":   "pulse 1.8s infinite",
        "scrub":         "scrub 6s linear forwards",
        "scard-in":      "scardIn 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        "celtic-idle":   "celtic-spin 12s linear infinite",
        "celtic-fast":   "celtic-spin 3s linear infinite",
      },
      maxWidth: {
        site: "1480px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
