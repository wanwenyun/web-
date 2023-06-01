/*
 * @lc app=leetcode.cn id=55 lang=javascrip
 *
 * [55] 跳跃游戏
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 * 解题思路1：贪心算法
 * 如果能够越过最后一格，返回 true，否则返回 false。
 */
var canJump = function(nums) {
    let len = nums.length;

    let farthest = 0; // 表示当前位置能跳到的最远距离
    for(let i = 0; i < len - 1 ; i++) {
        // 不断计算能跳到的最远距离
        farthest = Math.max(farthest, i + nums[i]);
        // 可能碰到了 0，卡住跳不动了
        if(farthest <= i) {
            return false;
        }
    }
    // 判断是否能跳过最后一格
    return farthest >= len-1;
};
// @lc code=end

console.log(canJump([3,0,8,2,0,0,1]));

