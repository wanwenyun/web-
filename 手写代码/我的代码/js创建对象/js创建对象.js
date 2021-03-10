/**
 * 工厂模式
 * 优点：完成了返回一个对象的要求。
 * 缺点：
 * 1. 对象无法识别，因为所有的实例都指向一个原型Object，无法得知来自Person
 * 2. 每次通过Person创建对象的时候，所有的getName方法都是一样的，但是却存储了多次，浪费资源。
 */
function Person(name) {
    var o = new Object();
    o.name = name;
    o.getName = function () {
        console.log(this.name);
    };
    return o;
}

var person1 = Person('kevin');

/**
 * 构造函数模式
 * 优点：
 * 1. 可以通过new 关键字来创建对象实例
 * 2. 通过constructor或者instanceof可以识别对象实例的类别
 * 缺点：
 * 1. 多个实例的getName方法都是实现一样的效果，但是却存储了很多次
 */
function Person(name) {
    this.name = name;
    this.getName = function () {
        console.log(this.name);
    };
}

var person1 = new Person('kevin');
console.log(person1 instanceof Person);

/**
 * 原型模式
 *  优点：
1. 原型上的方法（比如：getName（））可以被共享，所有的实例的getName（）方法指向同一个
2. 可以动态的添加原型对象的方法和属性，并直接反映在对象实例上。
缺点：
1. `引用类型`属性会被`实例`共享
2. 所有的`方法`都是`共享`的，没有办法创建实例自己的属性和方法，也没有办法像构造函数那样`传递参数`
 */
function Person(name) {}

Person.prototype = {
    constructor: Person,
    name: 'kevin',
    friends: ['hah','enen'],
    getName: function () {
        console.log(this.name);
    }
};

Person.prototype.showFriends = function() {
    console.log(this.friends)
  }

var person1 = new Person();
var person2 = new Person();
person1.friends.push('test');
person1.showFriends(); // [ 'hah', 'enen', 'test' ]
person2.showFriends(); // [ 'hah', 'enen', 'test' ]

/**
 * 组合模式：`构造函数模式`与`原型模式`双剑合璧。
 * 优点：
1. 解决了原型模式对于引用对象的缺点
2. 解决了原型模式没有办法传递参数的缺点
3. 解决了构造函数模式不能共享方法的缺点
 */
function Person(name) {
    this.name = name;
    this.friends = ['lilei'];
}

Person.prototype = {
    constructor: Person,
    getName: function () {
        console.log(this.name);
    }
};

var person1 = new Person('test');
var person2 = new Person('test2')
person2.friends.push('hahah');
person1.getName(); // test
console.log(person1); // Person { name: 'test', friends: [ 'lilei' ] }
console.log(person2); // Person { name: 'test2', friends: [ 'lilei', 'hahah' ] }

/**
 * 动态原型模式：
 * 优点：
1. 可以在初次调用构造函数的时候就完成原型对象的修改
2. 修改能体现在所有的实例中
 */
function Person(name) {
    this.name = name;
    if(typeof this.getName != 'function') {
      Person.prototype.getName = function(){
        console.log(this.name);
      }
    }
  }

  var person1 = new Person('test');
  person1.getName(); // test

/**
 * 寄生构造函数模式
 */
function Person(name) {
    var o = new Object()
    o.name = name
    o.getName = function() {
      console.log(this.name)
    }
    return o
  }
  var peron1 = new Person('hanmeimei');
  peron1.getName(); // hanmeimei

/**
 * 稳妥构造模式
 */
function Person(name) {
    var o = new Object()
    o.getName = function() {
      console.log(name)
    }
    return o;
  }
  var person1 = new Person('hanmeimei');
  console.log(person1.name);  // undefined
  person1.getName(); //hanmeimei