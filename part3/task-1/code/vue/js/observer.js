/**
 * 功能
 * 1. 负责把 data 选项中的属性转换成响应式数据
 * 2. data 中的某个属性也是对象，把该属性转换成响应式数据
 * 3. 数据变化发送通知
 */
class Observer {
  constructor(data) {
    this.walk(data)
  }

  walk(data) {
    // 1. 判断 data 是否是对象
    if (!data || typeof data !== 'object') {
      return
    }

    // 2. 遍历 data 对象的所有属性
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(obj, key, val) {
    const that = this
    // 负责收集依赖，并发送通知
    const dep = new Dep()
    // 如果 val 是对象，把 val 内部的属性转换成响应式数据
    this.walk(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set(newValue) {
        if (newValue === val) {
          return
        }
        val = newValue
        // 重新赋值 转换为响应式数据
        that.walk(newValue)
        // 发送通知
        dep.notify()
      }
    })
  }
}
