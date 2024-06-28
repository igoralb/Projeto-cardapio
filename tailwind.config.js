// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {

      backgroundImage:{
        "home":"url('/assets/bg.png')"
      }
    },fontFamily:{
      "sans": ['Noto Sans Gujarati', 'sans-serif']

    }
  },
  plugins: [],
}
