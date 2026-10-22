/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1F3A',
          light: '#132947',
          dark: '#070F1D',
        },
        teal: {
          brand: '#00B4A6',
          light: '#00D4C4',
          dark: '#008F84',
        },
        gold: {
          brand: '#F0A500',
          light: '#FFB830',
          dark: '#C98A00',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['"Satoshi"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}