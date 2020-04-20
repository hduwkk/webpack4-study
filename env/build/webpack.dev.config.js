const webpackBaseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')

const DevConfig = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    disableHostCheck: true
  }
}

module.exports = merge(webpackBaseConfig, DevConfig)
