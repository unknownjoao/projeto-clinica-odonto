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
        "primary-dark-blue": "#0A4378",
        "primary-blue": "#1971C2",
        "primary-light-blue": "#D0EBFF",
        "primary-beige": "#F0F9FF",
        "hover-blue": "#1d4ed8",
        "gray-headline": "#061800",
        "gray-paragraph": "#384633",
        "off-white": "#E3E3E3",
      },
    },
  },
  padding: {
    custom: "10rem",
  },
  plugins: [],
} satisfies Config;
