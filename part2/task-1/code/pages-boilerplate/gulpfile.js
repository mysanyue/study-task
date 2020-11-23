// 实现这个项目的构建任务
const { src, dest, parallel, series, watch } = require('gulp')
// 删除dist目录
const del = require('del')
// 自动加载插件
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
// 开发服务器
const browserSync = require('browser-sync')
const bs = browserSync.create()

// 模板数据
const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/'
        },
        {
          name: 'About',
          link: 'https://weibo.com/'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/myzony'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

// 清除dist目录
const clean = () => {
  return del(['dist', 'temp'])
}

// 样式配置
const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('temp'))
}

// script 配置
const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('temp'))
}

// 静态html文件模板处理
const page = () => {
  return src('src/*html', { base: 'src' })
    .pipe(plugins.swig({ data }))
    .pipe(dest('temp'))
}

// image 处理
const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

// 文字处理
const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

// 模板处理
const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'))
}

// 开发服务器
const serve = () => {
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/*html', page)
  // watch('src/assets/images/**', image)
  // watch('src/assets/fonts/**', font)
  // watch('public/**', extra)
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ], bs.reload)

  bs.init({
    notify: false,
    port: 1080,
    // open: true,
    // files: 'dist/**',
    server: {
      baseDir: ['temp', 'src', 'public'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

// 资源整理
const useref = () => {
  return src('temp/*.html', { base: 'temp' })
    .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
    // html js css
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))

    .pipe(dest('dist'))
}
// eslint 语法校验
const lint = () => {
  return src(['**/*.js', '!node_modules/**'])
    .pipe(plugins.eslint({
      rules: {
        'my-custom-rule': 1,
        'strict': 2
      },
      globals: [
        'jQuery',
        '$'
      ],
      envs: [
        'browser'
      ]
    }))
    .pipe(plugins.eslint.formatEach('compact', process.stderr));
}

const compile = parallel(style, script, page)

const build = series(
  clean,
  parallel(
    series(compile, useref),
    image,
    font,
    extra
  )
)

const start = series(compile, lint, serve)

const deploy = series(build)

module.exports = {
  clean,
  lint,
  serve,
  build,
  start,
  deploy
}
