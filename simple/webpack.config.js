const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 30000, name: '[path][name]_[hash:8].[ext]' }
          }
        ]
      }
    ]
  }
}
