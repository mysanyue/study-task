## 一、简答题

### 1、请简述 Vue 首次渲染的过程。

- 首次渲染之前，首先进行 `Vue` 初始化，初始化实例成员和静态成员
- 初始化完成后调用构造函数
- 在构造函数中调用 `_init()` 方法，整个方法相当于整个 `Vue` 的入口
- 在 `_init()` 方法中，最终调用了 `$mount()` 方法
  - `src\platforms\web\entry-runtime-with-compiler.js` 把模板编译成 `render` 函数
  - 是否传入了 `render` 选项，如果没有传递 `render`，会获取 `template` 选项，如果 `template` 也没有的话会把 `el` 中的内容作为模板，然后把模板变异成 `render` 函数
  - 通过 `compileToFunctions()` 生成 `render()` 渲染函数
  - 编译好之后会把 `options.render = render`，把 `render` 存入到 `options` 选项中
- 接下来调用 `runtime` 中的 `$mount()` 方法
  - `src\platforms\web\runtime\index.js`
  - 在这个方法中首相重新获取 `el`，因为如果是运行时版本的话，是不会执行这个入口的
- 接下来调用 `mountComponet(this, el)`
  - `src\core\instance\lifecycle.js`
  - 首先判断是否有 `render` 选项，如果没有但是传入了模板，并且当前是开发环境的话会发送警告
  - 触发 `beforeMount`
  - 定义 `updateComponet`
    - 调用 `_update()`、`_render()`、`_update()`，`render` 作用是生成虚拟 `DOM`，`update` 作用是将虚拟 `DOM` 转化为真实 `DOM` 并挂载到页面上
  - 创建 `Watcher` 实例
    - 传递了 `updateComponet()` 函数，最终实在 `watcher` 内部调用的
    - 调用 `watcher` 的 `get()` 方法
  - 触发 `mounted` 钩子函数
  - 最终 `return vm`
- `watcher.get()`
  - 创建完 `watcher` 会调用一次 `get`
  - 调用 `updateComponent()`
  - 调用 `vm._render()` 创建 `VNode`
    - 调用 `render.call(vm.renderProxy, vm.$createElement)`
    - 调用实例化时 `Vue` 传入的 `render()`
    - 或者编译 `template` 生成的 `render()`
    - 返回 `VNode`
  - 调用 `vm._update(vnode, ...)`
    - 调用 `vm.__patch__(vm.$el.vnode)` 挂载真实 `DOM`
    - 记录 `vm.$el`

### 2、请简述 Vue 响应式原理。

- 整个响应式是从 `Vue` 实例的 `init()` 方法中开始的，在 `init` 中首先调用 `initState()` 初始化状态；然后调用 `initData()` 把 `data` 属性注入到 `Vue` 实例上；然后再调用 `observe()` 把 `data` 对象转换为响应式对象
- `observe(value)`
  - `src/core/observer/index.js`
  - 判断 `value` 是否是对象，如果不是对象直接返回
  - 判断 `value` 对象是是否有 `__ob__`, 如果有直接返回
  - 如果没有，创建 `observer` 对象
  - 返回 observer 对象
- `Observer`
  - `src/core/observer/index.js`
  - 给 `value` 对象定义不可枚举的 `__ob__` 属性，记录当前的 `observer` 对象
  - 数组的响应式处理
  - 对象的响应式处理，调用 `walk` 方法
- `defineReactive`
  - `src/core/observer/index.js`
  - 为每个属性创建 `dep` 对象
  - 如果当前属性的值是对象，调用 `observe`
  - 定义 `getter`
    - 收集依赖
    - 返回属性值
  - 定义 `setter`
    - 保存新值
    - 如果新值是对象，调用 `observe`
    - 派发更新（发送通知）， 调用 `dep.nofity()`
- 依赖收集
  - 在 `watcher` 对象的 `get` 方法中调用 `pushTarget` 记录 `Dep.target` 属性
  - 访问 `data` 中的成员的时候收集依赖，`defineReactive` 的 `getter` 中收集依赖
  - 把属性对应的 `watcher` 对象添加到 `dep` 的 `subs` 数组中
  - 给 `childOb` 收集依赖，目的是给子对象添加和删除成员时发送通知
- `wacher`
  - `dep.notify()` 在调用 `watcher` 对象的 `update()` 方法
  - `queueWatcher()` 判断 `watcher` 是否被处理，如果没有的话添加到 `queue` 队列中，并调用 `flushSchedulerQueue()`
  - `flushSchedulerQueue()`
    - 触发 `beforeUpdate` 钩子函数
    - 调用 `wacher.run()` `rune() -> get() -> getter() -> updateComponent`
    - 清空上一次的依赖
    - 触发 `actived` 钩子函数
    - 触发 `updated` 钩子函数


### 3、请简述虚拟 DOM 中 Key 的作用和好处。

### 4、请简述 Vue 中模板编译的过程。
