## 一、简答题

### 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

```js
let vm = new Vue({
  el: '#el'
  data: {
    o: 'object',
    dog: {}
  },
  method: {
    clickHandler () {
      // 该 name 属性是否是响应式的
      this.dog.name = 'Trump'
    }
  }
})
```

- 增加的属性不是响应式数据
- 可以通过 `Vue.set( target, propertyName/index, value )` 方法来设置成响应式数据
- 内部原理是通过 `defineProperty` 和结合发布/订阅者的方式，来劫持各个属性的 `setter` 和 `getter`，当数据发生变动时发送消息给订阅者，从而触发相应数据更新

### 2、请简述 Diff 算法的执行过程
 
- 在 `path` 函数中，判断新老节点是否是同一个节点时，不是替换，而是进入 `pathNode` 方法，此时开始进入 `diff` 算法实现新老节点的差异更新。
- 在 `pathNode` 函数中，先是更新元素本身，而后更新子节点。在更新子节点时，会跟据新老节点是否有 `children` 来划分成四种类型。如果都有子节点，则进入 `updateChildren` 方法进行子节点数组的批量差异更新。
- 在 `updateChildren` 函数中，以新节点的子节点数组为准进行遍历（复杂度 `O(n)`），有序的匹配老节点的子节点数组中节点(`hash` 匹配，复杂度 `O(1)`)，匹配成功则 `dom` 复用并进行移动和更新（更新时进入到子节点的 `pathNode` 方法），同时老节点的子节点数组索引后移一位，匹配失败则新建 `dom` 元素到对应位置上。在这个过程中，为了减少 `dom` 移动的次数，对四种匹配情况进行特殊处理，即新开始节点与老节点匹配，新结束节点与老结束节点匹配，新开始节点与老结束节点匹配，老结束节点与新结束节点匹配，新开始节点与老结束节点匹配，老结束节点与新结束节点匹配，这四种情况一旦匹配成功就可以避免进入 `dom` 移动的过程，提高运行速度。

## 二、编程题
### 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

**代码路径** `code/vueRouter/src/vueRouter/hash.js`

### 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
 
**代码路径** `code/vue/js/compiler.js`

### 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：

**代码路径** `code/snabbdom-list`

![task](web.png)