- [解决原有语法的缺陷和不足](#解决原有语法的缺陷和不足)
  - [let const](#let-const)
- [对原有语法的增强](#对原有语法的增强)
  - [结构赋值](#结构赋值)
  - [模版字符串](#模版字符串)
  - [字符串新增方法](#字符串新增方法)
  - [函数参数增强：参数默认值](#函数参数增强参数默认值)
  - [...操作符：收起剩余数据、展开数组](#操作符收起剩余数据展开数组)
  - [?.可选链](#可选链)
  - [箭头函数](#箭头函数)
- [新增对象、全新的方法、全新的功能](#新增对象全新的方法全新的功能)
  - [Object.assign()](#objectassign)
  - [Object.is()](#objectis)
  - [proxy](#proxy)
  - [Reflect: 封装操作对象的统一API](#reflect-封装操作对象的统一api)
  - [用于处理异步，解决回调函数的地狱式嵌套问题](#用于处理异步解决回调函数的地狱式嵌套问题)
- [全新的数据结构和数据类型](#全新的数据结构和数据类型)
  - [class 类](#class-类)
  - [Set](#set)
  - [Map](#map)
  - [Symbol新的数据结构，唯一值](#symbol新的数据结构唯一值)
  - [for ... of 遍历](#for--of-遍历)

ES6改动很大，可以简单分为四类

- 解决原有语法的缺陷和不足
- 对原有语法进行增强
- 新增对象、全新的方法，全新的功能
- 新增对象、全新的方法，全新的功能

# 解决原有语法的缺陷和不足

## let const

- let：**块级作用域**，没有变量提升
- const: 恒量/常量；声明后不能修改内存地址，可修改属性成员

最佳实践：不用var，**主用const，配合let**

# 对原有语法的增强

## [结构赋值](https://es6.ruanyifeng.com/#docs/destructuring)

## [模版字符串](https://es6.ruanyifeng.com/#docs/string#%E6%A8%A1%E6%9D%BF%E5%AD%97%E7%AC%A6%E4%B8%B2)

```js
let str = `生成一个随机数：${ Math.random() }` 
```

## [字符串新增方法](https://es6.ruanyifeng.com/#docs/string-methods)

## 函数参数增强：参数默认值

```js
const fn = function (x=1, y) {
      console.log(x)
      console.log(y)
    }
    fn()
```

## ...操作符：收起剩余数据、展开数组

- 收取剩余参数：取代arguments，arguments是一个类数组，...操作符是一个数组类型，可以使用数组方法
  1. 仅使用一次
  2. 放在参数最后

    ```js
     const fn = function (x, ...y) {
          console.log(y.slice(0))
        }
        fn(1,2,3,4,5)
    ```

- 展开数组

    ```js
    const spredArr = [1,2,3,4]
    console.log(...spredArr)
    console.log.apply(this, spredArr) //es5代替方案
    ```

## ?.可选链

## 箭头函数

箭头函数没有自己的this对象，它的this指向上级作用域

```js
    const name = 'tony'
    const person = {
      name: 'tom',
      say: () => console.log(this.name),
      sayHello: function () {
        console.log(this.name)
      },
      sayHi: function () {
        setTimeout(function () {
          console.log(this.name)
        }, 500)
      },
      asyncSay: function () {
        setTimeout(()=>console.log(this.name), 500)
      }
    }
    person.say()  //tony
    person.sayHello() //tom
    person.sayHi() //tony
    person.asyncSay()  //tom
```

# 新增对象、全新的方法、全新的功能

## Object.assign()

用于合并多个对象，第一个参数就是最终的返回值，如果对象的属性名相同，后面的覆盖前面的

```js
    let objA = {
      a: 'aa',
      b: 'bb'
    }
    let objB = {
      b: 'dd',
      c: 'ee'
    }
    let result = Object.assign({}, objA, objB) // Object.assign({}, a,b)这种使用方式是深拷贝
    result.a = 'cc'
    console.log(objA, result) //{a: "aa", b: "bb"} {a: "cc", b: "dd", c: "ee"}
```

## Object.is()

判断两个值是否相等(严等于)，返回布尔值

用途：es5中，对于0的判断不区分正负值，-0 == +0返回true，NaN == NaN返回 返回false；
Object.is()规避了这些问题

```js
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

Object.is({}, {}) // false
```

## proxy

## Reflect: 封装操作对象的统一API

Reflect的目的是使用同一套方式去操作对象

```js
    const obj = {
      name: '111',
      age: '22'
    }
    // 判断对象某个属性是否存在
    console.log(Reflect.has(obj,'name'))
    // 删除某个属性
    console.log(Reflect.deleteProperty(obj, 'name'))
    // 获取对象key
    console.log(Reflect.ownKeys(obj))
```

## 用于处理异步，解决回调函数的地狱式嵌套问题

详见[异步编程(promise、generator、async,await)](../js/异步编程(promise、generator、async,await))

# 全新的数据结构和数据类型

## class 类

es5写法

```js
function People (name) {
  // 设置实例属性
  this.name = name;
}
// 设置实例的共享方法
People.prototype.sayHi = function () {
  console.log(this.name)
}
let p = new People('tom')
p.sayHi()
```

es6 class写法

```js
class Peopel {
  constructor (name) {
    this.name = name
  }
  say () {
    console.log(this.name)
  }
}
const p = new Peopel('tony')
p.say()
```

类的继承

```js
class Peopel {
  constructor (name) {
    this.name = name
  }
  say () {
    console.log(this.name)   //tom，在子类的sayAge中调用
  }
}
class Worker extends Peopel {
  constructor (name,age) {
    super(name)
    this.age = age
  }
  sayAge () {
    super.say()
    console.log(this)  // Worker {name: "tom", age: 18}
    console.log(this.age) // 18
  }
}
const p = new Worker('tom', 18)
p.sayAge()
```

super可以作为函数调用，也可以作为对象调用
作为函数调用时，只能在子类的constructor中调用

## Set

类似于数组，但是成员的值都是唯一的，没有重复的值。

## Map

es5中的对象key只能是字符串，map的key可以是任意数据类型, 可以通过get,set,has等操作map

## Symbol新的数据结构，唯一值

用途：防止全局对象中，某个属性名重名，产生冲突；定义私有属性，外部访问不到，且遍历不到

## for ... of 遍历
