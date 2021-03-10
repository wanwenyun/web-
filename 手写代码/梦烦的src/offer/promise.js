
// TODO: 实现 promis
// https://juejin.im/post/5b2f02cd5188252b937548ab

const STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

class myPromise {
  constructor(executor) {
    // 当前的状态
    this.state = STATE.PENDING
    // 成功的值
    this.value = undefined
    // 失败的值
    this.reason = undefined

    this.onRejectedCallBacks = []

    this.onFulfilledCallBacks = []

    let resolve = value => {
      // 状态修改为成功
      if(this.state === STATE.PENDING) {
        this.state = STATE.FULFILLED
        this.value = value
         // 一旦resolve执行，调用成功数组的函数
        this.onFulfilledCallBacks.forEach(fn => fn())
      }
    }

    let reject = reason => {
      if(this.state === STATE.PENDING) {
        this.state = STATE.REJECTED
        this.reason = reason
        // 一旦reject执行，调用失败数组的函数
        this.onRejectedCallBacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)

    } catch(e) {
      reject(e)
    }
  }
  // then 方法 有两个参数onFulfilled onRejected
  then(onFulfilled, onRejected) {
    // 声明返回的promise2
    let promise2 = new myPromise((resolve, reject) => {
      // 成功 调用 onFulfilled
      if(this.state === STATE.FULFILLED) {
        let x = onFulfilled(this.value)
        resolvePromise(promise2, x, resolve, reject)
      }

      if(this.state === STATE.REJECTED) {
        let x = onRejected(this.reason)
        resolvePromise(promise2, x, resolve, reject)
      }
      //解决异步问题 当状态state为pending时
      if(this.state === STATE.PENDING) {
        // onFulfilled传入到成功数组
        this.onFulfilledCallBacks.push(() => {
          let x = onFulfilled(this.value)
          resolvePromise(promise2, x, resolve, reject)
        })
        // onRejected传入到失败数组
        this.onRejectedCallBacks.push(() => {
          let x = onRejected(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        })
      }
    })
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 循环引用报错
  if(x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  // 防止多此调用
  let called

  // x不是null 且x是对象或者函数
  if(x !== null && ( typeof x === 'object' || typeof x === 'function')) {
    try {
      // A+规定，声明then = x的then方法
      let then = x.then

      if(typeof then === 'function') {
        then.call(x, y => {
          // 成功和失败只能调用一个
          if(called) return

          called = true
          // resolve的结果依旧是promise 那就继续解析
          resolvePromise(promise2, y, resolve, reject)
        }, err => {
          // 成功和失败只能调用一个
          if(called) return

          called = true

          reject(err)
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      // 也属于失败
      if (called) return;
      called = true;
      // 取then出错了那就不要在继续执行了
      reject(e);
    }
  } else {
    resolve(x)
  }
}