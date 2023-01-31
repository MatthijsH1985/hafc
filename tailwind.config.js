/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,scss,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Lato', 'Avenir', 'Verdana']
      },
      fontSize: {
        sm: '0.8rem'
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
