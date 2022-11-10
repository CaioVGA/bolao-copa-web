/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },

      backgroundImage: {
        app: 'url(/app-bg-2.png)',
      },

      colors:{
        softgreen: {
          500: '#129E57',
        },

        red: {
          300: '#B11544',
          600: '#8B1538',
          700: '#510D21',
        },

        yellow: {
          500: '#F7DD43',
          700: '#E5CD3D',
        },

        gray: {
          100: '#E1E1E6',
          300: '#8D8D99',
          600: '#323238',
          800: '#202024',
          900: '#121214',
        },
      }
    },
  },
  plugins: [],
}
