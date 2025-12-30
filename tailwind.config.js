/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#080B12',
          white: '#FFFFFF',
          lime: '#DFFE35',
          red: '#EB4B5B',
          gray: {
            light: '#F3F4F6',
            border: '#E5E7EB',
            text: '#9CA3AF',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '20px',
        '2xl': '28px',
        'full': '100px',
      },
    },
  },
  plugins: [],
}



