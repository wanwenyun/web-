// TODO: 实现 apply

Function.prototype.myApply = function(context) {
	if (typeof this !== 'function') {
		throw new TypeError('error')
	}

	context = context || window
	let fn = Symbol('fn')
	context[fn] = this
	let result
	if (arguments[1]) {
		result = context[fn] (...arguments[1])
	} else {
		result = context[fn]()
	}
	delete context[fn]
	return result
}

//优化 fn 可能被覆盖,不可用Symbol, 时间戳,或者用随机数
function getUUID() {
	return '__' + new Date().getTime()
}

/* 思路：apply 和 call 一样都是改变 this的指向，
两者的区别是 apply 函数的参数传递是数组的形式, call 是 */
