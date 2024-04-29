import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "dark-blue": "#070F2B",
      blue: "#1B1A55",
      "light-blue": "#535C91",
      white: "#FFFFFF",
      black: "#000000",
      yellow: "#FFC94A",
      gunmetal: "#31363F",
      silver: "#EEEEEE",
      "olive-green": "#DAC0A3",
      blush: "#EADBC8",
      cream: "#FEFAF6",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
