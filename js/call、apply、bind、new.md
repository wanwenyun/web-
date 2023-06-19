- [call、apply、bind使用](#callapplybind使用)
  - [call](#call)
  - [apply](#apply)
  - [bind](#bind)
- [bind、call、apply区别](#bindcallapply区别)
- [手写call](#手写call)
- [手写apply](#手写apply)
- [手写bind](#手写bind)
- [New](#new)
  - [new生成一个对象的过程](#new生成一个对象的过程)
  - [手写new](#手写new)

# call、apply、bind使用

call、apply、bind都可以改变函数的this指向。

## call

使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。会立即执行函数

语法：`function.call(thisArg, arg1, arg2, ...)`
`thisArg`是可选的，如果`thisArg`指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。

```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name); // cheese
```

## apply

调用一个具有给定 this 值的函数，以及以一个`数组`（或一个类数组对象）的形式提供的参数。效果与`call`相同。会立即执行函数。

```js
const array = ['a', 'b'];
const elements = [0, 1, 2];
Array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```

## bind

bind() 方法将**创建一个新的函数**，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
`function.bind(thisArg[, arg1[, arg2[, ...]]])`

```js
function sayHello() {
  console.log('Hello, ' + this.name);
}
var person = { name: 'John' };
var sayHelloToJohn = sayHello.bind(person);
sayHelloToJohn(); // 输出：Hello, John
```

<!-- ```js
const module = {
  x: 42,
  getX: function() {
    return this.x;
  }
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// Expected output: undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// Expected output: 42
``` -->

# bind、call、apply区别

bind、call、apply，是为了指明function函数的this指向

1. `call和apply`会**立即执行函数**，bind只是绑定了函数，并不会立即执行函数
2. call、apply因为要立即执行函数，所以第二个参数或之后的参数都是当前的**真实参数**，bind是**预设参数**
3. apply方法将参数以**数组**的形式传入，call方法将参数以**正常的参数形式**传入

# 手写call

call语法：`fun.call(thisArg, arg1, arg2, ...)`，调用一个函数, 其具有一个指定的this值和分别地提供的参数(参数的列表)。

核心：

1. 更改this指向
2. 函数立即执行，后删除这个函数
3. 返回执行结果

```js
Function.prototype.myCall = function (context) {
  // 先判断当前的调用对象是否是函数
  if(typeof this !== 'function') throw new TypeError('error');
  
  context = context || window; // this 参数可以传 null，当为 null 的时候，视为指向 window
  let args = [...arguments].slice(1); // 获取参数：arguments是一种类数组结构，第一个元素是this，后面的才是真正意义上的参数
  
  context.fn = this; //把函数绑定到目标对象上
  
  let result = context.fn(...args); //立即执行函数

  delete context.fn; //删除该函数

  return result;
}


// test
let foo = {
    value: 1
}

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}
bar.myCall(foo, 'black', '18') // black 18 1
```

# 手写apply

语法：`apply(thisArg)`，`apply(thisArg, argsArray)`

手写Apply，与call类似，只是参数是数组的形式

```js
Function.prototype.myApply = function (context) {
    // 先判断当前的调用对象是否是函数
    if(typeof this !== 'function') throw new TypeError('error');
    
    context = context || window;
    context.fn = this; //把函数绑定到目标对象上

    let result;
    // 判断是否有第二个参数
    if(arguments[1]){
        result = context.fn(...arguments[1]);
    }else{
        result = context.fn();
    }
    delete context.fn
    return result;
}
```

# 手写bind

[JavaScript深入之bind的模拟实现](https://github.com/mqyqingfeng/Blog/issues/12)

语法：`function.bind(thisArg[, arg1[, arg2[, ...]]])`

`bind`特点：

1. 会返回一个新函数。
2. 当这个新函数被调用时，第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。
3. 不会立即执行

```js
Function.prototype.myBind = function (context) {
  // 先判断当前的调用对象是否是函数
  if(typeof this !== 'function') throw new TypeError('error');

  // 获取参数，为了传给调用者
  let args = [...arguments].slice(1);

  // 构建一个干净的函数，用于保存原函数的原型
  let tmp = function() {};

  // 保持this
  let self = this;

  /**
   * this instanceof tmp, 判断是否使用 new 来调用 resFn
   * (因为new也需要用apply()，所以这里需要区分两种情况下this指向)
   * (如果是new，传入的是object，如果是bind，传入的参数是function)
   * 如果是 new 来调用的话，this的指向就是其实例，
   * 如果不是 new 调用的话，就改变 this 指向到指定的对象 context
   */ 
  let resFn = function() {
    return self.apply(this instanceof tmp ? this : context, args.concat(...arguments))
  }

  // 箭头函数没有 prototype，箭头函数this永远指向它所在的作用域
  if (this.prototype) {
      tmp.prototype = this.prototype;
  }
  // 修改绑定函数的原型指向
  resFn.prototype = new tmp();
  
  return resFn;
}
```

# New

new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

new 的结果是一个新对象

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
var person = new Person("Alice", 23);
var person2 = new Person("wanwan",18);

person == person2 // false
```

假如构造函数有`返回值`

1. 该返回值是`对象`，则实例只能访问返回的对象中的属性。
2. 该返回值是`基本类型的值`，相当于没有返回值进行处理。

```js
function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return {
        name: name,
        habit: 'Games'
    }
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined

function Otaku2 (name, age) {
    this.strength = 60;
    this.age = age;

    return 'handsome boy';
}

var person2 = new Otaku('Kevin', '18');
console.log(person.name) // undefined
console.log(person.habit) // undefined
console.log(person.strength) // 60
console.log(person.age) // 18
```

## new生成一个对象的过程

1. **创建一个空对象**，从堆内存里**开辟了一块内存**。`var obj = new Object();`
2. **绑定新对象的this**：让Person(构造函数)中的this指向这个空对象obj，并执行Person构造函数的函数体。`var result = Person.call(obj);`
3. **设置原型链**：将obj的__proto__成员指向了Person构造函数对象的prototype成员对象。`obj.__proto__ = Person.prototype;`
4. **返回新对象**：将初始化完毕的新对象地址，保存到等号左边的变量中。判断Person(构造函数)的返回值类型，如果是值类型，返回obj(新对象)。如果是引用类型，就返回这个引用类型的对象。
`typeof(result) === "object" ? result : obj`

> mdn解释：
>
> 1. **创建一个新的js空对象（即 {}）**, 从堆内存里**开辟了一块内存**
> 2. 为步骤 1 新创建的对象添加属性 `__proto__`，将该属性链接至构造函数的原型 对象；
> 3. 将步骤 1 新创建的对象作为 `this` 的上下文；
> 4. 如果该函数没有返回**对象**，则返回 `this`。

## 手写new

```js
function myNew(constructor, ...args) {
    let obj = {}; // 创建对象

    let ret = constructor.apply(obj, args); // 绑定新对象的this。并执行构造函数，得到构造函数返回数据

    obj.__proto__ = constructor.prototype; // 设置原型链：构造函数链接到新对象

    return ret === 'object' ? ret : obj; // 如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用将返回该对象引用。
}
```

```js
// test1, 返回对象
function a (a,b) {
 this.A = a,
 this.B = b
}
let b = new a("test","haha");
let c = myNew(a)
let d = myNew(a,2,4);
console.log(b, c, d); // a {A: 'test', B: 'haha'} a {A: undefined, B: undefined} a {A: 2, B: 4}

// test2 返回基础数据
function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return 'handsome boy';
}

var person = myNew(Otaku, 'Kevin', '18');
```
