/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2b7a0b",
          dark: "#1f5a08",
          light: "#44a516"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.06)"
      },
      borderRadius: {
        '2xl': '1rem'
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
