/**
 * 1. 创建一个全选的对象
 * 2. 这个对象会被执行[[Prototype]]（也就是__proto__）链接
 * 3. 生成的新对象会绑定到函数调用的this
 * 4.通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上
 * 5.如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)
 * ，那么new表达式中的函数调用会自动返回这个新的对象。
 * */

function myNew() {
	const Constructor = [].shift().call(arguments)

	if(typeof Constructor !== "function") {
		throw new TypeError('error')
	}
	myNew.target = Constructor
	//新建对象的__proto__对象指向构造函数的prototype
	let newObj = Object.create(Constructor.prototype)
	let args = [...arguments].slice(1)

	//用创建的对象调用该函数,检查返回值,如果是对象或者函数,则直接返回该结果
	//用创建的对象的this 使用构造函数跑一遍
	let result = Constructor.apply(newObj, args)
	let isObject = typeof result === 'object' && result !== null
	let isFunction = typeof  result === 'function'
	if(isFunction || isObject) {
		return result
	}

	return newObj
}

function a () {this.b = 'a'}
let b = new a()
let c = myNew(a)
console.log(b, c)
