- [label语法](#label语法)
- [如何判断异步返回/判断Promise对象](#如何判断异步返回判断promise对象)
- [类型判断](#类型判断)


> 参考文章： [盘点六个阅读React源码后get到的基础知识](https://km.woa.com/group/571/articles/show/523272?kmref=search&from_page=1&no=2)

## label语法
> mdn：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/label

**使用场景：** 多层循环中跳出最外层
```js
function test() {
  let baseCount = 5;
  while (baseCount--) {
    let count = 10;
    while (count--) {
      if (count === 5) {
        // 如何在这里直接跳到最外层
      }
    }
  }
  console.log("test", baseCount);
}

test();
// test -1
```

普通解法：
```js
function test() {
  let baseCount = 5;
  const whileFn = () => {
    while (baseCount--) {
      let count = 10;
      while (count--) {
        if (count === 5) return;
      }
    }
  };
  whileFn();
  console.log("test", baseCount);
}

test();
// test 4
```

使用label语法：
```js
function test() {
  let baseCount = 5;
  baseWhile:while (baseCount--) {
    let count = 10;
    while (count--) {
      if (count === 5) break baseWhile;
    }
  }
  console.log("test", baseCount);
}

test();
// test 4
```

## 如何判断异步返回/判断Promise对象
React官方使用的方式是通过判断条件`typeof destroy.then === 'function'`来判断

同时，await的语法糖里判断Promise对象也是通过`promise.then==='funtion'`

> 因为promise的定义："promise"是具有then方法的对象或函数


## 类型判断
有两个类型判断关键字，`typeof`，`instanceof`。但他们有各自的缺陷

`typeof`是用来判断变量基本类型的关键字，但typeof null==='object'，是个js的老bug
```js
typeof Symbol()  // 'symbol'
typeof BigInt(1) // 'bigint'
typeof 1         // 'number'
typeof ''        // 'string'
typeof undefined // 'undefined'

typeof null      // 'object'
typeof {}        // 'object'
```

`instanceof`无法判断数组、日期类型
```js
[] instanceof Array  // true
[] instanceof Object // true
```
有这些问题的原因是，Array的原型是Object，而instanceof的实现原理是在原型链上遍历


所以，从**react源码**中获取判断变量类型的灵感：
```js
const getType = (a) => Object.prototype.toString.call(a).split(" ")
    .slice(1)
    .join(" ")
    .split("]")[0];
```

> `Object.prototype.toString()` 方法，会返回一个形如 `[object XXX]` 的字符串。