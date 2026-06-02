import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {
      // Pin scan root so utilities are generated when PostCSS runs inside Next/webpack.
      base: projectRoot,
    },
  },
};

export default config;
