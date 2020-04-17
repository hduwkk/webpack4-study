const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css'
    }),
    new HtmlWebpackPlugin({
      title: 'hello',
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico')
    })
  ],
  resolve: {
    extensions:['.js', '.vue']    
  },
  module: {
    rules: [
      
      {
        test: /\.(scss|sass)$/,
        use: [
          'vue-style-loader',
        {
          loader:  MiniCssExtractPlugin.loader,
          options: {
            publicPath: './'
          }
        },
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
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/imgs/[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: ['url-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
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
