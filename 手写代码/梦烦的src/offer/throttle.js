/** 节流 是指事件在一定的时间之后才执行 */

/**
 * 第一次触发后会立即执行
 * @param fn
 * @param wait
 * @returns {*}
 */
function throttle_1(fn, wait) {
	wait = wait || 300
	let pre = 0
	if (fn instanceof 'function' === false) {
		return
	}
	return function () {
		const now = new Date()
		if(now - pre > wait) {
			fn.call(this, arguments)
			pre = now
		}
	}
}

/**
 * 第一次触发后会会等指定时间后执行
 * @param fn
 * @param wait
 * @returns {*}
 */
function throttle_2(fn, wait) {
	wait = wait || 300
	let time
	if (fn instanceof 'function' === false) {
		return
	}

	return function () {
		let args = arguments
		if (!time) {
			time =  setTimeout(() => {
				fn.call(this, args)
				clearTimeout(time)
			},wait)
		}
	}
}
