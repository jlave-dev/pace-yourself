const path = require('path');

const env = process.env.NODE_ENV;

module.exports = {
  mode: env,
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[path][name].[ext]' },
          },
          {
            loader: 'extract-loader',
            options: { publicPath: '' },
          },
          'html-loader',
        ],
      },
    ],
  },
};
