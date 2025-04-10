/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'sm-md': '672px',
        'md-lg': '996px',
        'lg-xl': '1200px',
        'xl-2xl': '1405px',
        '2xl-3xl': '1600px',
        '2.6xl': '1740px'
       
      },
      colors: {
        secondary: '#ff5a3c'
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

