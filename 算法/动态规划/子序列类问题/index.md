- [子序列问题解题模版](#子序列问题解题模版)
  - [第一种思路，一维dp数组](#第一种思路一维dp数组)
  - [第二种思路，二维dp数组](#第二种思路二维dp数组)
- [相关题目整理](#相关题目整理)


子序列问题相对子串、子数组问题会难一些，因为子序列是**不连续的**。

一般来说，子序列问题都是让你求一个**最长子序列**，因为最短子序列就是一个字符。

既然要用动归，那么就要定义`dp数组`，找`状态转移关系`。两种思路模版，就是dp数组定义的两种思路。
# 子序列问题解题模版

## 第一种思路，一维dp数组
```js
let n = arr.length;
let dp = new Array(n);

for(let i = 0; i < n; i++){
    for(let j = 0; j < i ; j++) {
        dp[i] = 最值(dp[i], dp[j] + ...);
    }
}
```
`最长递增子序列`和`最大子数组`都可以用这个套路。

在子数组`arr[0...i]`中，我们要求的子序列（比如，最长递增子序列）的长度是`dp[i]`

## 第二种思路，二维dp数组
```js
let n = arr.length;
let dp = new Array(n).map(item => item = new Array(n));

for(let i = 0; i < n; i++){
    for(let j = 0; j < n; j++) {
        if(arr[i] === arr[j]) {
            dp[i][j] = dp[i][j] + ...;
        }else {
            dp[i][j] = 最值(...);
        }
    }
}
```
涉及**两个**字符串/数组的子序列用这种思路多一些，比如`最长公共子序列`和`编辑距离`问题

或者只涉及**一个**字符串/数组的情景，比如`回文子序列`问题。

涉及**两个**字符串/数组的子序列，dp数组定义为：在子数组`arr1[0...i]`和`arr2[0...j]`中，我们要求的子序列长度为`dp[i][j]`

涉及**一个**字符串/数组的子序列，dp数组定义为：在子数组`array[i...j]`中，我们要求的子序列的长度为dp[i][j]
# 相关题目整理
1. 最长递增子序列
   
    LC300. 最长递增子序列

    LC354. 俄罗斯套娃信封问题
2. 最大子数组
   
    LC53. 最大子数组和
3. 最长公共子序列
   
    LC1143. 最长公共子序列
4. 回文子序列
   
   LC516. 最长回文子序列