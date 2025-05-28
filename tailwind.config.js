/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    ".index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-[#FECB0A]',
    'bg-[#DAA520]',
    'bg-[#F97316]',
    'bg-[#C05621]',
    'text-[#FECB0A]',
    'text-[#F97316]',
    'border-[#FECB0A]',
    'border-[#F97316]',
    'focus:ring-[#F97316]',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FECB0A',
        primaryDark: '#DAA520',
        secondary: '#F97316',
        secondaryDark: '#C05621',
        accent: '#F3F4F6',
        text: '#1F2937',
      },
    },
  },
  plugins: [],
}