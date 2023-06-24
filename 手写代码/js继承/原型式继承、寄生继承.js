/**
 * 原型式继承
 * 用ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型
缺点：
包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。
注意：
修改person1.name的值，person2.name的值并未发生改变，
并不是因为person1和person2有独立的 name 值，
而是因为person1.name = 'person1'，给person1添加了 name 值，并非修改了原型上的 name 值。
 */
function createObj(o){
    function f(){};
    f.prototype = o;
    return new f();
}

var parent = {
    name:'haha',
    arr:[1,2,3]
}

var person1 = createObj(parent);
var person2 = createObj(parent);

person1.name = 'person1';
console.log(person2.name); // kevin

person1.arr.push('taylor');
console.log(person2.arr); // [ 1, 2, 3, 'taylor' ]

/**
 * 寄生式继承
 * 缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法
 */
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}