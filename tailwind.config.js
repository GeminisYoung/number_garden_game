/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'garden-green': '#4ade80',
        'garden-brown': '#92400e',
        'garden-sky': '#7dd3fc',
      },
    },
  },
  plugins: [],
}
