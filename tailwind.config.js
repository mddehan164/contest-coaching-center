// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        headerColor: "#50ccff",
        headerColorHover: "#181A20",
        headerTextColor: "#ffffff",
        contestRed: "#ff0522",
        contestLight: "#ebf9ff",
        main: {
          black: "#181A20",
          100: "#EFF7FF",
          200: "#DAEDFF",
          500: "#4FAAFD",
        },
        text: {
          200: "#D1D1D1",
          600: "#888",
          700: "#4F4F4F",
          900: "#1C1C1C",
          disabled: "#D0D0D0",
        },
        neutral: {
          200: "#EEE",
          300: "#D4D4D4",
          500: "#9E9E9E",
          700: "#616161",
        },
        gray: {
          300: "#F7F7F7",
        },
        status: {
          error: "#FF6B6B",
          alert: "#FECA57",
        },
      },
      animation: {
        "fade-in-out": "fadeInOut 2s ease-in-out infinite",
      },
      keyframes: {
        fadeInOut: {
          "0%, 100%": { opacity: 0 },
          "50%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
