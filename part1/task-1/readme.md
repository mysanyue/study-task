## 简答题

### 一. 谈一谈你是如何理解js异步编程的，EventLoop、消息队列都是做什么的，什么是宏任务，什么是微任务。

* `js` 异步任务不会等待这个任务的结束才开始下一个任务, 都是开启之后立即往下执行任务，后续逻辑会通过回调函数的方式定义。
* `EventLoop` 事件循环，主要负责监听调用栈和消息队列，一旦调用栈中所有任务都结束了，事件循环就会从消息队列中取出回调函数压入到调用栈中，依次执行，并且是一个重复的过程，直到调用栈和消息队列中都没有要执行的任务了，整体的任务就结束。
* 消息队列（回调队列或者任务队列）就是等待排队执行的一个队列。
* 回调队列中的任务称为 - 宏任务，在宏任务执行的过程中可以临时加上一些额外的需求，可以选择作为一个新的宏任务进到队列中排队，`setTimeout` 就是一个宏任务，会再次回到回调队列中排队。也可以作为当前任务的 - 微任务，直接在当前任务结束过后立即执行，而不是到整个队伍的末尾再重新排队。

## 编程题

### 一. 将下面异步代码使用 Promise 的方式改进

``` js
 setTimeout(function() {
   var a = 'hello';
   setTimeout(function() {
     var b = 'logo';
     setTimeout(function() {
       var c = 'I V U';
       console.log('setTimeout：', a + b + c);
     }, 10);
   }, 10);
 }, 10);
```

### 二. 基于以下代码完成下面的四个联系

``` js
const fp = requie('lodash/fp');

// 数据
// horsepower 马力，dollar_value 价格，in_stock 库存

const cars = [{
    name: 'Ferrari FF',
    horsepower: 660,
    dollar_value: 700000,
    in_stock: true
  },
  {
    name: 'Spyker C12 Zagato',
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false
  },
  {
    name: 'Jaguar XKR-S',
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false
  },
  {
    name: 'Audi R8',
    horsepower: 525,
    dollar_value: 114200,
    in_stock: false
  },
  {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true
  },
  {
    name: 'Pagani Huayra',
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false
  }
]

// 练习1: 使用函数组合 fp.flowRight() 重新实现下面这个函数
{
  let isLastInStock = function(cars) {
    // 获取最后一条数据
    let last_car = fp.last(cars);
    // 获取最后一条数据
    return fp.prop('in_stock', last_car);
  }
}

// 练习2：使用 fp.flowRight()、fp.prop() 和 fp.first() 获取第一个 car 的 name

// 练习3：使用帮助函数 _average 重构 averageDollarValue，使用函数组合的方式实现
{
  let _average = function(xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length;
  }

  // <- 无须改动
  let averageDollarValue = function(cars) {
    let dollar_values = fp.map(function(car) {
      return car.dollar_value
    }, cars);

    return _average(dollar_values);
  }
}

// 练习4：使用 flowRight 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串，把数组中的 name 转换为这种形式： sanitizeNames(['Hello World']) => ['hello_world']
{
  // 无须改动，并在 saitizeNames 中使用它
  let _underscore = fp.replace(/\w+/g, '_');
}
```

### 三、基于以下提供的代码，完成后续的四个练习

``` js
// 练习1：使用 fp.add(x,y) 和 fp.map(f,x) 创建一个能让 function 里的值增加的函数 ex1
{
  const fp = require('lodash/fp');
  const {
    Maybe,
    Container
  } = require('./utils/support');

  let maybe = Maybe.of([5, 6, 1]);
  let ex1 = () => {
    // 需要实现的函数...
  }
}

// 练习2：实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素
{
  const fp = require('lodash/fp');
  const {
    Maybe,
    Container
  } = require('./utils/support');

  let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
  let ex2 = () => {
    // 你需要实现的函数...
  }
}

// 练习3：实现一个 ex3，使用 safeProp 和 fp.first 找到 user 的名字的首字母
{
  const fp = require('lodash/fp');
  const {
    Maybe,
    Container
  } = require('./utils/support');

  let safeProp = fp.curry(function(x, o) {
    return Maybe.of(o[x]);
  });
  let user = {
    id: 2,
    name: 'Albert'
  };
  let ex3 = () => {
    // 你需要实现的函数...
  }
}

// 练习4：使用 Maybe 重写 ex4，不要有if语句
{
  const fp = require('lodash/fp');
  const {
    Maybe,
    Container
  } = require('./utils/support');

  let ex4 = function(n) {
    if (n) return parseInt(n);
  }
}
```

### 四、手写 MyPromise 源码

> 要求：尽可能还原 Promise 中的每一个API，并通过注释的方式描述思路和原理
