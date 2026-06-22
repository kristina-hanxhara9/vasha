import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Mbretëreshë — Plum & Gold
        plum: {
          50: "#F6EEF3",
          100: "#E7CDDD",
          200: "#D3A9C2",
          300: "#BC83A4",
          400: "#9D5C82",
          500: "#6B3A5B",
          600: "#5A3049",
          700: "#47263A",
          800: "#371C30",
          900: "#251320",
        },
        gold: {
          50: "#FBF3E2",
          100: "#F6E6C5",
          200: "#EFD49B",
          300: "#E5BC6E",
          400: "#DCAA55",
          500: "#D6A148",
          600: "#B9852F",
          700: "#946423",
          800: "#5A3F12",
          900: "#3D2A0C",
        },
        // Warm accents (soft, tasteful — echoes the reference designs without going neon)
        rose: { 50: "#FCEEF3", 100: "#F9D9E6", 200: "#F2B6CF", 300: "#E98DB3", 400: "#DD5E92", 500: "#D6488A", 600: "#B83A75" },
        sage: { 50: "#EEF2E9", 100: "#E2E8DA", 500: "#7E9472", 600: "#647A58" },
        coral: { 50: "#FCEDE6", 100: "#FBE0D6", 500: "#E8845E", 600: "#C9663F" },
        lavender: { 50: "#F1EDF8", 100: "#E7E1F3", 500: "#8B72C4", 600: "#6F58A8" },
        sky: { 50: "#EAF3FA", 100: "#DCEBF5", 500: "#4E97C7", 600: "#357CAC" },
        mint: { 50: "#E8F5EE", 100: "#D9EEE2", 500: "#4FAE84", 600: "#3B8E6A" },
        ivory: "#FAF4EC",
        cream: "#FFFDF8",
        charcoal: "#2E2630",
        muted: "#6B6470",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 2px 20px -8px rgba(46, 38, 48, 0.18)",
        card: "0 1px 3px rgba(46,38,48,0.05), 0 10px 30px -16px rgba(46,38,48,0.22)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-9px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 4s ease-in-out infinite",
        "float-slow": "float-slow 5.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
