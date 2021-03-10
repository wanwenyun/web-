
//实现一个类可以完成事件 on, once, trigger, off

class EventEmitter{
	constructor() {
		this._events ={}
	}
	on(event, callback) {
		//获取该事件的所有callback 函数
		let callbacks =  this._events[event] || []
		//将当前的callback加入
		callbacks.push(callback)
		this._events[event] = callbacks
		return this
	}
	off(event, callback) {
		//获取该事件的所有callback 函数
		let callbacks =  this._events[event] || []
		//将当前的callback加入
		this._events[event] = callbacks && callbacks.filter(fn => fn !== callback)
		return this
	}
	once(event, callback) {
		//改写回调函数,调用完马上注销
		let wrapFunc = (...args) => {
			callback.apply(this, args)
			this.off(event, wrapFunc)
		}
		this.on(event, wrapFunc)
		return this
	}
	trigger(...event) {
		//获取该事件的所有callback 函数
		let callbacks =  this._events[event] || []
		let args = [...event].slice(1)
		callbacks.forEach(fn => fn.apply(this, args))
		return this
	}
}

let emitter = new EventEmitter()

function a() {
	console.log('a')
}
function b() {
	console.log('b')
}
function c() {
	console.log('c')
}
function d(...a) {
	console.log('d',...a)
}

emitter.on('event-a', a).on('event-b', b).once('event-b', c).on('event-b',d)

emitter.trigger('event-a')
console.log('.....')
emitter.trigger('event-b')
console.log('.....')
emitter.trigger('event-b')

