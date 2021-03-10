// TODO: 实现call函数


Function.prototype.myCall = function(context) {
	if (typeof this !== 'function') {
		throw new TypeError('Error')
	}

	context = context || window
	//防止覆盖this的属性
	let fn = Symbol('fn')
	context[fn] = this

	const agrs = [...arguments].slice(1)
	const result = context[fn](...agrs)
	delete context[fn]
	return result
}

//优化 fn 可能被覆盖,不可用Symbol, 时间戳,或者用随机数
function getUUID() {
	return '__' + new Date().getTime()
}

// 思路: call 的作用是用传入的对象作为 this 调用函数
//  1. 先判断当前的调用对象是否是函数
// 将该函数临时挂到传入的对象上，（注意：函数命名需要防止覆盖对象原来的属性）
// 获取传入的参数， 然后调用该函数， 
// 最后删除对象上的该函数

Function.prototype.Call = function (context) {
	if(typeof this !== 'function') {
		throw new TypeError('error')
	}

	context = context || window
	const fn =  Symbol('fn')
	context[fn] = this
	const arguments = [...arguments].slice(1)
	const result = context[fn](...arguments)
	delete context[fn]
	return result
}