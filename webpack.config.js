var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'static');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  devtool: 'eval-source-map',
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: APP_DIR
      }
    ]
  }
};

module.exports = config;
