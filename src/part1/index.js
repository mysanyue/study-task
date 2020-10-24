// ******************************** 高阶函数 ***********************************
{
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
}
// ******************************** 闭包 ***********************************
{
  // ---------------------------- 闭包 - 案例 -----------------------------
  // 生成计算数字的多少次幂的函数
  function makePower(power) {
    return function (x) {
      return Math.pow(x, power);
    }
  }
  // 测试
  // let power2 = makePower(2);
  // let power3 = makePower(3);
  // console.log(power2(4));
  // console.log(power3(4));

  // 第一个数是基本工资，第二个数是绩效工资
  function makeSalary(x) {
    return function (y) {
      return x + y;
    }
  }
  // 测试
  // let salaryLevel1 = makeSalary(1500);
  // let salaryLevel2 = makeSalary(2500);
  // console.log(salaryLevel1(2000));
  // console.log(salaryLevel2(3000));
}
// ******************************** 纯函数 ***********************************
{
  // const _ = require('lodash');

  function getArea(r) {
    return Math.PI * r * r;
  }

  // 自己模拟一个 memoize 函数
  function memoize(f) {
    let cache = {};
    return function () {
      let arg_str = JSON.stringify(arguments);
      cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
      return cache[arg_str];
    }
  }

  // let getAreaWithMemory = _.memoize(getArea);
  // console.log(getAreaWithMemory(4));
}
// ******************************** 函数柯里化 ***********************************
{
  const _ = require('lodash');
  const match = _.curry(function (reg, str) {
    return str.match(reg);
  });

  const haveSpace = match(/\s+/g);
  const haveNumber = match(/\d+/g);

  // console.log(haveSpace('helloworld'));
  // console.log(haveNumber('123abc'));

  const filter = _.curry(function (func, array) {
    return array.filter(func);
  });

  const findSpace = filter(haveSpace);
  const fildNumber = filter(haveNumber);
  // console.log(findSpace(['zhang san', 'lisi']));
  // console.log(fildNumber(['12zhang san', '12lisi']));

  // 模拟 _.curry() 的实现
  function curry(func) {
    return function curriedFn(...args) {
      // 判断实参和形参的个数
      if (args.length < func.length) {
        return function () {
          return curriedFn(...args.concat(Array.from(arguments)));
        }
      }

      // 实参和形参个数相同，调用 func，返回结果
      return func(...args);
    }
  }
}
