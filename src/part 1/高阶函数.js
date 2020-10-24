const arr = [{ name: '张三', age: 25, salary: 12000 }, { name: '李四', age: 27, salary: 18000 }, { name: '王麻子', age: 28, salary: 28000 }];

// ---------------------------- 高阶函数 - 函数作为参数 -----------------------------
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i]);
  }
}

//测试
// forEach(arr, function (item) {
//   console.log(item.name);
// });

function filter(array, fn) {
  let ret = [];
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i])) {
      ret.push(array[i]);
    }
  }
  return ret;
}

// 测试
// const newArr = filter(arr, function (item) {
//   return item.salary > 16000;
// });

// console.log(newArr);


// ---------------------------- 高阶函数 - 函数作为返回值 -----------------------------
function once(fn) {
  let done = false;
  return function () {
    if (!done) {
      done = true;
      // return fn.apply(this, arguments);
      return fn.call(this, ...arguments);
    }
  }
}

let pay = once(function (money) {
  console.log(`支付了: ${money} RMB`);
});
// 测试
// pay(8800);
// pay(10000);

// ---------------------------- 高阶函数 - 模拟常用高阶函数 -----------------------------

// map
const map = (array, fn) => {
  let ret = [];
  for (let value of array) {
    ret.push(fn(value));
  }
  return ret;
}
// 测试
// let res = map(arr, e => {
//   return { ...e, salary: e.salary + 500 };
// });

// console.log(res);
// console.log(arr);

// every
const every = (array, fn) => {
  let ret = true;
  for (let value of array) {
    ret = fn(value);
    if (!ret) break;
  }
  return ret;
}
// 测试
// console.log(every(arr, e => e.salary > 18000));

// some
const some = (array, fn) => {
  let ret = false;
  for (let value of array) {
    ret = fn(value);
    if (ret) break;
  }
  return ret;
}
// 测试
// console.log(some(arr, e => e.salary > 20000));
