/*
 * @lc app=leetcode.cn id=198 lang=javascript
 *
 * [198] 打家劫舍
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * dp[i]表示强盗从第 i 间房子开始抢劫，到最后一间抢到的最多的钱
 * 状态转移方程：
 * 因为每个房子都有抢与不抢两种选择，所以
 * dp[i] = Math.max(dp[i+1], dp[i+2]+nums[i])
 */
var rob = function(nums) {
    let n = nums.length;
    if(n === 1) return nums[0];
    if(n === 2) return Math.max(nums[0], nums[1]);
    // 初始化dp
    dp = new Array(n+2).fill(0);

    for(let i = n-1; i >= 0; i--) {
        dp[i] =Math.max(dp[i+1], dp[i+2]+nums[i])
    }
    return dp[0];

};
// @lc code=end
/**
 * 方法2:
 * dp[i]表示强盗从0到第 i 间房子抢到的最多的钱
 * 状态转移方程：
 * 因为每个房子都有抢与不抢两种选择，所以
 * dp[i] =Math.max(dp[i-1], dp[i - 2]+nums[i])
 */
var rob2 = function(nums) {
    let n = nums.length;
    if(n === 1) return nums[0];
    if(n === 2) return Math.max(nums[0], nums[1]);
    // 初始化dp
    dp = new Array(n).fill(0);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    console.log(dp);

    for(let i = 2; i < n; i++) {
        dp[i] =Math.max(dp[i-1], dp[i - 2]+nums[i])
    }
    return dp.pop();
};

console.log(rob2([2,7,9,3,1]))