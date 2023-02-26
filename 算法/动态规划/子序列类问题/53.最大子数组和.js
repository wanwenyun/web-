/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * 1. 滑动窗口
 * 2. 动归
 * 3. 前缀和
 */

// 滑动窗口解法
var maxSubArray = function(nums) {
    let left = 0, right = 0;

    let windowSum = 0; // 窗口内元素和
    let res = -Infinity;
    while(right < nums.length){
        // 即将进入窗口的元素
        let num = nums[right];

        // 更新窗口
        windowSum += num;

        right++;

        // 更新答案
        res = Math.max(windowSum, res);

        /**
         * 收缩窗口（此处难点）
         * nums 中有正有负，这种情况下元素和最大的那个子数组一定是以正数开头的
         * （如果以负数开头的话，把这个负数去掉，就可以得到和更大的子数组了，与假设相矛盾）
         * 那么此时我们需要穷举所有以正数开头的子数组，计算他们的元素和，找到元素和最大的那个子数组。
         * 
         * 所以算法只有在窗口元素和大于 0 时才会不断扩大窗口，
         * 并且在扩大窗口时更新答案，这其实就是在穷举所有正数开头的子数组，寻找子数组和最大的那个
         **/ 
        while(windowSum < 0){
            // 即将离开窗口的元素
            let tmp = nums[left];
            windowSum -= tmp;
            left++;
        }
    }
    return res;
};
// @lc code=end

/**
 * 动归解法
 *  dp[i]定义：表示以nums[i]结尾的最大子数组和 
 *  状态转移方程：dp[i] = Math.max(dp[i-1] + nums[i], nums[i])
 * 
 * 为什么不是dp[i] = Math.max(dp[i-1] + nums[i], dp[i-1])呢？
 * 原因：因为子数组一定是连续的，所以dp[i] 有两种「选择」，
 * 1. 要么与前面的相邻子数组连接，形成一个和更大的子数组 => dp[i-1] + nums[i]
 * 2. 要么不与前面的子数组连接，自成一派，自己作为一个子数组 > nums[i]
 */
var maxSubArray2 = function(nums) {
    let dp = new Array(nums.length).fill(-Infinity);

    if(nums.length < 1) return nums[0];

    // base case
    dp[0] = nums[0];

    for(let i = 1; i < nums.length; i++) {
        dp[i] = Math.max(dp[i-1]+nums[i], nums[i]);
    }

    return dp.sort((a,b) => a-b).pop();
}


/**
 * 前缀和解法
 * dp[i]定义：表示以nums[i]结尾的最大子数组和 
 * preSum[i]定义：表示i位置结尾的前缀和
 * dp[i] = preSum[i+1] - min(preSum[0..i])
 * */ 
var maxSubArray3 = function(nums) {
    if(nums.length <= 1) return nums[0];
    let preSum = NumArray(nums);
    console.log(preSum);

    let res = -Infinity;

    let minPreSum = Infinity;

    for(let i = 0; i < nums.length; i++) {
        minPreSum = Math.min(minPreSum, preSum[i]);
        res = Math.max(res, preSum[i + 1] - minPreSum);
    }
    return res;
}

var NumArray = function(nums) {
    let preSum = new Array(nums.length + 1);
    preSum[0] = 0;
    for(let i = 0; i < nums.length; i++) {
        preSum[i + 1] = preSum[i] + nums[i];
    }
    return preSum;
};

console.log(maxSubArray3([-2,-1]));