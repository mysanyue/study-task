# vue-app-base

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性

## 项目说明

> 该项目为使用 webpack 搭建编译 Vue 项目

**思路**

### 一、安装相关依赖包

1. `babel`
2. `vue` 相关
3. `plugin` 相关插件
4. 相关 `loader`
5. `eslint`
6. `webpack`
7. ...

```js
"devDependencies": {
  "@babel/core": "^7.12.10",
  "@babel/preset-env": "^7.12.10",
  "@vue/cli-plugin-babel": "^4.5.9",
  "babel-eslint": "^10.1.0",
  "babel-loader": "^8.2.2",
  "clean-webpack-plugin": "^3.0.0",
  "copy-webpack-plugin": "6.0.2",
  "css-loader": "^5.0.1",
  "eslint": "^7.15.0",
  "eslint-config-standard": "^16.0.2",
  "eslint-loader": "^4.0.2",
  "eslint-plugin-import": "^2.22.1",
  "eslint-plugin-node": "^11.1.0",
  "eslint-plugin-promise": "^4.2.1",
  "eslint-plugin-standard": "^5.0.0",
  "eslint-plugin-vue": "^7.2.0",
  "extract-text-webpack-plugin": "^3.0.2",
  "file-loader": "^6.2.0",
  "html-loader": "^1.3.2",
  "html-webpack-plugin": "^4.5.0",
  "mini-css-extract-plugin": "^1.3.3",
  "node-sass": "^5.0.0",
  "optimize-css-assets-webpack-plugin": "^5.0.4",
  "postcss-loader": "^4.1.0",
  "sass-loader": "^10.1.0",
  "style-loader": "^2.0.0",
  "uglifyjs-webpack-plugin": "^2.2.0",
  "url-loader": "^4.1.1",
  "vue-loader": "^15.9.5",
  "vue-style-loader": "^4.1.2",
  "vue-template-compiler": "^2.6.12",
  "webpack": "4.43.0",
  "webpack-cli": "3.3.12",
  "webpack-dev-server": "3.11.0",
  "webpack-merge": "4.2.2"
}
```

### 二、webpack.common.js

```js
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
```

### 三、webpack.dev.js

```js
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
```

### 四、webpack.prod.js

```js
const common = require('./webpack.common')
const merge = require('webpack-merge')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'scss-loader'
        ]
      }]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    sideEffects: true, // 没有用到的模块会被去掉
    usedExports: true, // 标记不使用的代码
    concatenateModules: true, // 尽可能将模块合并，webpack3添加的
    minimize: true // 去除标记的代码
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new OptimizeCSSPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'vue-webpack',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(__dirname, 'public/favicon.ico') },
      ],
    }),
    new UglifyJsPlugin({
      exclude: /node_modules/
    }),
  ]
})
```

### 五、运行项目

- `yarn install` 安装依赖
- `yarn serve` 运行开发环境
- `yarn dev` 打包开发环境
- `yarn build` 打包生产坏境
- `yarn eslint` 语法校验
