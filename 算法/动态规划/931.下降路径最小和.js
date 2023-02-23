/*
 * @lc app=leetcode.cn id=931 lang=javascript
 *
 * [931] 下降路径最小和
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number}
 */

// 暴力穷解法
var minFallingPathSum = function(matrix) {
    let n = matrix.length;
    let res = Infinity;

    // 终点可能在最后一行的任意一列
    for(let j = 0; j < n; j++) {
        res = Math.min(res, dp(matrix, n-1, j));
    }
    return res;

};
// @lc code=end

// dp函数的定义为：从第一行（matrix[0][..]）向下落，落到位置 matrix[i][j] 的最小路径和为 dp(matrix, i, j)。
// 状态转移方程为：dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j], dp[i-1][j+1]) + matrix[i][j]
var dp = function(matrix, i, j) {
    // 非法检查
    if(i < 0 || j < 0 || i >= matrix.length || j >= matrix[0].length) return Infinity;

    // base case 
    if(i === 0) {
        return matrix[i][j];
    }
    return  Math.min(dp(matrix, i-1, j-1), dp(matrix, i-1, j), dp(matrix, i-1, j+1)) + matrix[i][j];
}


/**
 * 动归：带备忘录的递归
 * 状态转移方程为：dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j], dp[i-1][j+1]) + matrix[i][j]
 */
var minFallingPathSum2 = function(matrix) {
    let n = matrix.length;

    let dp = new Array(n).fill().map(() => new Array(n).fill(Infinity));


    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            if(i === 0){
                // 最上面
                dp[i][j] = matrix[i][j];
            }else if(j === 0){
                // 最左边
                dp[i][j] = matrix[i][j] + Math.min(dp[i-1][j], dp[i-1][j+1]);
            }else if(j === n-1){
                // 最右边
                dp[i][j] = matrix[i][j] + Math.min(dp[i-1][j-1], dp[i-1][j]);
            }else {
                dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j], dp[i-1][j+1]) + matrix[i][j];
            }
        }
    }
    console.log( dp[n-1].sort((a, b) => a-b));
    
    return dp[n-1].sort((a, b) => a-b)[0];
};


console.log(minFallingPathSum2([[-19,57],[-40,-5]]));