# 项目说明文档

## 一、项目启动

1. 安装依赖包 `yarn install`
2. 启动项目 `yarn start`

## 二、构建工具

> 构建流程主要使用 Gulp 构建工具构建

## 三、依赖插件

- @babel/core
- @babel/preset-env
- browser-sync
- del
- gulp
- gulp-babel
- gulp-clean-css
- gulp-eslint
- gulp-htmlmin
- gulp-if
- gulp-imagemin
- gulp-load-plugins
- gulp-sass
- gulp-swig
- gulp-uglify
- gulp-useref

> ## 四、打包发布

> - `yarn clean` 清除dist目录
> - `yarn build` 打包项目
> - `yarn lint` eslint语法校验
> - `yarn serve` 启动服务器
> - `yarn start` 启动本地开发运服务器

## 五、项目目录

```
└── my-awesome-pages ································· project root
   ├─ public ········································· static folder
   │  └─ favicon.ico ································· static file (unprocessed)
   ├─ src ············································ source folder
   │  ├─ assets ······································ assets folder
   │  │  ├─ fonts ···································· fonts folder
   │  │  │  └─ pages.ttf ····························· font file (imagemin)
   │  │  ├─ images ··································· images folder
   │  │  │  └─ logo.png ······························ image file (imagemin)
   │  │  ├─ scripts ·································· scripts folder
   │  │  │  └─ main.js ······························· script file (babel / uglify)
   │  │  └─ styles ··································· styles folder
   │  │     ├─ _variables.scss ······················· partial sass file (dont output)
   │  │     └─ main.scss ····························· entry scss file (scss / postcss)
   │  ├─ layouts ····································· layouts folder
   │  │  └─ basic.html ······························· layout file (dont output)
   │  ├─ partials ···································· partials folder
   │  │  └─ header.html ······························ partial file (dont output)
   │  ├─ about.html ·································· page file (use layout & partials)
   │  └─ index.html ·································· page file (use layout & partials)
   ├─ .csscomb.json ·································· csscomb config file
   ├─ .editorconfig ·································· editor config file
   ├─ .gitignore ····································· git ignore file
   ├─ .travis.yml ···································· travis ci config file
   ├─ CHANGELOG.md ··································· repo changelog
   ├─ LICENSE ········································ repo license
   ├─ README.md ······································ repo readme
   ├─ gulpfile.js ···································· gulp tasks file
   ├─ package.json ··································· package file
   └─ yarn.lock ······································ yarn lock file
```
