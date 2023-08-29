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
    },
    plugins: [],
  };