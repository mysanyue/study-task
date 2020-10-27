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
}
