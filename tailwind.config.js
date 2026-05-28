/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cabinet Grotesk"', 'sans-serif'],
        body: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#0C0C18',
          secondary: '#1A1A2E',
          text: '#283338',
          muted: '#6B6768',
          surface: '#F8F7F4',
          accent: '#A7636D',
        }
      }
    }
  },
  plugins: [],
}
