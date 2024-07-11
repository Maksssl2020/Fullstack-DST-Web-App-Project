import HeaderDiagonallyRainbow from "./";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      lato: ["Lato", "sans-serif"],
    },

    extend: {
      colors: {
        "custom-gray-100": "#F4F4F4",
        "custom-gray-200": "#E7E7E7",
        "custom-gray-300": "#D0D0D0",
        "custom-gray-400": "#7A7A7A",
        "custom-blue-100": "#92EFFF",
        "custom-blue-200": "#32E0FE",
        "custom-blue-300": "#1065D7",
        "custom-orange-100": "#FF9E9B",
        "custom-orange-200": "#FF5A5A",
        "custom-pink-100": "#FFCACA",
        "custom-pink-200": "#FF7B7B",
      },
      backgroundImage: {
        "header-background": `url(/public/assets/images/header_rainbow_background.png)`,
        "drawer-background": `url(/public/assets/images/drawer_searchbar_background.png)`,
        "instagram-post-background":
          "url('/public/assets/images/test_insta_post_bg.png')",
      },
    },
  },
  plugins: [],
};