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
        obsidian: {
          50: "#f4f4f5",
          100: "#e4e4e7",
          200: "#c4c4cc",
          300: "#9f9faa",
          400: "#71717f",
          500: "#52525e",
          600: "#3f3f49",
          700: "#2a2a32",
          800: "#1a1a20",
          900: "#0f0f14",
          950: "#08080c",
        },
        accent: {
          DEFAULT: "#8b5cf6",
          light: "#a78bfa",
          dark: "#7c3aed",
          glow: "#c4b5fd",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      backgroundImage: {
        "obsidian-gradient":
          "radial-gradient(ellipse at top, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.08) 0%, transparent 40%)",
        "card-shine":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(139,92,246,0.05) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
