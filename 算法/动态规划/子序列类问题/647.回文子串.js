/*
 * @lc app=leetcode.cn id=647 lang=javascript
 *
 * [647] 回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 * 解法二：动态规划
 * dp[i][j],表示s[i...j]是否是回文子串
 * 状态转移方程：
 * i、j不相邻：dp[i][j] = !!(s[i] === s[j] && dp[i+1][j-1])
 * i、j相邻：dp[i][j] = s[i] === s[j]
 */
var countSubstrings = function(s) {
    let n = s.length;
    let dp = new Array(n).fill(0).map(() => Array(n).fill(false));

    let res = n;

    // base case
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }

    for(let i = n-1; i >= 0; i--){
        for(let j = i+1; j < n; j++){
            // s[i],s[j]相邻
            if(j-i === 1) {
                dp[i][j] = s[i] === s[j];
            } else { //s[i],s[j]不相邻
                dp[i][j] = !!(s[i] === s[j] && dp[i+1][j-1]);
            }
            //更新结果
            if(dp[i][j]) res++;
        }
    }
    return res;
};
// @lc code=end
