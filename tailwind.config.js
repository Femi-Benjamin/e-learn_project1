/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#082183", // Deep Blue
        secondary: "#4EC5F8", // Light Blue
        accent: "#FFD700", // Gold/Yellow for highlights
        dark: "#1A1A1A",
        light: "#F3F4F6",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
