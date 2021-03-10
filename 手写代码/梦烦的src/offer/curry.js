
// 函数柯里化：能够接收多个参数的函数转化为接收单一参数的函数，并且返回接收余下参数且返回结果的新函数的技术。

function curry(fn, args) {
  var length = fn.length;
  var args = args || [];
  return function(){
    newArgs = args.concat(Array.prototype.slice.call(arguments));
    if(newArgs.length < length){
      return curry.call(this,fn,newArgs);
    }else{
      return fn.apply(this,newArgs);
    }
  }
}
function multiFn(a, b, c) {
  return a * b * c;
}
var multi = curry(multiFn);

multi(2)(3)(4);
multi(2,3,4);
multi(2)(3,4);
multi(2,3)(4);