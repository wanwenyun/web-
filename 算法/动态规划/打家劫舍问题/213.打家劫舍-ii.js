/*
 * @lc app=leetcode.cn id=213 lang=javascript
 *
 * [213] 打家劫舍 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * 首先，首尾房间不能同时被抢，那么只可能有三种不同情况：(n为房子数量，即nums长度)
 * 1. 要么都不被抢；[1, n - 2]。这种情况不用计算，因为可选择机会比后两种少，金额肯定也更小。
 * 2. 要么第一间房子被抢最后一间不抢；[0, n - 2]
 * 3. 要么最后一间房子被抢第一间不抢。[1, n-1]
 * 
 * 然后每种情况再分别按照普通的打家劫舍问题来处理即可，最后返回最大的结果
 */ 
function dpFuc(nums) {
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
var rob = function(nums) {
    let n = nums.length;
    if (n == 1) return nums[0];
    return Math.max(dpFuc(nums.slice(1, n)), dpFuc(nums.slice(0,n-1)));
};
// @lc code=end

console.log(rob([1,2,3,1]));