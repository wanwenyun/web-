/**
 * 寄生组合式继承
 * 原理：用一个 F 空的构造函数去取代执行了 Parent 这个构造函数
优点：
1. 这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。
2. 与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。
 */
function Parent(name){
    this.name = name;
    this.arr = [1,2];
}

Parent.prototype.getName = function(){
    console.log(this.name);
}

function Child(age,name){
    Parent.call(this,name); // 借用构造函数继承父类this什么的属性和方法到子类实例属性上
    this.age = age;
}

// 与组合继承的区别
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child


//test
var child1 = new Child('18', 'child1');
var child2 = new Child('20', 'child2');
child2.arr.push(3);
console.log(child1); // Parent { name: 'child1', arr: [ 1, 2 ], age: '18' }
console.log(child2); // Parent { name: 'child2', arr: [ 1, 2, 3 ], age: '20' }


/**
 * 封装一下
 * 
 */
// 原型式
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

//寄生式
function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);