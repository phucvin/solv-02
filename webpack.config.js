const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    sw: './src/sw.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
