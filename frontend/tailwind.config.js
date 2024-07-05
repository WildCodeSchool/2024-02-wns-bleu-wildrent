/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue:  "#1A265B",
        lightBlue: "#50A5B1",
        orange: "#F0610D",
        beige: "#FFF5ED",
        black: "black"
      }
    },
  },
  plugins: [],
}