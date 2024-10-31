/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    maxWidth: {
      '1/2': '50%',
    },
    extend: {
      colors: {
        'white':'#f1f5f9',
        'pursian-blue':'#3B5BA5',
        'orange':'#E87A5D',
      }
    },
  },
  plugins: [],
}
