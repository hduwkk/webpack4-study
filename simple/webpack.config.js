const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'hello',
      template: path.resolve(__dirname, './src/index.html')
    }),
    new CleanWebpackPlugin()
  ],
  resolveLoader: {
    modules: ['node_modules', './loader/']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 30000, name: '[path][name]_[hash:8].[ext]' }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: ['url-loader']
      },
      {
        test: /\.json$/,
        loaders: 'json-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 1
    }
  }
}
