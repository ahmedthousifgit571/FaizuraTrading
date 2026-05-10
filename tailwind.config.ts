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
        bg: "var(--color-bg)",
        "bg-mint": "var(--color-bg-mint)",
        surface: "var(--color-surface)",
        "surface-mint": "var(--color-surface-mint)",
        border: "var(--color-border)",
        "border-mint": "var(--color-border-mint)",
        primary: "var(--color-text-primary)",
        muted: "var(--color-text-muted)",
        "on-mint": "var(--color-text-on-mint)",
        "muted-on-mint": "var(--color-text-muted-mint)",
        accent: "var(--color-accent)",
        "accent-warm": "var(--color-accent-warm)",
        "accent-blue": "var(--color-accent-blue)",
        positive: "var(--color-positive)",
        negative: "var(--color-negative)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(56px, 7vw, 96px)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(44px, 5.5vw, 72px)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(32px, 4vw, 48px)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-expo": "cubic-bezier(0.7, 0, 0.84, 0)",
      },
      spacing: {
        section: "clamp(80px, 12vw, 200px)",
      },
    },
  },
  plugins: [],
};
export default config;
