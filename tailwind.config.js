/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kk: {
          yellow: "#FFEBAA",
          blue: "#CDEBFF",
          peach: "#FFD8CC",
          mint: "#D9FFEF",
          text: "#4A4A4A",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
