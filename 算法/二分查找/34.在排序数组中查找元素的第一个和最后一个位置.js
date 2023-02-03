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
// var searchRange = function(nums, target) {
//     const len = nums.length;
//     if(len === 0 ) return [-1,-1];

//     let start, end = null;
//     for(let i = 0 ; i < len ; i++) {
//         if(nums[i] === target && (nums[i-1] !== target || i === 0) ) {
//             start = i;
//             end = i;
//         }
//         if(nums[i] === target && nums[i-1] === target) {
//             end = i;
//         }
//         if(nums[i] < target) continue;
//         if(nums[i] > target) break;
//     }
//     if(start !== null && end !== null) return [start, end];
//     return [-1, -1];
// };

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

