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
        brandBlue: "#007BFF", // Primary blue
        brandBlueDark: "#1A73E8", // Slightly darker sh
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
