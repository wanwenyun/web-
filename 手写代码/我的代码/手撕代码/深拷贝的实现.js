/**
* 深拷贝：深拷贝的原理就是定义一个新的对象，遍历源对象的属性并赋给新对象的属性
* 浅拷贝：B复制了A，当修改A时，如果B也跟着变了，说明这是浅拷贝
* 直接将对象赋值给一个新变量，实际上是将存储在栈中的值赋值给新变量，如果是基本数据类型，则直接赋值对应的值，如果是引用类型，则赋值的是地址。
*/

/**
 * for/for in
 * @param {*} obj 
 */
function deepCopy_1(obj) {
    var copy_obj = {};
    for(let item in obj){
        copy_obj[item] = obj[item];
    }
    return copy_obj;
}

/**
 * JSON.parse/stringfy
 * 缺点：undefined、function、正则、Error类型没有拷贝成功
 * @param {*} obj 
 */
function deepCopy_2(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Object.assign (Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。)
 * 特殊(es6)Object.assign是一种浅拷贝，但是可以通过Object.assign({},obj1,obj2...)的方法深拷贝。
 * @param {*} obj 
 */
function deepCopy_3(obj) {
    return Object.assign({},obj);
}

/**
 * 解构赋值也是一种深拷贝 
 * @param {*} obj 
 */
function deepCopy_4(obj) {
    return {...obj};
}

/**
 * 深度优先遍历实现深拷贝完整版 即用递归来实现
 * @param {*} obj 
 * @returns 
 * 为了解决循环引用的问题（自身有个key对应的value又是自身），我们必须记录要拷贝的这个对象之前是不是已经被深拷贝过一次，如果已经被拷贝过一次，就直接返回拷贝的时候对应的内存空间即可（不然会进入递归的无限循环，造成栈内存溢出）。
 */

// getType方法是用来获取变量准确的类型，引用类型包括Object 类型、Array 类型、Date 类型、RegExp 类型、Function 类型
const getType = (obj) => Object.prototype.toString.call(obj).slice(8,-1);

// isObject方法是用来判断是否是引用类型, 注意Object 类型、Array 类型、Date 类型、RegExp 类型这四种类型用typeof判断结果都是'object'
const isObject = (target) =>
    (typeof target === 'object' || typeof target === 'function') && target !== null;    // date regExp 的typeof都会被判断为'object'

function deepClone(target, map = new Map()) {
    if (!!map.get(target)) {
        return map.get(target);
    }

    if(target instanceof Date) {
      return new Date(target);
    } else if(target instanceof RegExp) {
      return new RegExp(target);
    } else if(typeof target === 'function') {
      return new Function('return ' + target.toString());
    } else if (isObject(target)) {  // 只写这一个isObject的if，那如果初始的target他是基本数据类型呢，你也要返回他的值进行赋值吧，所以要多加下面一个else return target的判断        
        // 判断是否是引用类型，如果是引用类型的拷贝 要另起一个内存空间
        let cloneObj = Array.isArray(target) ? [] : {};
        // 需要记录当前这个引用类型target被拷贝过
        map.set(target, cloneObj);   // target 对应的value设置成 拷贝后的内存地址。
        for (key in target) {
            // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in hasOwnProperty是拿到自己本身有的key，不会拿到原型链上继承来的key
            if (target.hasOwnProperty(key)) { // 这个判断的目的是为了避免访问非target本身的属性（比如继承来的属性），也可以使用getOwnPropertyNames()这个方法
              cloneObj[key] = deepClone(target[key], map);
            }
        }
        return cloneObj;
    }
     else {
      return target;
    }
}

/**
 * 广度优先遍历-深拷贝，队列
 * @param {*} params 
 */
const _toString = Object.prototype.toString
// function getType(obj) {
//    return _toString.call(obj).slice(8, -1)
// }
function deepCopyBFS(obj) {
	if (obj === null) return null;
    if (typeof obj !== "object") return obj;
	if (obj.constructor === Date) return new Date(obj);

	let res = {};
  	const origin = [obj];
  	const copy = [res];
  	const vistied = new Set([obj]);

  	while (origin.length) {
  	  const _obj = origin.shift();
  	  const copyObj = copy.shift();

  	  Object.keys(_obj).forEach(k => {
  	    const item = _obj[k];
  	    if (getType(item) === 'Object' || getType(item) === 'Array') {
  	      if (vistied.has(item)) {
  	        copyObj[k] = item;
  	      } else {
  	        vistied.add(item);
  	        copyObj[k] = getType(item) === 'Object' ? {} : [];
  	        origin.push(item);
  	        copy.push(copyObj[k]);
  	      }
  	    } else if (typeof item === 'function') {
  	      copyObj[k] = eval(`(${item.toString()})`);
  	    } else {
  	      copyObj[k] = item;
  	    }
  	  })
  	}
  	return res;
}



const symbolKey = Symbol('key1'); 
let test = {
	num: 0,
	str: '',
	boolean: true,
	unf: undefined,
	nul: null,
	obj: {
		name: '我是一个对象',
		id: 1,
		innerObj: {
			text: '没想到吧，里面还有',
		}
	},
	arr: [0, 1, 2],
	func: function() {
		console.log('我是一个函数')
	},
	date: new Date(0),
	reg: new RegExp('/我是一个正则/ig'),
	err: new Error('我是一个错误'),
    symbolKey: 'this is symbol'
}

// let obj2 = deepClone(test);
// test.str = '修改后';
// test.arr.push(9);
// console.log(obj2, test);

const book2 = {
	title: "You Don't Know JS",
	price: 45,
};
book2.circular = book2;
console.log(deepClone(book2).title) // 应为"You Don't Know JS"
