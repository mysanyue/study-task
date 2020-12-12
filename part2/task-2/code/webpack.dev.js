const common = require('./webpack.common')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hotOnly: true,
    open: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'vue-webpack'
    })
  ]
})
