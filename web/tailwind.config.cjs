/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        cream: " #fdf0d5",
        blueberry: "#3a86ff",
        purple: "#8338ec",
        fuchsia: "#ff006e",
        mustard: "#ffbe0b",
        fire: "#fb5607",
      },
    },
  },
  plugins: [],
};
