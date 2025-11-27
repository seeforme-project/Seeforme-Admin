/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {}, // This is the new plugin for v4
    autoprefixer: {},
  },
};

export default config;
