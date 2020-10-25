## Point Free

Point Free：我们可以把数据处理的过程定义成与数据无关的合成运算，不需要用到代表数据的那个参数，只要把简单的运算步骤合成到一起，在使用这种模式之前我们需要定义一些辅助的基本运算函数。

* 不需要指明处理的数据
* 只需要合成运算过程
* 需要定义一些辅助的基本运算函数

``` js
const f = fp.flowRight(fp.join('-'), fp.map(_.toLower), fp.split(' '));
```

* 案例演示

``` js
// 非 Point Free 模式
// Hello World => hello_world 
function f(word) {
  return word.toLowerCase().replace(/\s+/g, '_');
}

// Point Free
const fp = require('lodash/fp');
const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower);
console.log(f('Hello World'));
```

* 使用 Point Free 的模式，把单词中的首字母提取并转换成大写

``` js
const fp = require('lodash/fp');
const firstLetterToUpper = fp.flowRight(join('. '), fp.map(fp.flowRight(fp.first, fp.toUpper)), split(' '));
console.log(firstLetterToUpper('world wild web'));
// => W. W. W
```
