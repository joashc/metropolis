var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: "source-map",
  entry: './src/mount.js',
  worker: {
    output: {
      filename: "metro.worker.js",
      chunkFilename: "[id].metro.worker.js"
    }
  },
  output: {
    path: path.join(__dirname, 'js'),
    filename: 'metro.js',
    publicPath: '/js/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader",
      include: path.join(__dirname, 'css')
    }
    ]
  }
};
