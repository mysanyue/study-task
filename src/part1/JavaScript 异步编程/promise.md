## 基本写法

> 基础 [ECMAScript 6](https://es6.ruanyifeng.com/#docs/promise)

``` js
function ajax(url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function() {
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    }
    xhr.send();
  });
}
```

## 链式调用

* `Promise` 对象的 `then` 方法会返回一个全新的 `Promise` 对象
* 后面的 `then` 方法就是在为上一个 `then` 返回的 `Promise` 注册回调
* 前面 `then` 方法中回调函数的返回值会作为后面 `then` 方法回调的参数
* 如果回调中返回的是 `Promise` ，那后面 `then` 方法的回调会等待它的结束

## 宏任务、微任务

回调队列中的任务称为 - 宏任务，在宏任务执行的过程中可以临时加上一些额外的需求，可以选择作为一个新的宏任务进到队列中排队，setTimeout就是一个宏任务，会再次回到回调队列中排队。也可以作为当前任务的 - 微任务，直接在当前任务结束过后立即执行，而不是到整个队伍的末尾再重新排队。

* `Promise` 的回调会作为微任务执行
* `setTimeout` 作为宏任务执行
* `Promise` 、 `MutationObserver` 、 `node` 中 `process.nextTick` 都作为微任务

``` js
console.log('global start');

setTimeout(() => {
  console.log('setTimeout')
}, 0);

Promise.resolve().then(() => {
  console.log('promise1');
}).then(() => {
  console.log('promise2');
}).then(() => {
  console.log('promise3');
});

console.log('global end');
```
