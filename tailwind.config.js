/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
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
        "custom-blue-100": "#BEF5FF",
        "custom-blue-200": "#92EFFF",
        "custom-blue-300": "#32E0FE",
        "custom-blue-400": "#16C2E0",
        "custom-blue-500": "#1065D7",
        "custom-orange-100": "#FF9E9B",
        "custom-orange-200": "#FF5A5A",
        "custom-orange-300": "#F7A06A",
        "custom-pink-100": "#FFCACA",
        "custom-pink-200": "#FF7B7B",
        "custom-pink-300": "#FF7070",
        "custom-yellow-100": "#FFF3C5",
        "custom-yellow-200": "#FFDE5A",
        "custom-red-100": "#FF3130",
        "custom-violet-100": "#D44CE0",
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
