const path = require('path');

module.exports = {
  entry: ['./src/client/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
        {
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader'
        }
    ]
  }
};