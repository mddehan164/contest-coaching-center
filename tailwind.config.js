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
        headerColor: '#50ccff',
        headerColorHover:"#082a6e",
        headerTextColor: '#ffffff',
        contestRed:"#ff0522",
      },
    },
  },
  plugins: [],
}
