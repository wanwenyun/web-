/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * 思路：快慢指针，让慢指针 slow 走在后面，快指针 fast 走在前面探路，找到一个不重复的元素就赋值给 slow 并让 slow 前进一步。
 */
var removeDuplicates = function(nums) {
    let slow = 0, fast = 0;
    while(fast < nums.length) {
        if(nums[slow] !== nums[fast]) {
            slow++;
            nums[slow] = nums[fast];
        }
        fast++;
    }
    return slow++;
};
// @lc code=end

