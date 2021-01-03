/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('tailwindcss'),
    purgecss({
      content: [
        './src/**/*.js',
        './src/*.js',
        // etc.
      ],
    }),
  ],
};
