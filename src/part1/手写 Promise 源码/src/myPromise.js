const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  // promise 状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败后的原因
  reason = undefined;
  // 成功回调
  successCallback = [];
  // 失败回调
  failCallback = [];

  resolve = value => {
    // 如果状态不是等待，阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态更改为成功
    this.status = FULFILLED;
    // 保存成功之后的值
    this.value = value;
    // 判断成功回调是否存在，如果存在，调用
    // this.successCallback && this.successCallback(this.value);
    while (this.successCallback.length) this.successCallback.shift()();
  }

  reject = reason => {
    // 将状态更改为失败
    if (this.status !== PENDING) return;
    // 将状态更改为失败
    this.status = REJECTED;
    // 保存失败后的原因
    this.reason = reason;
    // 判断失败函数是否存在，如果存在，调用
    // this.failCallback && this.failCallback(this.reason);
    while (this.failCallback.length) this.failCallback.shift()();
  }

  then(successCallback, failCallback) {
    let promise2 = new MyPromise((resolve, reject) => {
      // 状态判断
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value);
            // 判断 x 的值是普通值还是 promise对象
            // 如果是普通值 直接调用 resolve
            // 如果是 promise 对象，查看 promise 对象返回的结果
            // 再根据 promise 对象返回的结果，决定调用 resolve 还是 reject
            resolvePromise(promise2, x, resolve, reject);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        }, 0)
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason);
            // 判断 x 的值是普通值还是 promise对象
            // 如果是普通值 直接调用 resolve
            // 如果是 promise 对象，查看 promise 对象返回的结果
            // 再根据 promise 对象返回的结果，决定调用 resolve 还是 reject
            resolvePromise(promise2, x, resolve, reject);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        }, 0)
      } else {
        // 等待
        // 将成功回调和失败回调存储起来
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value);
              // 判断 x 的值是普通值还是 promise对象
              // 如果是普通值 直接调用 resolve
              // 如果是 promise 对象，查看 promise 对象返回的结果
              // 再根据 promise 对象返回的结果，决定调用 resolve 还是 reject
              resolvePromise(promise2, x, resolve, reject);
              resolve(x);
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason);
              // 判断 x 的值是普通值还是 promise对象
              // 如果是普通值 直接调用 resolve
              // 如果是 promise 对象，查看 promise 对象返回的结果
              // 再根据 promise 对象返回的结果，决定调用 resolve 还是 reject
              resolvePromise(promise2, x, resolve, reject);
              resolve(x);
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
      }
    });

    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  if (x instanceof MyPromise) {
    // promise 对象
    // x.then(() => resolve(value), reason => reject(reason));
    x.then(resolve, reject);
  } else {
    // 普通值
    resolve(x);
  }
}

module.exports = MyPromise;
