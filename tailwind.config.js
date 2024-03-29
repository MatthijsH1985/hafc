/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,scss,ts}",
  ],
  theme: {
    darkMode: '',
    colors: {
      white: '#FFF',
      black: '#000',
      gold: '#FFD700',
      silver: '#C0C0C0',
      bronze: '#CD7F32',
      red: {
        200: '#fecaca',
        500: '#E10036',
        800: '#991b1b'
      },
      orange: {
        200: '#fff3cd',
        800: '#856404'
      },
      blue: {
        100: '#e2f2ff',
        500: '#009ee2',
        600: '#0086BEFF'
      },
      gray: {
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#dddddd',
        400: '#aaaaaa',
        700: '#333333',
        800: '#222222',
        900: '#151515',
        1000: '#343a40'
      },
      green: {
        100: '#c2eab0',
        500: '#00FF00',
        800: '#247f00'
      },
      yellow: {
        100: '#FFF0B7FF',
        800: '#d08100'
      }
    },
    extend: {
      fontFamily: {
        'sans': ['Lato', 'Avenir', 'Verdana']
      },
      fontSize: {
        sm: '0.85rem'
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}
