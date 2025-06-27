import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        borderColor: "var(--border-color)",
        // BLACK THEME
        colorHover: "var(--color-hover)",
        primaryText: "var(--primary-text)",
      },
      keyframes: {
        "scale-up": {
          "0%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.03)" },
          "50%": { transform: "scale(1.05)" },
          "75%": { transform: "scale(1.03)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "scale-up": "scale-up 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      screens: {
        "3xl": "1920px",
      },
      boxShadow: {
        glow: "0 0 2px 1px var(--glow-inner), 0 0 6px 1px var(--glow-outer)",
      },
    },
  },
  plugins: [],
} satisfies Config;
