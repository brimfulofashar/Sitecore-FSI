/** @type {import('tailwindcss').Config} */
module.exports = {
  // Avoid clashing with Bootstrap; all utilities are prefixed with tm-
  prefix: 'tm-',
  // Raise specificity so Bootstrap layout utilities do not override Split Hero
  important: '.tm-split-hero',
  corePlugins: {
    preflight: false,
  },
  content: ['./src/components/TexasMutual/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        'split-hero': 'min(85vh, 640px)',
      },
    },
  },
  plugins: [],
};
