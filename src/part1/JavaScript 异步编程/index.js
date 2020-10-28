{
  function ajax(url) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'json';
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      }
      xhr.send();
    });
  }

  // ajax('/api/user.json').then(function onfulfilled(value) {
  //   console.log('onFulfilled', value);
  // }, function onrejected(error) {
  //   console.log('onRejected', error);
  // });
}
{
  // console.log('global start');

  // setTimeout(() => {
  //   console.log('setTimeout')
  // }, 0);

  // Promise.resolve().then(() => {
  //   console.log('promise1');
  // }).then(() => {
  //   console.log('promise2');
  // }).then(() => {
  //   console.log('promise3');
  // });

  // console.log('global end');

  //主线程直接执行
  console.log('1');
  //丢到宏事件队列中
  setTimeout(function () {
    console.log('2');
    process.nextTick(function () {
      console.log('3');
    })
    new Promise(function (resolve) {
      console.log('4');
      resolve();
    }).then(function () {
      console.log('5')
    })
  })
  //微事件1
  process.nextTick(function () {
    console.log('6');
  })
  //主线程直接执行
  new Promise(function (resolve) {
    console.log('7');
    resolve();
  }).then(function () {
    //微事件2
    console.log('8')
  })
  //丢到宏事件队列中
  setTimeout(function () {
    console.log('9');
    process.nextTick(function () {
      console.log('10');
    })
    new Promise(function (resolve) {
      console.log('11');
      resolve();
    }).then(function () {
      console.log('12')
    })
  })

  // 1 7 6 8 2 4 3 5 9 11 10 12
}
