const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const getPackageJson = require('./scripts/getPackageJson');

const {
  version,
  name,
  license,
  repository,
  author,
} = getPackageJson('version', 'name', 'license', 'repository', 'author');

const banner = `
  ${name} v${version}
  ${repository.url}

  Copyright (c) ${author.replace(/ *\<[^)]*\> */g, " ")} and project contributors.

  This source code is licensed under the ${license} license found in the
  LICENSE file in the root directory of this source tree.
`;

module.exports = {
  mode: "production",
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'injir.js',
    path: path.resolve(__dirname, 'build'),
    library: 'Injir',
    libraryTarget: 'umd',
    clean: true
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: false
    })],
  },
  externals: {
    jquery: 'jQuery',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        use: ['url-loader'],
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ]
};