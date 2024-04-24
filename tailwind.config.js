/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "home": "url('/assets/bg.png')",
        "fundo": "url('/assets/hamb-1.pnh)"
      }
    },
  },
  plugins: [],
}

