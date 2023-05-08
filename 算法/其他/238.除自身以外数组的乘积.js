/*
 * @lc app=leetcode.cn id=238 lang=javascript
 *
 * [238] 除自身以外数组的乘积
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 * 构造前缀乘Left[n+1] 和后缀乘Right[n+1]
 * answer[i] = Left[i-1] * Right[i+1]
 */
var productExceptSelf = function(nums) {
    let len = nums.length;
    // 前缀乘
    let left = new Array(len + 1).fill(1);
    // 后缀乘
    let right = new Array(len + 1).fill(1);

    let answer = [];
    for(let i = 0 ; i < len ; i++) {
        left[i + 1] = left[i] * nums[i];
    }

    for(let i = len - 1 ; i > 0 ; i--) {
        right[i] = right[i + 1] * nums[i];
    }

    console.log(left, right)
    for(let i = 0 ; i < len ; i++) {
        answer[i] = left[i] * right[i+1];
    }

    return answer;
};
// @lc code=end

console.log(productExceptSelf([1,2,3,4]));
