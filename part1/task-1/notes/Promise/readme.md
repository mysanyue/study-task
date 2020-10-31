## 手写 Promise 源码
> 注意事项

 1. Promise 就是一个类 在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行
 2. Promise 中有三种状态，分别为：成功 - fulfilled，失败 - rejected，等待 - pending
     pending -> fulfilled
     pending -> rejected
     一旦状态确定就不可更改
  3. resolve 和 reject 函数是用来更改状态的
     resolve: fulfilled
     reject: rejected
  4. then 方法内部做的事情就是判断状态，如果状态是成功，调用成功的回调函数，如果状态是失败，调用失败回调函数，then 方法是被定义在原型对象中的方法
  4. then 成功回调有一个参数，表示成功之后的值，then失败回调有一个参数，表示失败后的原因