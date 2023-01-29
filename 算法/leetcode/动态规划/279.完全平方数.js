/*
 * @lc app=leetcode.cn id=279 lang=javascript
 *
 * [279] 完全平方数
 */

// @lc code=start
/**
 * 状态转移方程 dp[i] = Math.min(dp[i - j*j] + 1, dp [i])
 * 其中i为n，j为完全平方数（例， 3*3=9， 3为完全平方数）
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
    const dp = [...Array(n)].map((_) => 0); //初始化dp数组 当n为0的时候
    for (let i = 1; i <= n; i++) {
        dp[i] = i; // 最坏的情况，dp[i] = i, 例dp[3] = 1+1+1
        for (let j = 1; i - j*j >= 0; j++) {
            dp[i] = Math.min(dp[i], dp[i - j*j] + 1);
        }
    }
    return dp[n];
};
// @lc code=end

