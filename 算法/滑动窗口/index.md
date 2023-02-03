>参考链接：https://labuladong.github.io/algo/di-ling-zh-bfe1b/wo-xie-le--f02cd/

滑动窗口算法的思路非常简单，就是维护一个窗口，不断滑动，然后更新答案。

算法的大概思路如下：
```js
let left = 0, right = 0;

while (right < s.size()) {
    // 增大窗口
    window.add(s[right]);
    right++;
    
    while (window needs shrink) {
        // 缩小窗口
        window.remove(s[left]);
        left++;
    }
}
```

时间复杂度是`o(N)`

但滑动窗口的难点在于，比如说如何向窗口中添加新元素，如何缩小窗口，在窗口滑动的哪个阶段更新结果。即便你明白了这些细节，也容易出 bug，找 bug 还不知道怎么找。

滑动窗口很多时候都是在处理**字符串**相关的问题

下面就是一位大佬总结出来的滑动窗口代码框架：

**有两个字符串进行比较的情况**
```js
/* 滑动窗口算法框架 */
var slidingWindow = function(s, t) {

    const need = {}; // 用来记录t中字符出现次数，方便后续的判断
    const window = {}; // 记录「窗口」中的相应字符的出现次数。
    for (let a of t) {
        need[a] = (need[a] || 0) + 1;//统计t中字符频数
    }

    let left = 0, right = 0;

    let valid = 0; // valid 变量表示窗口中满足 need 条件的字符个数

    while (right < s.length) {
        // c 是将移入窗口的字符
        let c = s[right];
        // 增大窗口
        right++;
        // 进行窗口内数据的一系列更新
        ...

        /*** debug 输出的位置 ***/
        console.log(`window: [${left}, ${right})\n`);
        
        // 判断左侧窗口是否要收缩
        while (window needs shrink) {
            // d 是将移出窗口的字符
            let d = s[left];
            // 缩小窗口
            left++;
            // 进行窗口内数据的一系列更新
            ...
        }
    }
}
```

**只有一个字符串的情况**
```js
var slidingWindow = function(s) {
    const window = {};
    
    let left = 0, right = 0;
    while (right < s.length) {
        // c 是将移入窗口的字符
        let c = s[right];
        // 增大窗口
        right++;
        // 进行窗口内数据的一系列更新
        ...

        /*** debug 输出的位置 ***/
        console.log(`window: [${left}, ${right})\n`);
        
        // 判断左侧窗口是否要收缩
        while (window needs shrink) {
            // d 是将移出窗口的字符
            let d = s[left];
            // 缩小窗口
            left++;
            // 进行窗口内数据的一系列更新
            ...
        }
    }
}
```

**窗口大小固定的情况**
```js
var slidingWindow = function(s, k) {
    const window = {};
    let left = 0, right = 0;

    while(right < k) { // k为窗口大小
        // 进行窗口内数据的一系列更新
        ...
        right++;
    }

    // 额外的代码逻辑
    ...

    while (right < s.length) { // 固定窗口大小，不断向后移动
        // 进行窗口内数据的一系列更新
        ...
        left++;
        right++;
    }
}
```