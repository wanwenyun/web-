/**
 * 优点：
1. 避免了`引用类型`的属性被所有`实例共享`
2. 可以在 Child 中向 Parent 传参

缺点：
1. 只能继承父类通过`this声明的属性/方法`（实例属性和方法）。`不能`继承父类`prototype上的属性/方法`（原型的属性和方法）。
2. 无法实现函数`复用`，每个子类都有父类实例函数的副本，影响性能
 */
function Parent (name) {
    this.arr = ['kevin', 'daisy'];
    this.name = name;
}
Parent.prototype.doSomthing = function() {
    console.log('parent do something!');
}

function Child (name, parentName) {
    Parent.call(this,parentName); // 相当于Parent这个函数在Child中执行了遍，并且将所有有this绑定的变量都切换到了Child上
    this.name = name;
}

// test
var child1 = new Child('child1','parent1');
child1.arr.push('yayu');
console.log(child1.name); // child1
console.log(child1.arr); // ["kevin", "daisy", "yayu"]
var child2 = new Child('child2','parent2');
console.log(child2.name); // child2
console.log(child2.arr); // ["kevin", "daisy"]
child2.doSomthing(); // child2.doSomthing is not a function