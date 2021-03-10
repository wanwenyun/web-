class Parent{
    constructor(x,name){
        this.x=x;
        this.name=name;
    }

    getName(){
        console.log(this.name);
    }
}
class Child extends Parent{
    constructor(x,name,age){
        super(x,name);//调用父类的constructor(x,y)
        this.age=age;
    }
}

//  其寄生组合继承实习方式
//  function Parent (x,name) {
//     this.x = x;
//     this.name = name;
//   }
//   Parent.prototype.getName = function () {
//     console.log(this.name)
//   }
//   function Child (x,name,age) {
//     this.age = age
//     Parent.call(this, x, name)
//   }
//   Child.prototype = Object.create(Parent.prototype)
//   Child.prototype.constructor = Child
  
//   var child1 = new Child("x","y","ccg")
//   console.log(child1) // Child { x: 'x', name: 'y', age: 'ccg' }
//   child1.getName()  // y
  
//   console.log(child1 instanceof Child)  // true
//   console.log(child1 instanceof Parent) // true



var child1=new Child("x","y","ccg");
child1.getName(); // y
console.log(child1); // Child { x: 'x', name: 'y', age: 'ccg' }
