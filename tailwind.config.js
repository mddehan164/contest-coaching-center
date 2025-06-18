// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        headerColor: '#b62c10',
        headerColorHover:"#931c03",
        headerTextColor: '#ffffff',
      },
    },
  },
  plugins: [],
}
