## 一、简答题
### 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

**构建流程**

`Webpack` 在启动后，会从 `Entry` 开始，递归解析 `Entry` 依赖的所有 `Module`，每找到一个 `Module`，就会根据 `Module.rules` 里配置的 `Loader` 规则进行相应的转换处理，对 `Module` 进行转换后，再解析出当前 `Module` 依赖的 `Module`，这些 `Module` 会以 `Entry` 为单位进行分组，即为一个 `Chunk`。因此一个 `Chunk`，就是一个 `Entry` 及其所有依赖的 `Module` 合并的结果。最后 `Webpack` 会将所有的 `Chunk` 转换成文件输出 `Output`。在整个构建流程中，`Webpack` 会在恰当的时机执行 `Plugin` 里定义的逻辑，从而完成 `Plugin` 插件的优化任务。

**打包过程**

- 代码及资源文件散落在项目各处，`Webpack` 根据配置，找到入口文件
- 以入口文件作为打包入口，根据出现的 `import、require` 等语句，解析推断出依赖的资源文件，再分别解析
- 每个资源模块对应的依赖，最终形成整个项目文件之间依赖关系的依赖树
- 遍历、递归依赖树，找到每个节点对应的资源文件
- 根据配置文件的 `rules` 属性，找到对应模块的加载器，使用加载器加载相应的模块
- 加载的结果会被并入 `bundle.js`（打包输入文件），从而实现整个项目的打包

### 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

**不同点**

- `Loader`
  * `Loader` 负责资源文件从输入到输出的转换
  * `Loader` 实际上是 `pipe` 管道的概念
  * 对于同一个资源可以一次使用多个 `Loader`

- `Plugin`
  * 增强 `Webpack` 自动化能力
  * `plugin` 解决其他自动化工作
  * 相对于 `Loader`，`Plugin` 拥有更宽的能力范围

**开发思路**

- `Loader`

  在 `module.rules` 数组中进行配置匹匹配指定文件，用于告诉 `Webpack` 在遇到指定文件时使用对应 `Loader` 去加载和转换 开发思路： `Source -> Loader1 -> Loader2 -> Loader3 -> Result(JavaScript Code)` 开发的 `Loader` 将资源加载进来后，中间对资源进行编译，最后要求返回的结果一定是可执行的 `JavaScript` 代码，返回的结果会被并入 `bundle.js`，如果结果不是 `JS` 代码，可能会导致 `bundle.js` 无法运行

- `Plugin`

  在 `plugins` 数组中进行配置 其工作原理是通过 `Webpack` 的钩子机制实现的，要求插件必须是一个函数或者是一个包含 `apply` 方法的对象

  ```js
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')

  // 移除 webapck 打包后的注释
  class MyPlugin {
    apply(compiler) {
      console.log('MyPlugin 启动')

      compiler.hooks.emit.tap('MyPlugin', compilation => {
        // compilation => 可以理解为此次打包的上下文
        for (const name in compilation.assets) {
          // console.log(name)
          // console.log(compilation.assets[name].source())
          if (name.endsWith('.js')) {
            const contents = compilation.assets[name].source()
            const withoutComments = contents.replace(/\/\*\*+\*\//g, '')
            compilation.assets[name] = {
              source: () => withoutComments,
              size: () => withoutComments.length
            }
          }
        }
      })
    }
  }

  module.exports = {
    mode: 'none',
    entry: './src/main.js',
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist'),
    },
    module: {
      rules: [
        { test: /.css$/, use: ['style-loader', 'css-loader'] },
        { test: /.png$/, use: { loader: 'url-loader', options: { limit: 10 * 1024 /* 10 KB */ } } }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      // 用于生成 index.html
      new HtmlWebpackPlugin({
        title: 'Webpack Plugin Sample',
        meta: {
          viewport: 'width=device-width'
        },
        template: './src/index.html'
      }),
      // 用于生成 about.html
      new HtmlWebpackPlugin({
        filename: 'about.html'
      }),
      new CopyWebpackPlugin([
        // 'public/**'
        'public'
      ]),
      new MyPlugin()
    ]
  }
  ```

## 二、编程题

### 1、使用 Webpack 实现 Vue 项目打包任务

