/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        'a4': '210mm',
      },
      height: {
        'a4': '297mm',
      }
    },
  },
  plugins: [],
}

