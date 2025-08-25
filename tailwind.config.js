/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  /* tailwind.config.js */
  theme: {
    extend: {
      colors: {
        brandBlue: "#0073E6", // Primary blue
        secondaryYellow: " #FFCC00",
        darkBlue: "#004386",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
