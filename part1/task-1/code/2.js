// 二. 基于以下代码完成下面的四个联系
const { isArray } = require('lodash/fp');
const fp = require('lodash/fp');

// 数据
// horsepower 马力，dollar_value 价格，in_stock 库存

const cars = [
  { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: 'Spyker C12 Zagato', horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: 'Jaguar XKR-S', horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
  { name: 'Aston Martin One-77', horsepower: 750, dollar_value: 1850000, in_stock: true },
  { name: 'Pagani Huayra', horsepower: 700, dollar_value: 1300000, in_stock: false }
]

// 练习1: 使用函数组合 fp.flowRight() 重新实现下面这个函数
{
  let isLastInStock = function (cars) {
    // 获取最后一条数据
    let last_car = fp.last(cars);
    // 获取最后一条数据 in_stock 属性值
    return fp.prop('in_stock', last_car);
  }

  // 实现如下：
  let retFn = fp.flowRight(fp.prop('in_stock'), fp.last);

  // 测试
  // console.log(isLastInStock(cars), retFn(cars));
}

// 练习2：使用 fp.flowRight()、fp.prop() 和 fp.first() 获取第一个 car 的 name
{
  // 实现如下：
  let retFn = fp.flowRight(fp.prop('name'), fp.first);

  // 测试
  // console.log(retFn(cars));
}

// 练习3：使用帮助函数 _average 重构 averageDollarValue，使用函数组合的方式实现
{
  // <- 无须改动
  let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length;
  }

  let averageDollarValue = function (cars) {
    let dollar_values = fp.map(function (car) {
      return car.dollar_value
    }, cars);

    return _average(dollar_values);
  }

  // 实现如下：
  let retFn = fp.flowRight(_average, fp.map(e => e.dollar_value));

  // 测试
  // console.log(averageDollarValue(cars), retFn(cars));
}

// 练习4：使用 flowRight 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串，把数组中的 name 转换为这种形式： sanitizeNames(['Hello World']) => ['hello_world']
{
  // 无须改动，并在 saitizeNames 中使用它
  let _underscore = fp.replace(/\s+/g, '_');

  // // 实现如下：
  let sanitizeNames = function (val) {
    if (!fp.isArray(val)) return '';
    if (fp.isEmpty(val) || fp.isEmpty(val[0])) return []
    if (typeof val[0] === 'string') {
      return (fp.flowRight(fp.map(e => (fp.flowRight(_underscore, fp.toLower))(e))))(val);
    } else {
      return (fp.flowRight(fp.map(e => {
        e.name = (fp.flowRight(_underscore, fp.toLower))(e.name);
        return e;
      })))(val);
    }
  }

  // 测试
  // console.log(sanitizeNames(cars));
  // console.log(sanitizeNames(['Hello World']));
  // console.log(sanitizeNames([{}]));
  // console.log(sanitizeNames([]));
  // console.log(sanitizeNames(['']));
}
