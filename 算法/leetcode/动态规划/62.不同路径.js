/*
 * @lc app=leetcode.cn id=62 lang=javascript
 *
 * [62] 不同路径
 */

// @lc code=start
/**
 * 状态转移方程 dp[m][n] = dp[m-1][n] + dp[m][n-1]
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    const dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for(let i = 0; i < m; i++) {
        // 初始化行
        dp[i][0] = 1;
    }
    for(let j = 0; j < n; j++) {
        // 初始化列
        dp[0][j] = 1;
    }

    for(let i = 1; i < m; i++) {
        for(let j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }

    return dp[m-1][n-1];
};
// @lc code=end
