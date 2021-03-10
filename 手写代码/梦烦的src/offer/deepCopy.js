// 浅拷贝 和深拷贝

/**
 * 浅拷贝
 * @param src_obj
 */
function shallowCopy(src_obj) {
	let copy_obj = {}

	for (let key in src_obj) {
		if (src_obj.hasOwnProperty(key)) {
			copy_obj[key] = src_obj[key]
		}
	}
	return copy_obj
}

/**
 * Object.assign
 * @param src_obj
 */
function shallowCopy_2(src_obj) {
	return Object.assign(src_obj)
}


/**
 * ...
 * @param src_obj
 */
function shallowCopy_3(src_obj) {
	return {...src_obj}}

function isObject(o) {
	return (typeof o === 'object' || typeof o === 'function') && o !== null
}

/**
 * 深度拷贝  递归   func、date、reg 和 err 并没有复制成功，因为它们有特殊的构造函数。
 * @param src_obj
 */
function deepCopy_1(src_obj) {
	let copy_obj = Array.isArray(src_obj) ? [] : {}
	for (let key in src_obj) {
		if (src_obj.hasOwnProperty(key)) {
			if (typeof src_obj[key] === 'object') {
				copy_obj[key] = deepCopy(src_obj[key])
			} else if (src_obj[key] !== undefined) {
				copy_obj[key] = src_obj[key]
			}
		}
	}

	// Reflect.ownKeys(src_obj).forEach(key => {
	// 	copy_obj[key]=isObject(src_obj[key]) ? deepCopy(src_obj[key]) : src_obj[key]
	// })
	return copy_obj
}


/**
 * function  undefined  循环引用 symbol
 * @param src_obj
 * @returns {any}
 */
function deepCopy_2(src_obj) {
	return JSON.parse(JSON.stringify(src_obj))
}


/**
 * 解决循环引用
 * @param obj
 */
function deepCopy_3(obj) {
	let copyed_obj = [] //存放已经拷贝过的对象

	function _deepCopy(obj) {
		if (typeof obj !== 'object' || obj === null) {
			return obj
		}
		//判断该对象是否被拷贝过,拷贝过则返回
		for (let i = 0; i < copyed_obj.length; i++) {
			if (copyed_obj[i].target === obj) {
				return copyed_obj[i].copyObj
			}
		}
		let copy_obj = Array.isArray(obj) ? [] : {}
		//放入当前拷贝对象
		copyed_obj.push({target: obj, copyObj: copy_obj})
		for (let key in obj) {
			if (typeof obj[key] === 'object') {
				copy_obj[key] = _deepCopy(obj[key])
			} else if (obj[key] !== undefined) {
				copy_obj[key] = obj[key]
			}
		}
		return copy_obj
	}

	return _deepCopy(obj)
}



function type(obj) {
	let TYPE= {
		'[object Boolean]': 'boolean',
		'[object Number]': 'number',
		'[object String]': 'string',
		'[object Function]': 'function',
		'[object Array]': 'array',
		'[object Date]': 'date',
		'[object RegExp]': 'regExp',
		'[object Undefined]': 'undefined',
		'[object Null]': 'null',
		'[object Object]': 'object'
	}
	return TYPE[Object.prototype.toString.call(obj)]
}

function deepCopy(obj) {
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

/*let test = {
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
	// err: new Error('我是一个错误')
}

let obj2 = deepCopy(test)
console.log(obj2)*/


let a = {
	arr: [1, 2, 3, {key: '123'}],//数组测试
};
a.self = a //循环引用测试
a.common1 = {name: 'ccc'}
a.common2 = a.common1 //相同引用测试
let c = deepCopy(a)
c.common1.name = 'changed'
console.log(c)
