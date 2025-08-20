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
        peach: "#f6d6c8",
        beige: "#f5f2ef",
        rosegold: "#d4a373",
        charcoal: "#222222",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
