import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Make sure this is set to 'class'
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Use custom variables
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
