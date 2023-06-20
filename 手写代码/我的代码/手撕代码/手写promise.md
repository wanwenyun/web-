- [手写promise，实现then链式调用，并可处理定时任务](#手写promise实现then链式调用并可处理定时任务)
- [手写promise.all()](#手写promiseall)
- [手写promise.race()](#手写promiserace)
- [进阶： 实现返回前k个结果的`promise.race(promises, k)`](#进阶-实现返回前k个结果的promiseracepromises-k)

<!-- 
class Promise{
  constructor(executer){//构造函数constructor里面是个执行器
    this.status = 'pending';//默认的状态 pending
    this.value = undefined//成功的值默认undefined
    this.reason = undefined//失败的值默认undefined
    //状态只有在pending时候才能改变
    let resolveFn = value =>{
      //判断只有等待时才能resolve成功
      if(this.status == pending){
        this.status = 'fulfilled';
        this.value = value;
      }
    }
    //判断只有等待时才能reject失败
    let rejectFn = reason =>{
      if(this.status == pending){
        this.status = 'reject';
        this.reason = reason;
      }
    }    
    try{
      //把resolveFn和rejectFn两个函数传给执行器executer
      executer(resolveFn, rejectFn);
    }catch(e){
      reject(e);//失败的话进catch
    }
  }
  then(onFufilled, onReject){
    //如果状态成功调用onFufilled
    if(this.status = 'fulfilled'){
      onFufilled(this.value);
    }
    //如果状态失败调用onReject
    if(this.status = 'reject'){
      onReject(this.reason);
    }
  }
} 

-->

### 手写promise，实现then链式调用，并可处理定时任务
```js
class MyPromise {
  // 构造方法
  constructor(executor) {

      // 初始化值
      this.initValue()
      // 初始化this指向
      this.initBind()
      try {
        // 执行传进来的函数
        executor(this.resolve, this.reject)
      } catch (e) {
        // 捕捉到错误直接执行reject
        this.reject(e)
      }
  }

  initBind() {
      // 初始化this
      this.resolve = this.resolve.bind(this)
      this.reject = this.reject.bind(this)
  }

  initValue() {
      // 初始化值
      this.PromiseResult = null // 终值
      this.PromiseState = 'pending' // 状态
      
      // 用来处理定时器情况
      this.onFulfilledCallbacks = [] // 保存成功回调
      this.onRejectedCallbacks = [] // 保存失败回调
  }

  resolve(value) {
      // state是不可变的
      if (this.PromiseState !== 'pending') return
      // 如果执行resolve，状态变为fulfilled
      this.PromiseState = 'fulfilled'
      // 终值为传进来的值
      this.PromiseResult = value
      // 执行保存的成功回调
      while (this.onFulfilledCallbacks.length) {
          this.onFulfilledCallbacks.shift()(this.PromiseResult) // shift()取出数组的第一个元素
      }
  }

  reject(reason) {
      // state是不可变的
      if (this.PromiseState !== 'pending') return
      // 如果执行reject，状态变为rejected
      this.PromiseState = 'rejected'
      // 终值为传进来的reason
      this.PromiseResult = reason
      // 执行保存的失败回调
      while (this.onRejectedCallbacks.length) {
          this.onRejectedCallbacks.shift()(this.PromiseResult)
      }
  }

  then(onFulfilled, onRejected) {
    // 接收两个回调 onFulfilled, onRejected
    
    // 参数校验，确保一定是函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }


    var thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = cb => {
        try {
            const x = cb(this.PromiseResult)
            if (x === thenPromise) {
                // 不能返回自身哦
                throw new Error('不能返回自身。。。')
            }
            if (x instanceof MyPromise) {
                // 如果返回值是Promise
                // 如果返回值是promise对象，返回值为成功，新promise就是成功
                // 如果返回值是promise对象，返回值为失败，新promise就是失败
                // 谁知道返回的promise是失败成功？只有then知道
                x.then(resolve, reject)
            } else {
                // 非Promise就直接成功
                resolve(x)
            }
        } catch (err) {
            // 处理报错
            reject(err)
            throw new Error(err)
        }
      }

      if (this.PromiseState === 'fulfilled') {
          // 如果当前为成功状态，执行第一个回调
          resolvePromise(onFulfilled)
      } else if (this.PromiseState === 'rejected') {
          // 如果当前为失败状态，执行第二个回调
          resolvePromise(onRejected)
      }else if (this.PromiseState === 'pending') {
          // 如果状态为待定状态，暂时保存两个回调
          this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
          this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
      }
    })

    // 返回这个包装的Promise
    return thenPromise;
  }
}
```
测试：
```js
// 链式调用 输出 200
const p3 = new Promise((resolve, reject) => {
  resolve(100)
}).then(res => 2 * res, err => console.log(err))
  .then(res => console.log(res), err => console.log(err))

// 链式调用 输出300
const p4 = new Promise((resolve, reject) => {
  resolve(100)
}).then(res => new Promise((resolve, reject) => resolve(3 * res)), err => console.log(err))
  .then(res => console.log(res), err => console.log(err))
```
### 手写promise.all()

- 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
- 如果所有Promise都成功，则返回成功结果数组
- 如果有一个Promise失败，则返回这个失败结果

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      throw new TypeError('参数必须为数组');
    }

    const results = [];
    let fulfilledCount = 0;

    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then(result => {
          results[i] = result;
          fulfilledCount++;

          if (fulfilledCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    }
  });
}
```

### 手写promise.race()
- 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
- 哪个Promise最快得到结果，就返回那个结果，无论成功失败

```js
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError('参数必须是一个数组'));
      return;
    }

    for (let promise of promises) {
      Promise.resolve(promise)
        .then(value => {
          resolve(value);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
}
```

### 进阶： 实现返回前k个结果的`promise.race(promises, k)`

```js
function promiseRaceWithLimit(promises, k) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      reject(new TypeError('参数必须是一个数组'));
      return;
    }

    const results = [];
    let count = 0;

    for (let i = 0; i < promises.length; i++) {
      const promise = Promise.resolve(promises[i]);

      promise.then(value => {
        results[i] = value;
        count++;

        if (count === k) {
          resolve(results.slice(0, k));
        }
      }).catch(error => {
        reject(error);
      });
    }
  });
}
```
