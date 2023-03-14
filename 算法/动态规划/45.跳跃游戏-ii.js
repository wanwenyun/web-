/*
 * @lc app=leetcode.cn id=45 lang=javascript
 *
 * [45] 跳跃游戏 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * dp[i]表示从索引 i 跳到最后一格，至少需要 dp[i] 步
 * 动态规划：dp[i] = Math.max(dp[i], 1 + dp[j])
 */
var jump = function(nums) {
    let len = nums.length;
    let dp = new Array(len).fill(Infinity);
    //最后一个格子只需要0步就能到达
    dp[len-1] = 0;
    // 从倒数第二个格子开始
    for(let i = len - 2 ; i >= 0; i--) {
         //如果格子里的数字大于等于到最后一个格子的距离，一步就能跳过去
        if(nums[i] >= len - 1 - i) {
            dp[i] = 1;
        }else {
            // 如果一步跳不过去，就从能跳到的最大位置依次尝试，直到找到最优解
            for(let j = i + nums[i]; j > i; j--) {
                dp[i] = Math.min(dp[i], dp[j] + 1)
            }
        }
    }
    //返回从起点跳到终点的最优解
    return dp[0];
};
// @lc code=end

