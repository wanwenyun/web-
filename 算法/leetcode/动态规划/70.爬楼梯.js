/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if(n <= 3) return n;
    let dp = [0,1,2,3];
    for(var i = 4; i <= n; i++){
        dp[i] = dp[i-1] + dp[i-2]; 
    }

    return dp[n];
};
// @lc code=end

