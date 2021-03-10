//TODO: JS的bind方法
//1.bind 是 Function 原型链中 Function.prototype的一个属性,它是一个函数,
// 用于修改this的指向,并合并参数传递给原函数,返回一个新函数
//2, bind 返回的函数可以被new调用,这时提供的this将被忽略,指向生成的新对象
//3

Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }
  //获取所有的参数
  const args = [...arguments].slice(1)
  let self = this
  let bound = function () {
    let boundArgs = [...args, ...arguments]
    //如果是new
    if (this instanceof bound) {
      if (self.prototype) {
        function Empty() {
        }

        //拷贝原型对象

        Empty.prototype = self.prototype
        bound.prototype = new Empty()
      }
      // 上面那段可以换成 bound.prototype = Object.create(self.prototype)
      let result = self.apply(this, boundArgs)
      let isObject = typeof result === 'object' && result !== null
      let isFunction = typeof result === 'function'
      if (isObject || isFunction) {
        return result
      }

      return this
    } else {
      // apply修改this指向，把两个函数的参数合并传给self函数，并执行self函数，返回执行结果
      return self.apply(context, boundArgs)
    }
  }
  return bound
}


var obj = {
  name: '轩辕Rowboat',
};

function original(a, b) {
  console.log('this', this); // original {}
  console.log('typeof this', typeof this); // object
  this.name = b;
  console.log('name', this.name); // 2
  console.log('this', this);  // original {name: 2}
  console.log([a, b]); // 1, 2
}

var bound = original.myBind(obj, 1);
var newBoundResult = new bound(2);
console.log(newBoundResult, 'newBoundResult'); // original {name: 2}
