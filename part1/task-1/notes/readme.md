# 目录说明及文件快速入口

## function - 函数式编程

* [闭包](https://github.com/mysanyue/studyNotes/blob/main/part1/task-1/notes/function/%E9%97%AD%E5%8C%85.md)
* [纯函数](https://github.com/mysanyue/studyNotes/blob/main/part1/task-1/notes/function/%E7%BA%AF%E5%87%BD%E6%95%B0.md)
* [高阶函数](https://github.com/mysanyue/studyNotes/blob/main/part1/task-1/notes/function/%E9%AB%98%E9%98%B6%E5%87%BD%E6%95%B0.md)
* [函子](https://github.com/mysanyue/studyNotes/blob/main/part1/task-1/notes/function/%E5%87%BD%E5%AD%90.md)
* [柯里化](https://github.com/mysanyue/studyNotes/blob/main/part1/task-1/notes/function/%E6%9F%AF%E9%87%8C%E5%8C%96.md)
* [组合函数](https://github.com/mysanyue/studyNotes/blob/main/part1/task-1/notes/function/%E7%BB%84%E5%90%88%E5%87%BD%E6%95%B0.md)
* [Point Free](https://github.com/mysanyue/studyNotes/blob/main/part1/task-1/notes/function/Point%20Free.md)

## async - JavaScript 异步编程

* [Promise](https://github.com/mysanyue/studyNotes/blob/main/part1/task-1/notes/async/promise.md)
* [js 执行机制](https://github.com/mysanyue/studyNotes/blob/main/part1/task-1/notes/async/js%E6%89%A7%E8%A1%8C%E6%9C%BA%E5%88%B6.png)

## Promise 手写 Promise

* [基本说明及注意事项](https://github.com/mysanyue/studyNotes/tree/main/part1/task-1/notes/Promise)
* [手写 myPromise](https://github.com/mysanyue/studyNotes/blob/main/part1/task-1/notes/Promise/src/myPromise.js)

# 整理的相关练习题

1. 写出下列 `console.log` 打印顺序

``` js
setTimeout(() => {
  console.log(1);
});

let a = new Promise((resolve, reject) => {
  resolve();
}).then(() => {
  setTimeout(() => {
    console.log(2);
  });
  console.log(3);
});

// -> 3 1 2
```

2. 写出下列 `console.log` 打印顺序

``` js
setTimeout(() => {
  console.log(1);
});

var a = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(2);
    resolve(b);
    console.log(3);
  }, 1000);
});

var b = new Promise((resolve, reject) => {
  setTimeout(() => {
    // setTimeout(() => {
    //   console.log('宏任务');
    // });
    console.log(4);
    reject('error');
    console.log(5);
  }, 2000);
});

a.then(() => {
  console.log(6);
}).catch(err => {
  console.log(7);
});

// -> 1 2 3 4 5 7 宏任务
```

> 解析：
> 首先执行同步代码，第一个 `setTimeout` 加入宏任务排在第一位，然后执行 `a` 变量的 `Promise` 同步代码，遇到第二个 `setTimeout` ，加入宏任务排第二位，继续 `b` ，执行 `Promise` 同步代码，第三个 `setTimeout` ，加入宏任务排第三位， `a.then` 为微任务，应该优先执行。但是，这里没有返回 `resolve` 或者 `reject` ，所以需要等待。所以执行宏任务，第一个 `setTimeout` 打印 `1` ，继续第二个宏任务， `a` 变量里的 `setTimeout` ，这里由于 `setTimeout` 里是同步任务，所以依次执行，打印 `2` ，然后 `resolve` ，但这里的 `resolve` 是一个异步任务，所以需要等待，然后继续打印 `3` 。继续第三个宏任务， `b` 变量里的 `setTimeout` ，这里跟 `a` 类似，所以先打印 `4、5` ，然后 `reject` 。 `a` 收到 `b` 的 `reject` 后，然后整个 `Promise` 都改为 `reject` 状态，所以会打印 `7`

> 这里需要注意的是：内层 `Promise` 的状态决定外层 `Promise` 的状态

总结：宏任务是消息队列里的任务，常见的接口请求、定时器等异步任务都是宏任务。微任务是基于当前任务产生而随当前任务结束后立即执行的任务，所以也是异步任务，但是不需要通过 `Event Loop` 监测，通过消息队列取出并压入执行栈中再执行；像通过 `Promise` 、 `MutationObserver` 、 `process.nextTick` 产生的任务都为微任务。

加餐： `resolve` 和 `reject` 是异步任务还是同步任务，如果是异步任务那它们属于微任务还是宏任务？
`resolve` 和 `reject` 就是正常的同步任务，这里因为它内部代码起了变化

3. 写出下列 `console.log` 打印顺序

``` js
async function a() {
  await b();
  return new Error('error');
}

function b() {
  console.log(1);
}

a().then(res => {
  console.log(2);
}).catch(err => {
  console.log(3);
})
```
