/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start

// 暴力递归法
var fib = function(n) {
    if(n < 2) return n;
    return fib(n-1)+fib(n-2);
};

/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    if(n <= 1) return n;
    const dp = [0, 1]
    for(var i = 2; i <= n; i++) {
        // 自底向上计算
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
};
// @lc code=end

/**
 * 优化版本： 滚动数组优化，只维护长度为2的数组
 */
var fib2 = function(n) {
    if(n <= 1) return n;
    const dp = [0, 1]
    //滚动数组 dp[i]只和dp[i-1]、dp[i-2]相关，只维护长度为2的滚动数组，不断替换数组元素
    let sum = null
    for(var i = 2; i <= n; i++) {
        sum = dp[0] + dp[1];
        dp[0] = dp[1];
        dp[1] = sum;
    }
    return sum;
};