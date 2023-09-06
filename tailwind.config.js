/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      container: {
        padding: {
          DEFAULT: '3rem',
          sm: '4rem',
          lg: '6rem',
          xl: '8rem',
        },
      },
      articleContainer: {
        padding: {
          DEFAULT: '4rem',
          sm: '6rem',
          lg: '8rem',
          xl: '12rem',
        },
      },
      keyframes: {
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'heartbeat': {
          '0%': { transform: 'scale(1)' },
          '10%': { transform: 'scale(1.02)' },
          '20%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.05)' },
          '40%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.09)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out",
        "heartbeat": "heartbeat 2s infinite",
      },
    },
    plugins: [],
    extend: {
      typography: {
        'big-first-paragraph': {
          css: {
            '& p:first-of-type::first-letter': {
              fontSize: '2em', // Adjust the font size as needed
            },
          },
        },
      },
    },
  };