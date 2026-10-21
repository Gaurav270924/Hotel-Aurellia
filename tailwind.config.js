/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#e5cb9f',
          DEFAULT: '#c5a880',
          dark: '#8c7352',
        },
        noir: {
          900: '#08090a',
          800: '#0c0d0f',
          700: '#121316',
          600: '#1a1c22',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      scale: {
        '108': '1.08',
      },
    },
  },
  plugins: [],
}
