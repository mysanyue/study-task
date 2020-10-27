const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败

class MyPromise {
  constructor(executor) {
    executor(resolve, reject);
  }

  // promise 状态
  status = PENDING;

  resolve = () => {
    // 如果状态不是等待，阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态更改为成功
    this.status = FULFILLED;
  }

  reject = () => {
    // 将状态更改为失败
    this.status = REJECTED;
  }
}
