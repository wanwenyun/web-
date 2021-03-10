/**
要求设计 LazyMan 类，实现以下功能

LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food

考察点：
* 面向对象思想与设计，包括类的使用等
* 对象方法链式调用的理解和设计
* 小部分设计模式的设计
* 因为存在“重复逻辑”，考察代码的解耦和抽象能力
* 逻辑的清晰程度以及其他编程思维

思路：
* 先从最简单的，我们可以封装一些基础方法，比如 log 输出、封装 setTimeout 等
* 因为 LazyMan 要实现一系列调用，且调用并不是顺序执行的，比如如果 sleepFirst 出现在调用链时，优先执行；同时任务并不是全部都同步执行的，因此我们应该实现一个任务队列，这个队列将调度执行各个任务
* 因此每次调用 LazyMan 或链式执行时，我们应该将相关调用方法加入到（push）任务队列中，储存起来，后续统一被调度
* 在写入任务队列时，如果当前的方法为 sleepFirst，那么需要将该方法放到队列的最头处，这应该是一个 unshift 方法

*/

class LazyManClass {
    constructor(name) {
        this.taskList = [];//任务队列，用来存储任务
        this.name = name;
        console.log(`Hi I am ${this.name}`);
        setTimeout(() => {
            this.next();
        }, 0);
    }
    eat (name) {
        var that = this;
        var fn = (function (n) {
            return function () {
                console.log(`I am eating ${n}`)
                that.next();
            }
        })(name);
        this.taskList.push(fn);
        return this;
    }
    sleepFirst (time) {
        var that = this;
        var fn = (function (t) {
            return function () {
                setTimeout(() => {
                    console.log(`等待了${t}秒...`)
                    that.next();
                }, t * 1000);  
            }
        })(time);
        this.taskList.unshift(fn);
        return this;
    }
    sleep (time) {
        var that = this
        var fn = (function (t) {
            return function () {
                setTimeout(() => {
                    console.log(`等待了${t}秒...`)
                    that.next();
                }, t * 1000); 
            }
        })(time);
        this.taskList.push(fn);
        return this;
    }
    next () {
        var fn = this.taskList.shift();
        fn && fn();
    }
}
function LazyMan(name) {
    return new LazyManClass(name);
}
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(4).eat('junk food');