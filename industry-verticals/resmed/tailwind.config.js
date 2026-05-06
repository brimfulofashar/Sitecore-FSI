/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    // Avoid clashes with Bootstrap resets already loaded in main.scss
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
