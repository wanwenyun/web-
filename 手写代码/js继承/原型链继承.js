
/**
 * 原型链继承
 * 缺点：
1. 子类实例会`共享`父类`引用对象`，这样如果不小心修改了原型对象中的`引用类型`属性，
那么所有子类创建的实例对象都会`受到影响`(这点从修改child1.arr可以看出来)
2. 子类无法向父类传参。子类型无法给超类型传递参数，
在面向对象的继承中，我们总希望通过 var child = new Child('son', 'father'); `让子类去调用父类的构造器来完成继承`。
而不是通过像这样 new Parent('father') 去调用父类。*/
function Parent (name) {
    this.name = name;
    this.arr = [1,2];  // 测试引用类型被共享
}
Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child (name) {
    this.name = name
}

Child.prototype = new Parent('fa');
Child.prototype.constructor = Child;

/**
 * 测试
 */
var child1 = new Child('son1'); 
child1.arr.push('test');
var child2 = new Child('son2'); 
child1.getName(); // son1
child2.getName(); // son2
console.log(child1.arr); // [ 1, 2, 'test' ]
console.log(child2.arr); //[ 1, 2, 'test' ]