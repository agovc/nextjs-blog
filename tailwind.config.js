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