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
        app: 'url(/app-bg.png)',
      },

      colors:{
        
        red: {
          300: '#B11544',
          600: '#8B1538',
          700: '#510D21',
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
