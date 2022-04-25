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
 * 深度拷贝  递归   func、date、reg 和 err 并没有复制成功，因为它们有特殊的构造函数。
 * 深度优先遍历
 * @param {*} obj 
 */
function deepCopy(obj) {
    let objClone = Array.isArray(obj)?[]:{};
    if(obj && typeof obj==="object"){
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                //判断ojb子元素是否为对象，如果是，递归复制
                if(obj[key] && typeof obj[key] === "object"){
                    objClone[key] = deepCopy(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}

/**
 * 深度优先遍历实现深拷贝完整版
 * @param {*} obj 
 * @returns 
 */

function getType(obj){
    return Object.prototype.toString.call(obj).slice(8,-1)
}

// 深度优先遍历思想实现拷贝函数, arr存放所有已访问的父级节点
// 循环节点有两种情况，一种是父级引用，另一种是同级引用
function DFSdeepCopy(obj,arr = []){
    const type = getType(obj)
    let _obj = {}
    if(['Array','Object'].includes(type)){
        if(type === 'Array'){
            _obj = []
        }
        let index = arr.indexOf(obj)
        if(index === -1){
            arr.push(obj)
            for(let item in obj){
                _obj[item] = DFSdeepCopy(obj[item],arr)
            }
        }else{
            _obj = arr[index]
        }
    }else if(type === 'Function'){
        _obj = obj
    }else{
        _obj = obj
    }
    return _obj
}

/**
 * 广度优先遍历-深拷贝，队列
 * @param {*} params 
 */
const _toString = Object.prototype.toString
function getType(obj) {
   return _toString.call(obj).slice(8, -1)
}
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


// var obj = {name:'jojo',age:200,sex:'male'};
// var obj1 = deepCopy(obj);
// obj1.name = 'haha';
// console.log(obj,obj1);

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
	err: new Error('我是一个错误')
}

let obj2 = DFSdeepCopy(test);
test.str = '修改后';
test.arr.push(9);
console.log(obj2, test);
