// @type { import('tailwindcss').Config }
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playwrite: ['Playwrite CU', 'cursive']
      },
      height: {
        "85v": "85vh"
      }
    }
  },
  plugins: [],
}