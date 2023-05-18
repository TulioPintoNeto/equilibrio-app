/** @type {import('tailwindcss').Config} */

const forms = require('@tailwindcss/forms');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    forms,
  ],
};
