/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        xs: "480px", // Custom small screen size
        "2xl": "1440px", // Custom extra large screen size
        "3xl": "1920px", // Custom extra extra large screen size
        "4xl": "2560px", // Custom extra extra extra large screen size
      },
      colors: {
        "primary-color": "#8fbf3c",
        "secondary-color": "#0c78be",
        "detail-color": "#4372b8",
      },
    },
  },
  plugins: [],
};
