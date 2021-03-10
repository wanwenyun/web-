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
                if(obj[key]&&typeof obj[key] ==="object"){
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
 * 深拷贝完全版，递归
 * 深度优先遍历
 * @param {*} obj 
 */
function deepCopy_full(obj) {
	let copyed_obj = []
	function _deepCopy(obj) {
		if(!obj || obj !== 'object') return obj

		//判断该对象是否被拷贝过,拷贝过则返回
		for (let i = 0; i < copyed_obj.length; i++) {
			if (copyed_obj[i].target === obj) {
				return copyed_obj[i].copyObj
			}
		}
		
		let type = type(obj)
		let copy_obj
		switch (type) {
			case 'date': return new Date(obj)
			case 'regExp': return new RegExp(obj)
			case 'array':
				copy_obj = []
				break
			case 'object':
				copy_obj = {}
				break
		}
		copyed_obj.push({target: obj[key], copy_obj: copy_obj})
		for(let key in obj) {
			if(obj.hasOwnProperty(key)) {
				copy_obj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
			}

		}
		return copy_obj
	}
	return _deepCopy(obj)
}

/**
 * 广度优先遍历-深拷贝，队列
 * @param {*} params 
 */
function deepCopyBFS(obj) {
	if (obj === null) return null;
    if (typeof obj !== "object") return obj;
	if (obj.constructor === Date) return new Date(obj);
	
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
		id: 1
	},
	arr: [0, 1, 2],
	func: function() {
		console.log('我是一个函数')
	},
	date: new Date(0),
	reg: new RegExp('/我是一个正则/ig'),
	err: new Error('我是一个错误')
}

let obj2 = deepCopy_full(test)
console.log(obj2)