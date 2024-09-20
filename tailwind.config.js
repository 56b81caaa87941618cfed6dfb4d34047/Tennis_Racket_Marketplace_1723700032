/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': {
          500: '#8B5CF6',
          700: '#6D28D9',
        },
      },
    },
  },
  plugins: [],
}