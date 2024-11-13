/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    //'./pages/**/*.{html,js}',
    //'./components/**/*.{html,js}',
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          100: '#E9D5FF',
          500: '#A78BFA',
        },
      },
      fontFamily: {
        tahoma: ['Tahoma', 'sans-serif'], // Add Tahoma here
        roboto: ['Roboto', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

