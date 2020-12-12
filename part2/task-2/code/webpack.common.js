const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: './src/main.js',
  output: {
    filename: '[name].[hash:8].js',
    path: resolve('dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.less'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      // 处理 vue 文件
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 处理 scss 文件
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // 处理 css 样式文件
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // es6 语法转换
      {
        test: /\.js/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
      },
      // eslint 语法检验
      {
        test: /\.js/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      // 静态资源处理
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{ loader: 'url-loader', options: { limit: 10 * 1024, esModule: false } }]
      },
      // 音频文件处理
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: { limit: 10 * 1024 }
      },
      // 字体文件处理
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader', options: { limit: 10 * 1024 }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify('/')
    })
  ]
}
