/*
 * @lc app=leetcode.cn id=64 lang=javascript
 *
 * [64] 最小路径和
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 * 动态规划
 * dp[i][j]表示在grid[i][j]位置上的路径和
 * 状态转移方程：dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grip[i][j]
 */
var minPathSum = function(grid) {
    let m = grid.length;
    let n = grid[0].length;
    // 初始化dp
    let dp = new Array(m).fill(0).map(item => item = new Array(n).fill(0));
    dp[0][0] = grid[0][0];
    if(m >1){
        for(let i = 1; i < m; i++) {
            dp[i][0] = dp[i-1][0] + grid[i][0];
        }
    }
    if(n >1) {
        for(let i = 1; i < n; i++) {
            dp[0][i] = dp[0][i-1] + grid[0][i];
        }
    }

    for(let i = 1; i < m; i++) {
        for(let j = 1; j < n; j++){
            dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
        }
    }

    return dp[m-1][n-1];
};
// @lc code=end

console.log(minPathSum([[1,2,3],[4,5,6]]));

