/**
 * 组合继承（call+原型链）
 * 原理：通过`原型链继承`来将`this、prototype上的属性和方法`继承至子类的原型对象上。使用借用`构造函数`来继承父类通过`this声明的属性和方法`在之子类的实例属性上。
 *
优点：
1. 可以继承父类`实例`属性和方法，也能够继承父类`原型`属性和方法
2. 弥补了原型链继承中`引用属性共享`的问题
3. 可传参，可复用
缺点：
1、`会多次调用父类构造函数`，造成一定的性能问题。
 */
 function Parent(name){
     this.name = name;
     this.arr = [1,2];
 }

 Parent.prototype.getName = function(){
     console.log(this.name);
 }

 function Child(age,name){
     // 调用一次父类构造函数
     Parent.call(this,name); // 借用构造函数继承父类this什么的属性和方法到子类实例属性上
     this.age = age;
 }

 // 原型链继承，将`this`和`prototype`声明的属性/方法继承至子类的`prototype`上
 Child.prototype = new Parent('fa'); // 调用一次父类构造函数
 Child.prototype.construtor = Child;

 // 测试
var child1 = new Child('18','parent1');
var child2 = new Child('20','parent2');
child1.getName() // parent1
child2.getName() // parent2
child2.arr.push(3);
console.log(child1) // Parent { name: 'parent1', arr: [ 1, 2 ], age: '18' }
console.log(child2) // Parent { name: 'parent2', arr: [ 1, 2, 3 ], age: '20' }

