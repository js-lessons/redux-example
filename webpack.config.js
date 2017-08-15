const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: { path: __dirname + '/build/', filename: 'main.js' },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: __dirname + '/src/index.html',
        to: __dirname + '/build/index.html'
      },

      {
        from: __dirname + '/src/main.css',
        to: __dirname + '/build/main.css'
      }
    ])
  ]
}
