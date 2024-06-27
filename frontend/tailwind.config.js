/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "rgb(195, 205, 200)",
        secondPrimaryColor: "rgb(74, 105, 89)",
        accentColor: "rgb(13,55,33)",
        deleteButtonColorPrim: "#ff857d",
        deleteButtonColorSec: "#b0362e",
        editButtonColorPrim: "#bcffb0",
        editButtonColorSec: "#21b007"
      }
    },
  },
  plugins: [],
}
