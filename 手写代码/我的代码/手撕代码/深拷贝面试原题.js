/**
 * 实现一个深拷贝
 *
 * 要求：
 * 1、使用原生 js 实现
 * 2、注意编码规范
 * 3、不允许使用 JSON.stringify 
 * 4、兼容对象、数组多层嵌套的情况
 *
 * 加分项：
 * 1、处理“循环引用”的问题，如 `a.circular = a`
 * 2、处理“拷贝两个相同的引用却最终指向不同的对象”的问题，如 `b = {};a = { b: b, bCopy: b }`
 * 3、处理对象属性名为 Symbol 的情况
**/
function deepClone(target) {

}


/* 测试用例1 */
// const book = {
//   title: "You Don't Know JS",
//   price: 45,
// };
// const arr = [[0], 1];
// const originObj = {
//   book: book,
//   arr: arr,
//   attr1: undefined,
//   attr2: null,
//   attr3: 123,
//   attr4: 'haha',
// };
// const clonedObj = deepClone(originObj);
// originObj.book.price = 0;
// console.log(clonedObj.book.price); // 应为45
// arr[0].push(3);
// console.log(clonedObj.arr); // 应为[[0], 1]


/* 测试用例2（处理“循环引用”的问题） */
// const book2 = {
//   title: "You Don't Know JS",
//   price: 45,
// };
// book2.circular = book2;
// console.log(deepClone(book2).title) // 应为"You Don't Know JS"


/* 测试用例3（处理“拷贝两个相同的引用却最终指向不同的对象”的问题） */
// const book3 = {};
// const originObj2 = { book3: book3, book3Copy: book3 };
// const clonedObj2 = deepClone(originObj2);
// clonedObj2.book3.price = 2;
// console.log(clonedObj2.book3Copy.price); // 应为2


/* 测试用例4（处理对象属性名为 Symbol 的情况） */
// const symbolKey = Symbol('key1');
// const originObj3 = { [symbolKey]: 'this is symbol' };
// console.log(deepClone(originObj3)[symbolKey]); // 应为"this is symbol"


/**
 * 题解
 */

// 深拷贝分为两种，一种是object里面就是基本类型的数据，另一种是object里面可能又嵌套了object，所以必须要了解基本类型和引用类型的区别
// 基本类型的变量是存放在栈区的（栈区指内存里的栈内存）当 变量传值时，内存中产生新的副本，即进行克隆。相当于const a = 3; const b = a , b和a是放在不同的内存地址的，但是他们的值都是3.
// 而引用类型是赋值的时候内存中不产生新的副本，让新变量指向同一个对象.比较两个引用类型的数据是否相等，是比较两个变量指向的引用对象的内存地址是否相同。
// 举个例子
// const test = {
//  name = 'wan'; 
// }
// const book = {
//   title: "You Don't Know JS",
//   price: 45,
//   test: test,
// };
// 分析book是一个对象，深拷贝一个book，需要让新的变量cloneBook和book指向的内存空间是不一样的，但是不同内存空间里存的值是一样的。
// 所以我们需要新开辟一个对象内存来做。相当于代码里的let cloneObj = Array.isArray(target) ? [] : {};
// 接着我们遍历book的key，发现他里面是有title,price,test对应的三个key
// 首先看一下title，他对应的value是字符串，即基本数据类型。基本数据类型对应的赋值都是会新开辟一个内存空间的，所以就对应到你的代码cloneObj[key] = target[key];这个判断里
// 同理，price也是。而test这个key，他对应的value又是一个对象，这时候，我们不能直接cloneObj[key] = target[key]，因为target[key]是一个引用类型（Array、Object），所以此时我们需要递归
// 就进入了cloneObj[key] = deepClone(target[key], map);的判断。
// 到以上应该可以理解

// 接下来，我们来做循环引用的解决思路
// const book2 = {
//   title: "You Don't Know JS",
//   price: 45,
// };
// book2.circular = book2;

//为了解决循环引用的问题（自身有个key对应的value又是自身），我们必须记录要拷贝的这个对象之前是不是已经被深拷贝过一次，如果已经被拷贝过一次，就直接返回拷贝的时候对应的内存空间即可（不然会进入递归的无限循环，造成栈内存溢出）。
//1. 对象object的key不能是引用类型，所以必须要用到Map类型，而Map和WeakMap的区别最大的在于WeakMap的key只能是引用类型，而Map既能是引用
//类型也可以是普通类型,另外weakmap有个自动垃圾回收机制。（https://wjrsbu.smartapps.cn/zhihu/article?id=266054976&isShared=1&_swebfr=1&_swebFromHost=baiduboxapp）

// isObject方法是用来判断是否是引用类型, 注意Object 类型、Array 类型、Date 类型、RegExp 类型这四种类型用typeof判断结果都是'object'
const isObject = (target) =>
    (typeof target === 'object' || typeof target === 'function') && target !== null;    // date regExp 的typeof都会被判断为'object'
function deepClone(target, map = new Map()) {
    if (!!map.get(target)) {
        return map.get(target);
    }

    if(target instanceof Date) {
      return new Date(target);
    } else if(target instanceof RegExp) {
      return new RegExp(target);
    } else if(typeof target === 'function') {
      return new Function('return ' + target.toString());
    } else if (isObject(target)) {  // 只写这一个isObject的if，那如果初始的target他是基本数据类型呢，你也要返回他的值进行赋值吧，所以要多加下面一个else return target的判断        
        // 判断是否是引用类型，如果是引用类型的拷贝 要另起一个内存空间
        let cloneObj = Array.isArray(target) ? [] : {};
        // 需要记录当前这个引用类型target被拷贝过
        map.set(target, cloneObj);   // target 对应的value设置成 拷贝后的内存地址。
        for (key in target) {
            // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in hasOwnProperty是拿到自己本身有的key，不会拿到原型链上继承来的key
            if (target.hasOwnProperty(key)) {
              cloneObj[key] = deepClone(target[key], map);
            }
        }
        return cloneObj;
    }
     else {
      return target;
    }
}