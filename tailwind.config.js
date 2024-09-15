const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "custom": {
          extend: "light",
          colors: {
            background: "#0D001A",
            foreground: "#ffffff",
            primary: "#488E53",
            secondary: "#D2F4D3",
            error: "#FF5656",
            success: "#488E53",
          },
         
        },
      },
    }),
  ],
};