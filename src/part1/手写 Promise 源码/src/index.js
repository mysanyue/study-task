/**
 * 1. Promise 就是一个类 在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行
 * 2. Promise 中有三种状态，分别为：成功 - fulfilled，失败 - rejected，等待 - pending
 *    pending -> fulfilled
 *    pending -> rejected
 *    一旦状态确定就不可更改
 * 3. resolve 和 reject 函数是用来更改状态的
 *    resolve: fulfilled
 *    reject: rejected
 */
new Promise((resolve, reject) => {

});
