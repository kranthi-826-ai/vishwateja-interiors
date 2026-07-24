import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#041B5E",
        royal: "#0A2D89",
        gold: "#D4AF37",
        goldDark: "#e0bb5bff",
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