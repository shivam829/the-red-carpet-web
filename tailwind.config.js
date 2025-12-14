/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        redcarpet: "#8B0000",
        gold: "#D4AF37",
        dark: "#0F0F0F"
      }
    }
  },
  plugins: []
};
