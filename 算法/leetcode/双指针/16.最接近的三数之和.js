/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// 双指针 + 排序
var threeSumClosest = function(nums, target) {
    const sortNums = nums.sort((a, b) => a - b);
    const len = nums.length;

    let res = Infinity;

    for(let i = 0 ; i < len ; i++){
        let head = i + 1;
        let end = len - 1;
        if (i > 0 && sortNums[i] == sortNums[i - 1]) { // 保证和上一次枚举的元素不相等
            continue;
        }
        while(head < end) {
            let sum = sortNums[i] + sortNums[head] + sortNums[end];
            if(sum === target) return target;

            if(Math.abs(sum - target) < Math.abs(res - target)) res = sum;

            if(sum < target) {
                head++;
            }
            if(sum > target) {
                end --;
            }
        }
    }
    return res;
};
// @lc code=end
