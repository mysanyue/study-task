## 说说 application/json 和 application/x-www-form-urlencoded 二者之间的区别。

> 首先 application/json 是传递 json 格式的数据；application/x-www-form-urlencoded 传递的是 key: value 格式的数据并且以 key1=value1&key2=value2 的格式传递在浏览器的 url 地址里。

**区别：**

- application/x-www-form-urlencoded 在发送到服务器之前，所有字符都会进行编码
- application/x-www-form-urlencoded 数据被编码为名称/值对格式
- application/json 不会对数据进行编码
- application/json 数据为 JSON 字符串

## 说一说在前端这块，角色管理你是如何设计的。

1. 通过自定义指令的方式判断相应权限，然后移除或者显示 dom
2. 通过路由前置守卫判断 是否具有相应的页面权限
3. 通过后端配置前端遍历判断显示相应节点

## @vue/cli 跟 vue-cli 相比，@vue/cli 的优势在哪？

@vue/cli3和vue-cli2的区别在于：

  - 创建项目 vue create

  - 启动项目 由npm run dev 改成 npm run serve

  - 移除了配置文件目录 config 和 build 文件夹，如果需要自定义配置，需要自己新建vue.config.js文件

  - 移除了 static 静态资源文件夹，新增 public 文件夹，静态资源转移到public目录中，通过/xx.xx可以直接访问，并且 index.html 移动到 public 中

  - 在 src 文件夹中新增了 views 文件夹，用于分类 视图组件 和 公共组件
 
  - 安装项目时会自动下载node-model文件夹

## 详细讲一讲生产环境下前端项目的自动化部署的流程。

1. 写入自动化构建脚本
2. 本地 build 检查
3. 上传代码到远程服务器
4. 远程服务器自动部署

## 你在开发过程中，遇到过哪些问题，又是怎样解决的？请讲出两点。

1. 上 google、github issues 等。解决问题
2. G6 二次开发，上官网找 文档 api 等。解决问题

## 针对新技术，你是如何过渡到项目中？

1. 先自己写一个demo
2. 等到生态成熟、然后加入到实际项目当中
