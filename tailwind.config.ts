import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#edf4ff",
          100: "#d7e8ff",
          200: "#b6d5ff",
          300: "#84b8ff",
          400: "#4c92ff",
          500: "#226bff",
          600: "#124fff",
          700: "#0f3ee8",
          800: "#1337bc",
          900: "#173693"
        }
      }
    }
  },
  plugins: []
};

export default config;
