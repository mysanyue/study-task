# Vue.js 3.0 Composition APIs 及 3.0 原理剖析

## 1、Vue 3.0 性能提升主要是通过哪几方面体现的？

- 响应式系统升级
  - `vue.js 2.x` 中响应式系统的核心是 `defineProperty`
  - `vue.js 3.0` 中使用 `Proxy` 对象重写响应式系统
    - 可以监听动态新增的属性
    - 可以监听删除的属性
    - 可以监听数组的索引和 `length` 属性
- 编译优化
  - `vue.js 2.x` 中通过标记静态根节点，优化 `diff` 的过程
  - `vue.js 3.0` 中标记和提升所有的静态根节点，`diff` 的时候只需要对比动态节点内容
    - `Fragments` (升级 `vetur` 插件)
    - 静态提升
    - `Patch flag`
    - 缓存事件处理函数
- 源代码体积优化
  - `vue.js 3.0` 中移除了一些不常用的 `API`
    例如：`inline-template` `filter` 等
  - `Tree-shaking`

## 2、Vue 3.0 所采用的 Composition Api 与 Vue 2.x 使用的 Options Api 有什么区别？

**Options API**
`vue2` 中如何组织代码的：我们会在一个vue文件中 `data`，`methods`，`computed`，`watch` 中定义属性和方法，共同处理页面逻辑

缺点：一个功能往往需要在不同的 `vue` 配置项中定义属性和方法，比较分散，项目小还好，清晰明了，但是项目大了后，一 `methods` 中可能包含很多个方法，往往分不清哪个方法对应着哪个功能

优点：新手入门会比较简单

**Composition API**

在 `vue3 Composition API` 中，代码是根据逻辑功能来组织的，一个功能的所有 `api` 会放在一起（高内聚，低耦合），这样做，即时项目很大，功能很多，我们都能快速的定位到这个功能所用到的所有 `API`，而不像 `vue2 Options API` 中一个功能所用到的 `API` 都是分散的，需要改动，到处找 `API` 的过程是很费时间的

缺点：学习成本可能会增加，以前的思维方式也要转变

优点：`Composition API` 是根据逻辑相关性组织代码的，提高可读性和可维护性，基于函数组合的 `API` 更好的重用逻辑代码（在`vue2 Options API` 中通过 `Mixins` 重用逻辑代码，容易发生命名冲突且关系不清）


## 3、Proxy 相对于 Object.defineProperty 有哪些优点？

**Proxy 的优势如下：**
- `Proxy` 可以直接监听对象而非属性；
- `Proxy` 可以直接监听数组的变化；
- `Proxy` 有多达 `13` 种拦截方法,不限于 `apply`、`ownKeys`、`deleteProperty`、`has` 等等是 `Object.defineProperty` 不具备的；
- `Proxy` 返回的是一个新对象,我们可以只操作新的对象达到目的,而 `Object.defineProperty` 只能遍历对象属性直接修改；
- `Proxy` 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

**Object.defineProperty 的优势如下:**
兼容性好，支持 `IE9`，而 `Proxy` 的存在浏览器兼容性问题,而且无法用 `polyfill` 磨平，因此 `Vue` 的作者才声明需要等到下个大版本( 3.0 )才能用 `Proxy` 重写。


## 4、Vue 3.0 在编译方面有哪些优化？

- `vue.js 2.x` 中通过标记静态根节点，优化 `diff` 的过程
  - `vue.js 3.0` 中标记和提升所有的静态根节点，`diff` 的时候只需要对比动态节点内容
    - `Fragments` (升级 `vetur` 插件)
    - 静态提升
    - `Patch flag`
    - 缓存事件处理函数

## 5、Vue.js 3.0 响应式系统的实现原理？

**vue3.0 建立响应式的方法有两种：**

第一个就是运用 `composition-api` 中的 `reactive` 直接构建响应式，`composition-api` 的出现我们可以在 `.vue` 文件中，直接用 `setup()` 函数来处理之前的大部分逻辑，也就是说我们没有必要在 `export default{ }` 中在声明生命周期 ， `data(){}` 函数，`watch{}` , `computed{}` 等 ，取而代之的是我们在 `setup` 函数中，用 `vue3.0 reactive watch` 生命周期 `api` 来到达同样的效果，这样就像 `react-hooks` 一样提升代码的复用率，逻辑性更强。

第二个就是用传统的 `data(){ return{} }` 形式 ,`vue3.0` 没有放弃对 `vue2.0` 写法的支持，而是对 `vue2.0` 的写法是完全兼容的，提供了 `applyOptions` 来处理 `options` 形式的 `vue` 组件。但是 `options` 里面的 `data` , `watch` , `computed` 等处理逻辑，还是用了 `composition-api` 中的 `API` 对应处理。

**vue3.0可以根据业务需求引进不同的API方法:**

- reactive
  建立响应式 `reactive`，返回 `proxy` 对象，这个 `reactive` 可以深层次递归，也就是如果发现展开的属性值是引用类型的而且被引用，还会用 `reactive` 递归处理。而且属性是可以被修改的。
- shallowReactive
  建立响应式 `shallowReactive`，返回 `proxy` 对象。和 `reactive` 的区别是只建立一层的响应式，也就是说如果发现展开属性是引用类型也不会递归。
- readonly 
  返回的 `proxy` 处理的对象，可以展开递归处理，但是属性是只读的，不能修改。可以做 `props` 传递给子组件使用。
- shallowReadonly
  返回经过处理的 `proxy` 对象，但是建立响应式属性是只读的，不展开引用也不递归转换，可以这用于为有状态组件创建 `props` 代理对象。

**Reactive**

- 1、reactive:
接收一个参数，判断这参数是否是对象。不是对象则直接返回这个参数，不做响应式处理创建拦截器对象 `handler`, 设置 `get/set/deleteProperty`

**get：**

收集依赖（`track`）
返回当前 `key` 的值。
如果当前 `key` 的值是对象，则为当前 `key` 的对象创建拦截器 handler, 设置 `get/set/deleteProperty`
如果当前的 `key` 的值不是对象，则返回当前 `key` 的值

**set：**

设置的新值和老值不相等时，更新为新值，并触发更新（`trigger`） `deleteProperty`
当前对象有这个 `key` 的时候，删除这个 `key` 并触发更新（`trigger`） 返回 `Proxy` 对象

- 2、effect: 接收一个函数作为参数。作用是：访问响应式对象属性时去收集依赖

- 3、track:
  - 接收两个参数：`target` 和 `key`
  - 如果没有 `activeEffect`，则说明没有创建 `effect` 依赖
  - 如果有 `activeEffect`，则去判断 `WeakMap` 集合中是否有 `target` 属性， `WeakMap` 集合中没有 `target` 属性，则 `set(target, (depsMap = new Map()))`
  - `WeakMap` 集合中有 `target` 属性，则判断 `target` 属性的 `map` 值的 `depsMap` 中是否有 `key` 属性 `depsMap` 中没有 `key` 属性，则 `set(key, (dep = new Set()))` `depsMap` 中有 `key` 属性，则添加这个 `activeEffect`

- 4、trigger:
  - 判断 `WeakMap` 中是否有 `target` 属性
  - `WeakMap` 中没有 `target` 属性，则没有 `target` 相应的依赖
  - `WeakMap` 中有 `target` 属性，则判断 `target` 属性的 `map` 值中是否有 `key` 属性，有的话循环触发收集的 `effect()`
