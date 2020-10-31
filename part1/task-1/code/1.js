// 一. 将下面异步代码使用 Promise 的方式改进
setTimeout(function () {
  var a = 'hello';
  setTimeout(function () {
    var b = 'logo';
    setTimeout(function () {
      var c = 'I V U';
      console.log('setTimeout：', a + b + c);
    }, 10);
  }, 10);
}, 10);

// 改进
new Promise(resolve => {
  setTimeout(() => resolve('hello'), 10);
}).then(res => {
  return new Promise(resolve => {
    setTimeout(() => resolve('logo' + res), 10);
  })
}).then(res => {
  setTimeout(() => console.log('Promise：', res + 'I V U'), 10);
});
