const path = require('path');

module.exports = {
  mode: process.env.CLIENT_MODE || 'development',
  entry: ['./src/client/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@client': path.resolve(__dirname, 'src/client/'),
      '@engine': path.resolve(__dirname, 'src/engine/'),
      '@models': path.resolve(__dirname, 'src/engine/models/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: [/node_modules/]
      }
    ]
  }
};