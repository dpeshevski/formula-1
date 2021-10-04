const webpack = require('@cypress/webpack-preprocessor');

module.exports = webpack({
  webpackOptions: {
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [{
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }]
    }
  }
})
