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
        "secondary-bg": "var(--secondary-bg)", 
        "tertiary-bg": "var(--tertiary-bg)", 
        "primary-yellow": "var(--primary-yellow)",
        "primary-red": "var(--primary-red)",
        "primary-green": "var(--primary-green)",
      },
    },
  },
  plugins: [],
} satisfies Config;
