- [原型和原型链](#原型和原型链)
- [词法（静态）作用域与动态作用域](#词法静态作用域与动态作用域)
  - [什么是作用域](#什么是作用域)
  - [静态、动态作用域](#静态动态作用域)
- [执行上下文栈](#执行上下文栈)
- [变量对象](#变量对象)
- [作用域链](#作用域链)
- [从ECMAScript规范解读this](#从ecmascript规范解读this)
- [this对象](#this对象)
  - [this绑定规则](#this绑定规则)
- [执行上下文](#执行上下文)
- [闭包](#闭包)
- [参数按值传递](#参数按值传递)

## 原型和原型链
>参考资料：https://github.com/mqyqingfeng/Blog/issues/2

<img src='./picture/proto.png' width="60%"/>

每个对象都可以有一个原型`_proto_`，这个原型还可以有它自己的原型，以此类推，形成一个**原型链**。

查找特定属性的时候，我们先去这个对象里去找，如果没有的话就去它的原型对象里面去，如果还是没有的话再去向原型对象的原型对象里去寻找...... 


**通过上图可知：**
```js
function Person() {}

var person = new Person();

console.log(person.__proto__ == Person.prototype) // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true
```

**需要注意的三个点**
* constructor属性
    ```js
    function Person() { }
    var person = new Person();
    console.log(person.constructor === Person); // true
    ```
    当获取 person.constructor 时，其实 person 中并没有 constructor 属性,当不能读取到constructor 属性时，会从 person 的原型也就是 Person.prototype 中读取，正好原型中有该属性，所以：
    `person.constructor === Person.prototype.constructor === Person`
* `__proto__`属性
    
    绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 Person.prototype 中，实际上，它是来自于 Object.prototype 
* 真的是继承吗？

    继承意味着`复制`操作，然而 JavaScript 默认并不会复制对象的属性，相反，JavaScript 只是在两个对象之间创建一个`关联`，这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，委托的说法反而更准确些。


## 词法（静态）作用域与动态作用域
>参考链接：https://github.com/mqyqingfeng/Blog/issues/3
### 什么是作用域
* 作用域是指程序源代码中定义变量的区域。
* 作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。
### 静态、动态作用域
* 词法(静态)作用域：函数的作用域在函数**定义**的时候就决定了。<font color=red>js采用此方式</font>
* 动态作用域：函数的作用域是在函数调用的时候才决定的。
例子：
```js
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar(); // 结果是 ???
```

如果是**静态作用域**，结果是**1**。原因：执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据<font color=red>书写的</font>位置，查找上面一层的代码，也就是 value 等于 1

如果是**动态作用域**，结果是**2**。原因：执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 value。如果没有，就从<font color=red>调用函数的作用域</font>，也就是 bar 函数内部查找 value 变量，所以结果会打印 2。

ps：bash是采用动态作用域的。

再看一个例子：
```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();
```
```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```
两段代码打印出来的都是`local scope`。
因为JavaScript采用的是词法作用域，函数的作用域基于函数创建的位置。

## 执行上下文栈
>参考链接：
>
>https://github.com/mqyqingfeng/Blog/issues/4

对于每个**执行上下文**，都有三个重要属性：
* 变量对象(Variable object，VO)
* 作用域链(Scope chain)
* this


接上一节最后一个例子，其执行上下文栈如下：
第一段：
```js
ECStack.push(<checkscope> functionContext);
ECStack.push(<f> functionContext);
ECStack.pop();
ECStack.pop();
```
第二段：
```js
ECStack.push(<checkscope> functionContext);
ECStack.pop();
ECStack.push(<f> functionContext);
ECStack.pop();
```

再看一个例子：
```js
function foo() { console.log('foo1'); }
foo(); // 'foo2'

function foo() { console.log('foo2'); }
foo(); // 'foo2'
```
原因：js内部机制会把函数声明提到最前面，效果如下
```js
function foo() { console.log('foo1'); }
function foo() { console.log('foo2'); }
foo();
foo();
```

## 变量对象
变量对象会包括：
1. 函数的所有形参 (如果是函数上下文)
    * 由名称和对应值组成的一个变量对象的属性被创建
    * 没有实参，属性值设为 undefined
2. 函数声明
    * 由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建
    * 如果变量对象已经存在相同名称的属性，则完全替换这个属性
3. 变量声明
    * 由名称和对应值（undefined）组成一个变量对象的属性被创建；
    * 如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性

总结：
1. 全局上下文的变量对象初始化是全局对象（在浏览器控制台下， `this === window // true`）
2. 函数上下文的变量对象初始化只包括 Arguments 对象
3. 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
4. 在代码执行阶段，会再次修改变量对象的属性值

## 作用域链
>https://github.com/mqyqingfeng/Blog/issues/6

对于每个执行上下文，都有三个重要属性：
* 变量对象(Variable object，VO)
* **作用域链(Scope chain)**
* this

作用域链定义：当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

作用域链是基于调用栈的，而不是基于函数定义的位置的。

例题：  
```js
var name = '全局'
var type = 'global'


function foo(){
    var name = 'foo'
    console.log(name) // foo
    console.log(type) // global
}


function bar(){
    var name = 'bar'
    var type = 'function'
    foo()
}
bar()
```

因为foo是在全局环境中声明的，所以foo()的执行对象是window，对应的作用域是全局作用域（js采用的是`词法(静态)作用域`，由函数**定义**的位置就决定）。打印name时，会现在foo作用域内查找，打印出`foo`。打印type时，在foo作用域内没找到，便会顺着作用域链向上找，上一级的作用域是**全局作用域**。


```js
var name = '全局'
var type = 'global'
function bar() {
    var type = 'function'
    function foo() {
        console.log(type) // function
    }
    foo()
}
bar()
```
## 从ECMAScript规范解读this
> https://github.com/mqyqingfeng/Blog/issues/7
ES语言类型，除了Undefined, Null, Boolean, String, Number, Object这些之外，还有一种规范类型。规范类型是用来描述ES语言结构和语言类型的，规范类型包括：**Reference**, List, Completion, Property Descriptor, Property Identifier, Lexical Environment, 和 Environment Record。

其中Reference与this有着密切的关系。

Reference由3部分组成
* base value：属性所在的对象或者就是 EnvironmentRecord，它的值只可能是 undefined, an Object, a Boolean, a String, a Number, or an environment record 其中的一种。
* referenced name：属性的名称
* strict reference
* `GetValue`：用于从 Reference 类型获取对应值

比如
```js
var foo = 1;

// 对应的Reference是：
var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};

GetValue(fooReference) // 1;
```
```js
var foo = {
    bar: function () {
        return this;
    }
};
 
foo.bar(); // foo

// bar对应的Reference是：
var BarReference = {
    base: foo,
    propertyName: 'bar',
    strict: false
};
```

3年过去了，还是看不懂

## this对象
> this对象代表函数运行时，自动生成的一个内部对象，只能在函数内部使用。 ——阮一峰

this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，**实际上this的最终指向的是那个调用它的对象**

这说明this关键字只与函数的执行环境有关，而与声明环境没有关系。

### this绑定规则
默认绑定、隐式绑定、显式绑定、new绑定、箭头函数

* **默认绑定**：默不满足其他的绑定方式，而执行的绑定规则。默认绑定会把this绑定到全局对象。
    ```js
    function foo(){
     var num=2;
     this.num++
     console.log(this.num)
    }
    var num=0;
    foo()//1
    ```
    上面代码中就实现了默认绑定，在foo方法的代码块中操作的是window.num++。
* **隐式绑定（上下文绑定）**：函数被调用的位置有上下文，或者是该函数的引用地址被某个对象的属性引用，并通过对象的属性直接运行该函数。此时this会被绑定成当前对象。
  ```js
    function foo(){
        console.log(this.name)
    }
    var bar={
        name:'shiny',
        foo:foo
    }
    bar.foo()//shiny
  ```
* **显示绑定，`call,apply,bind`**
  ```js
    function foo(){
        console.log(this.age)
    }
    var shiny={
       age:20
    }
    foo.call(shiny)//20

    function bar(){
    console.log(this.age)
    }
    var red={
    age:18
    }
    bar.apply(red)//18
  ```
* **new绑定**：new创建对象的过程如下
    * 创建一个空对象，从堆内存里开辟了一块内存
    * 绑定新对象的this：让构造函数中的`this指向这个空对象`，并执行构造函数函数体
    * 设置原型链：将新创建的对象的_proto_成员指向构造函数对象的prototype成员对象
    * 返回对象：如果构造函数执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象。 
* **箭头函数**：es6的this可以通过箭头函数直接绑定在该函数的执行的作用域上。箭头函数中使用的 this，其实是直接包含它的那个函数或函数表达式中的 this。
  ```js
  const obj = {
        getArrow() {
            return () => {
                // 这里的 this 是 getArrow() 中的 this，由 getArrow() 的调用方式决定
                console.log(this === obj);
            };
        }
    };
    const arrow = obj.getArrow();
    arrow();        // true
  ```
  ```js
  // ES5，由 Babel 转译
    var obj = {
        getArrow: function getArrow() {
            var _this = this;
            return function () {
                console.log(_this === obj);
            };
        }
    };
  ```
  ps： 箭头函数不能用 new调用，不能 bind() 到某个对象(虽然 bind() 方法调用没问题，但是不会产生预期效果)。

## 执行上下文
> https://github.com/mqyqingfeng/Blog/issues/8

没太看懂

## 闭包
>https://github.com/mqyqingfeng/Blog/issues/9
>https://www.liaoxuefeng.com/wiki/1022910821149312/1023021250770016

MDN对闭包的定义：闭包是指那些能够访问自由变量的函数。其中自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。

所以`闭包 = 函数 + 函数能够访问的自由变量`

简单的例子：
```js

function foo(){
    var number = 1
    function bar(){
        number++
        console.log(number)
    }
    return bar
}
var mybar = foo()
mybar() // 2
```
bar 函数可以访问变量 number，但是 number 既不是 bar 函数的**局部变量**，也不是 bar 函数的**参数**，所以 a 就是自由变量。

那么，函数 bar + bar 函数访问的自由变量 a 不就是构成了一个**闭包**。即便 foo 函数执行结束了，其内部定义的 number 变量也不能被销毁，因为 bar 函数依然引用了该变量。

每个函数在调用时会创建新的`上下文`及`作用域链`，而作用域链就是将外层（上层）上下文所绑定的变量对象逐一串连起来，使当前函数可以获取外层上下文的变量、数据等。

如果我们在函数中定义新的函数，同时将内层函数作为值返回，那么内层函数所包含的`作用域链`将会一起返回，即使内层函数在`其他上下文中执行`，函数`内部`的`作用域链`仍然保持着原有的数据，

而当前的上下文可能无法获取原先外层函数中的数据，使得函数内部的作用域链被保护起来，从而形成`“闭包”`。

例子：
```js
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0](); // 3
data[1](); // 3
data[2](); // 3
```
答案都是3。
原因: 
* data[i]函数形成了闭包。
* 因为`i`是由`var`声明的，不会产生块级作用域，且存在变量提升现象，所以函数引用的i就是全局作用域的。
* 由于全局作用域中只有一个，所以`data[n]()`引用的变量都是同一个`i`。每执行一次循环，i就变化一次，最后是3。所以打印出来全是3。

```js
var data = [];

for (let i = 0; i < 3; i++) { //如果改成let，结果是什么
  data[i] = function () {
    console.log(i);
  };
}

data[0](); // 3
data[1](); // 3
data[2](); // 3
```
* let只在let命令所在的代码块内有效。所以每执行一次循环，便会创建一个块级作用域。
* 在这个块级作用域中，你又定义了一个函数，而这个函数又引用了函数外部的i变量，那么这就产生了**闭包**，也就是说，所有块级作用域中的i都不会被销毁.
* 所以再次调用`data[n]()`时，v8就会拿出闭包中的变量i，且i的值都不同

## 参数按值传递
> https://github.com/mqyqingfeng/Blog/issues/10

* 按值传递：把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。修改函数内部的参数，不会影响函数外部的值。
简单的例子：
    ```js
    var value = 1;
    function foo(v) {
        v = 2;
        console.log(v); //2
    }
    foo(value);
    console.log(value) // 1
    ```

* 引用传递：就是传递对象的引用，函数内部对参数的任何改变都会影响该对象的值，因为两者引用的是同一个对象。
  ```js
    var obj = {
        value: 1
    };
    function foo(o) {
        o.value = 2;
        console.log(o.value); //2
    }
    foo(obj);
    console.log(obj.value) // 2
  ```
* 共享传递：在传递对象的时候，传递对象的引用的副本。
  ```js
    var obj = {
        value: 1
    };
    function foo(o) {
        o = 2;
        console.log(o); //2
    }
    foo(obj);
    console.log(obj.value) // 1
  ```

结论：在js中，参数如果是基本类型是按值传递，如果是引用类型按共享传递（传递对象的引用的副本）。