/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 二分查找，左、右边界
const left_bound = (nums, target) => {
    let left = 0;
    let right = nums.length - 1; // 注意
    
    while (left <= right) { // 注意
        let mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            right = mid - 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1; // 注意
        }
    }
    if (left >= nums.length || nums[left] != target) {
        return -1;
    }
    return left;
}

const right_bound = (nums, target) => {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        let mid = left + (right - left) / 2;
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] == target) {
            // 这里改成收缩左侧边界即可
            left = mid + 1;
        }
    }
    if (right < 0 || nums[right] != target) {
        return -1;
    }
    return right;
}

var searchRange = function(nums, target) {
    return [left_bound(nums, target), right_bound(nums, target)];
};
// @lc code=end

