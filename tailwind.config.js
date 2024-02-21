/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width:{
        '500': "550px"
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}

