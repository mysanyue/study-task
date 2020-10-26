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
