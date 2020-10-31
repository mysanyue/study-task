// 三、基于以下提供的代码，完成后续的四个练习

// 练习1：使用 fp.add(x,y) 和 fp.map(f,x) 创建一个能让 function 里的值增加的函数 ex1
{
  const fp = require('lodash/fp');
  const { Maybe, Container } = require('./utils/support');

  let maybe = Maybe.of([5, 6, 1]);
  let ex1 = () => {
    // 需要实现的函数...
  }
}

// 练习2：实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素
{
  const fp = require('lodash/fp');
  const { Maybe, Container } = require('./utils/support');

  let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
  let ex2 = () => {
    // 你需要实现的函数...
  }
}

// 练习3：实现一个 ex3，使用 safeProp 和 fp.first 找到 user 的名字的首字母
{
  const fp = require('lodash/fp');
  const { Maybe, Container } = require('./utils/support');

  let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x]);
  });
  let user = { id: 2, name: 'Albert' };
  let ex3 = () => {
    // 你需要实现的函数...
  }
}

// 练习4：使用 Maybe 重写 ex4，不要有if语句
{
  const fp = require('lodash/fp');
  const { Maybe, Container } = require('./utils/support');

  let ex4 = function (n) {
    if (n) return parseInt(n);
  }
}
