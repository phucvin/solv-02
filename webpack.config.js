const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/main.js',
    sw: './src/sw.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
