import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "shimmer-slide": {
          to: {
            transform: "translate(100%, 0)",
          },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
      },
      animation: {
        "shimmer-slide": "shimmer-slide 3s ease-in-out infinite alternate",
        "spin-around": "spin-around 6s infinite linear",
      },

      screens: {
        "max-2560": { max: "2560px" },
        "max-1440": { max: "1440px" },
        "max-1024": { max: "1024px" },
        "max-768": { max: "768px" },
        "max-425": { max: "425px" },
        "max-375": { max: "375px" },
        "max-320": { max: "320px" },
      },
    },
  },
  plugins: [],
};

export default config;
