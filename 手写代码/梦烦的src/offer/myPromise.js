//手写promise
const PENDING = 'pending'

const RESOLVED = 'resolved'

const REJECT = 'reject'

function myPromise(fn) {
	const that = this
	//初始化状态
	that.state = PENDING
	that.val = null
	that.resolvedCallbacks = [] // 用来保存then 方法中，第一个参数
	that.rejectCallbacks = [] // 用来保存then 方法中，第二个参数

	function resolve(value) {
		if (value instanceof myPromise) {
			return value.then(resolve, reject)
		}
		setTimeout(() => {
			if (that.state === PENDING) {
				that.state = RESOLVED
				that.val = value
				that.resolvedCallbacks.map(callback => callback(that.val))
			}
		}, 0)
	}

	function reject(value) {
		setTimeout(() => {
			if (that.state === PENDING) {
				that.state = REJECT
				that.val = value
				that.rejectCallbacks.map(callback => callback(that.val))
			}
		}, 0)

	}

	try {
		fn(resolve, reject)
	} catch (e) {
		reject(e)
	}
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
	const that = this
	onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
	onRejected = typeof onRejected === 'function' ? onRejected : r => {
		throw r
	}

	if (that.state === PENDING) {
		that.resolvedCallbacks.push(onFulfilled)
		that.rejectCallbacks.push(onRejected)
	}

	if (that.state === RESOLVED) {
		onFulfilled(that.val)
	}
	if (that.state === REJECT) {
		onRejected(that.val)
	}
}

new myPromise((resolve, reject) => {
	setTimeout(() => {
		resolve(1)
	}, 0)
}).then(value => {
	console.log(value)
})
