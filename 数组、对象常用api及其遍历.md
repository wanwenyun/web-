- [数组、字符串、Object常用api](#数组字符串object常用api)
  - [数组](#数组)
  - [字符串](#字符串)
  - [Object](#object)
- [数组，对象遍历方法](#数组对象遍历方法)

# 数组、字符串、Object常用api

## 数组
（要搞清楚：参数，返回值，是否会改变原数组，数组双向绑定会拦截哪几个方法，为什么其他的不会）
* `concat`: 链接两个或者更多数据，并返回结果。
  ```js
  const array1 = ['a', 'b', 'c'];
  const array2 = ['d', 'e', 'f'];
  const array3 = array1.concat(array2);
  ```
* `every`: 对数组中的每一项运行给定的函数，如果该函数对每一项都返回true，则返回true。
* `filter`: 对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组。
* `forEach`: 对数组中的每一项运行给定函数，这个方法没有返回值。`array.forEach(function(currentValue, index, arr), thisValue)`
    没传参数二thisValue的时候，this指向`window`，如果传了参数二，this指向参数二`thisValue本身`；可以改变this的指向
    ```js
    var arr = [1, 2, 3, 4, 5];
    arr.forEach(function(item) {
      console.log(item);
    });
    ```
* `reduce`: 接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。`array.reduce(callback[, initialValue])`。callback是一个回调函数，它可以接受四个参数：accumulator（累积值），currentValue（当前值），currentIndex（当前索引）和array（原始数组）。initialValue是可选的，表示回调函数的初始累积值。
  ```js
  const sum = [1, 2, 3, 4, 5].reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  console.log(sum); // 输出: 15
  ```
  <details>
  <summary>手写reduce</summary>
  
  ```js
  Array.prototype.myReduce = (callback, initialValue) => {
      // 设置初始值
      let accumulator = initialValue !== undefined ?  initialValue : this[0];
      // 从数组的第一个元素开始迭代
    for (let i = initialValue !== undefined ? 0 : 1; i < this.  length; i++) {
      // 调用回调函数
      accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
  }
  ```
  <details>
  
* `indexOf`: 返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1。
* `lastIndexOf`: 返回在数组中搜索到的与z给定参数相等的元素的索引里最大的值。
* `reverse`: 颠倒数组中元素的顺序，原先第一个元素现在变成最后一个，同样原先的最后一个元素变成现在的第一个。 
* `pop`: 方法从数组中删除最后一个元素，并返回该元素的值。此方法会更改数组的长度。
* `shift`: 从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。
* `unshift`: 将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。
* `slice`: slice(start，end)
    1. 截取数组 [start, end)   ，从start下标开始---end-1下标结束
    2. 将数组中对应索引范围内的元素作为新元素返回。
    3. `原始的数组不会发生变化`
    ```js
      var arr1 = [1,23,44,55,66,77,888,"fff"];
      var arr2 = arr1.slice(2,4) //从index为2截取到index为4之前不包括4
      console.log(arr2); //[44,55]
      console.log(arr1); // [1,23,44,55,66,77,888,"fff"]原始数组没有被改变
    ```
* `splice`：splice(start,deleteCount,item1,item2…..);
    1. 开始项的下标，剪切长度，剪切以后最后一位开始添加数据。
    2. 如果deleteCount为0，则表示不删除元素，从start位置开始添加后面的几个元素到原始的数组里面
    3. 返回值为由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组
    4. 此方法会`改变`原数组。
```js
        var arr3 = [1,2,3,4,5,6,7,"f1","f2"];
        var arr4 = arr3.splice(2,3) //删除第三个元素以后的三个数组元素(包含第三个元素)
        console.log(arr4); //[3,4,5];
        console.log(arr3); //[1,2,6,7,"f1","f2"]; 原始数组被改变
```

* `sort`: 按照字母顺序对数组排序，支持传入指定排序方法的函数作为参数。
* `toString`: 将数组作为字符串返回。
* `valueOf`: 和toString相似，将数组作为字符串返回。
* `includes`: 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。


能改变原数组的只有这七个方法：`'push', 'pop','shift','unshift','splice','sort','reverse'`

**为什么数组的很多方法比如forEach, map, filter的回调函数的第 三个参数要传数组本身的引用？**
是为了方便开发者在回调函数中**对原始数组进行操作和访问**，提供了更多的灵活性和便利性。

## 字符串
* `indexOf(searchvalue，fromindex)` 在字符串中查找子字符串,如果存在则返回指定的子字符串值在字符串中首次出现的位置，否则返回**-1**。 `fromIndex` 可选，开始搜索的索引（从零开始）
* `lastIndexOf()` 方法可返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
* `slice(start,end)`， 范围是`[start, end)` 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。且不会改动原字符串。
  ```js
    const str = 'The quick brown fox jumps over the lazy dog.';

    console.log(str.slice(31)); // Expected output: "the lazy dog."
    console.log(str.slice(4, 19)); // Expected output: "quick brown fox"
    console.log(str.slice(-4)); // Expected output: "dog."
    console.log(str.slice(-9, -5)); // Expected output: "lazy"
  ```
* `subbstring(start,stop)` 方法用于提取字符串中介于两个指定下标之间的字符
* charAt(index) 方法返回指定索引的字符
* `concat()` 方法用于连接两个或多个字符串。返回连接后的新字符串。
  ```js
  let hello = 'Hello, '
  console.log(hello.concat('Kevin', '. Have a nice day.')) // Hello, Kevin. Have a nice day.
  ```
* `split()` 方法用于把一个字符串分割成字符串数组
* `replace()` 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
* `match()` 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
* `toUpperCase()` 方法用于把字符串转换为大写。`toLowerCase()` 方法用于把字符串转换为小写。


## Object
* `Object.assign`: 将所有可枚举属性的值从一个或多个对象复制到目标对象，并返回目标对象
    如果对象的属性`不是对象，则是深拷贝`；如果是一个`对象，则是浅拷贝`
  ```js
  const target = { a: 1, b: 2 };
  const source = { b: 4, c: 5 };

  console.log(Object.assign(target, source)); // { a: 1, b: 4, c: 5 }
  ```
* `Object.defineProperty`: 定义或修改一个对象中的属性
* `Object.defineProperties`: 定义或修改一个对象中的多个属性
* `Object.entries`: 返回一个对象自身可枚举属性的键值对，顺序与for-in循环时的顺序一致
  ```js
  const object1 = {
    a: 'somestring',
    b: 42
  };
  
  for (const [key, value] of Object.entries(object1)) {
    console.log(`${key}: ${value}`);
  }
  ```
* `Object.keys`: 获取一个对象中所有的key值(不包括不可枚举属性和Symbol属性)
* `Object.values`: 获取一个对象中所有的value值（不包括不可枚举属性和Symbol属性）
* `Object.hasOwnProperty`: 判断一个对象是否包含某个属性(不包括原型链上的属性)
* `Object.isPrototypeOf`: 判断一个对象是否在某个对象的原型链上
* `Object.create()`: 创建一个新对象


# 数组，对象遍历方法
JavaScript 中有多种遍历数组和对象的方法。这里介绍常用的几种方法：

1. `for/in，for/of` 循环：for...in 循环主要是为了遍历对象而生，不适用于遍历数组

```javascript
// 遍历数组
const arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
for (const num of arr) {
  console.log(num);
}

// 遍历对象
const obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
  console.log(key + ': ' + obj[key]);
}
const obj = { foo: 'bar', baz: 42 };
for (const prop of Object.keys(obj)) {
  console.log(prop);
}
```

2. `forEach` 方法：

```javascript
// 遍历数组
const arr = [1, 2, 3];
arr.forEach((value, index, array) => {
  console.log(value);
});

// 遍历对象
const obj = { a: 1, b: 2, c: 3 };
Object.keys(obj).forEach((key) => {
  console.log(key + ': ' + obj[key]);
});
```

3. `map` 方法：

```javascript
// 遍历数组并返回新数组
const arr = [1, 2, 3];
const newArr = arr.map((value, index, array) => {
  return value * 2;
});
console.log(newArr);

// 遍历对象并返回新数组
const obj = { a: 1, b: 2, c: 3 };
const newObj = Object.keys(obj).map((key) => {
  return { [key]: obj[key] };
});
console.log(newObj);
```

除了以上的方法，还有一些其他的方法如 `Object.values`、`Object.entries`、`for..of` 等，可以根据需求选择使用。