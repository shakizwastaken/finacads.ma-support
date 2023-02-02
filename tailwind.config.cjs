/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#17549F",
        accent: "#3D8D89",
        light: "#E0F1F0",
        dark: "#334B49",
      },
    },
  },
  plugins: [],
};
