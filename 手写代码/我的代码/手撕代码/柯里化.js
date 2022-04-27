/**
 * 函数柯里化：能够接收多个参数的函数转化为接收单一参数的函数，并且返回接收余下参数且返回结果的新函数的技术。
 * 缺陷：只有当空参数时才会输出结果
 * 链接：https://juejin.im/post/5b561426518825195f499772
 */
// 不定参数
function curry (fn){
  var allArgs = []; // 用来接收参数
  return function next(){
      var args = [].slice.call(arguments);
      // 判断是否执行计算
      if(args.length > 0){
          allArgs = allArgs.concat(args); // 收集传入的参数，进行缓存
          return next;
      }else{
          return fn.apply(null, allArgs); // 符合执行条件，执行计算
      }
  } 
}
/**
 * js在获取当前变量值的时候，会根据语境，隐式调用valueOf和toString方法进行获取需要的值。
 * 解决只有当空参数时才会输出结果
 * 链接：https://juejin.im/post/5b561426518825195f499772
 */
function curry2(fn){
  var allArgs = [];
  function next(){
      var args = [].slice.call(arguments);
      allArgs = allArgs.concat(args);
      return next;
  }
  // 字符类型
  next.toString = function(){
      return fn.apply(null, allArgs);
  };
  // 数值类型
  next.valueOf = function(){
      return fn.apply(null, allArgs);
  }
  return next;
}

function multiFn() {
    var res = 1;
    for(let item of arguments){
        res = res * item;
    }
    return res;
}
var multi = curry(multiFn);
console.log(multi(2,3)(4)(1)());

var add = curry2(multiFn);
console.log(add(2)(3,4)(4));

//优化版
function add(){
    var sum = [...arguments]; //arguments是add方法的参数
    var fn = function(){
        sum.push(...arguments); //arguments是fn方法的参数
        return fn;  //执行add(1，1)时返回了fn函数给2，3执行
    }
    /**
     * toString隐式调用
     * 每个对象的toString和valueOf方法都可以被改写，
     * 每个对象执行完毕，如果被用以操作JavaScript解析器就会自动调用对象的toString或者valueOf方法 
     */
    fn.toString = function(){   
        return sum.reduce(function(a,b){return a+b;});  //a是上一次调用的返回值，b是当前正在处理的元素
    }
    return fn;  //执行add(1，1)时返回了fn函数给2，3执行
}

console.log(add(1,1)(2)(3));