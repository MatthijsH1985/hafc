/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,scss,ts}",
  ],
  theme: {
    colors: {
      white: '#FFF',
      black: '#000',
      red: {
        200: '#fecaca',
        800: '#991b1b'
      },
      blue: {
        500: '#009ee2'
      },
      gray: {
        100: '#e5e5e5',
        800: '#222222'
      }
    },
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
