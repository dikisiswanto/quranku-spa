module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: true,
    content: ['./src/**/*.js', './src/*.js'],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
