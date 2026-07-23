import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#041B5E",
        royal: "#0A2D89",
        gold: "#C89B3C",
        goldDark: "#B8860B",
        warmwhite: "#FCFBF8",
        graylight: "#E9E6DF",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;