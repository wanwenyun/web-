/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 * 思路：-c = a + b
 * 步骤：
 * 1. 将数组由小到大排序
 * 2. 先一层循环，遍历c = nums[i]，固定等号右边
 * 3. 在循环内使用双指针两个指针L = i+1，和R = nums.length-1，找到nums[L] + nums[R] = -nums[i]，则将结果记录下来
 * 4. 若nums[L] + nums[R] < -c，则向前移动L++；nums[L] + nums[R] > -c，则向后移动R--
 */
var threeSum = function(nums) {
    const result = [];
    const len = nums.length;
    if(nums == null || len < 3) return [];//数组的长度大于3

    // 给数组排序
    nums.sort((a, b) => a - b);
    
    // 一层循环
    for(let i = 0; i < len; i++) {
        if(nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
        if( i > 0 && nums[i] === nums[i-1]) continue; // 去重
        let L = i + 1;
        let R = len - 1;
        while(L < R) {
            const sum = nums[i] + nums[L] + nums[R];
            if(sum < 0) L++;
            else if(sum > 0) R--;
            else if (sum === 0){
                result.push([nums[i], nums[L], nums[R]])
                while (L<R && nums[L] == nums[L+1]) L++; // 去重
                while (L<R && nums[R] == nums[R-1]) R--; // 去重
                L++;
                R--;
            }
        }
    }

    return result;
};
// @lc code=end

