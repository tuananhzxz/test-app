/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#f50057",
        "secondary-color": "#3f51b5"
      }
    },
  },
  plugins: [],
}