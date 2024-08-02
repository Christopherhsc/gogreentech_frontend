/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        "2xs": "376px",
        xs: "480px", 
        "2xl": "1440px", 
        "3xl": "1920px", 
        "4xl": "2560px", 
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
