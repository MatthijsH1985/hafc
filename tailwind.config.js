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
        sm: '0.8rem',
        base: '1.2rem',
      }
    },
  },
  plugins: []
}
