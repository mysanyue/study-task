let _Vue = null
export default class VueRouter {
  static install(Vue) {

    // 1. 判断当前插件是否已经被安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 2. 把 Vue构造函数记录到全局变量
    _Vue = Vue
    // 3. 把创建 Vue 实例时候传入的 router 对象注入到 Vue实例上
    // _Vue.prototype.$router = this.$router.VueRouter
    // 混入
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  constructor(options) {
    this.options = options
    this.routeMap = {}
    this.data = _Vue.observable({
      current: '#/'
    })
  }

  // 初始化
  init() {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  // 遍历所有的路由规则，把路由规则解析成键值对的形式 存储到 routerMap 中
  createRouteMap() {
    this.options.routes.forEach(route => {
      this.routeMap['#' + route.path] = route.component
    })
  }

  // 创建 router-link
  initComponents(Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render(h) {
        return h('a', {
          attrs: {
            href: '#' + this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandler(e) {
          history.pushState({}, '', '#' + this.to)
          this.$router.data.current = '#' + this.to
          e.preventDefault()
        }
      }
    })

    const self = this
    Vue.component('router-view', {
      render(h) {
        // 返回对应的路由，如果找不到就返回首页
        const cm = self.routeMap[self.data.current] || self.routeMap['#/default']
        return h(cm)
      }
    })
  }

  initEvent() {
    // 判断当前url中是否有 #
    if (!location.hash) {
      location.hash = '#/'
    }

    window.addEventListener('popstate', () => {
      this.data.current = location.hash.substr(1)
    })
  }
}