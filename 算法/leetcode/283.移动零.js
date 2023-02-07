/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 1. 快慢指针
 */
var moveZeroes = function(nums) {
    // 快慢指针
    let slow = 0, fast = 0;
    while(fast < nums.length) {
        if(nums[fast] !== 0) {
            nums[slow] = nums[fast];
            slow++;
        }
        fast++;
    }
    for( ; slow < nums.length; slow++) {
        nums[slow] = 0;
    }
    return nums;
};
// @lc code=end

