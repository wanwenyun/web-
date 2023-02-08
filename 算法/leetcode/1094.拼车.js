/*
 * @lc app=leetcode.cn id=1094 lang=javascript
 *
 * [1094] 拼车
 */

// @lc code=start

class Difference {
    /* 构造函数：输入一个初始数组，区间操作将在这个数组上进行 */
    constructor(nums) {
        this.nums = nums;
        this.diff = new Array(nums.length);
        // 根据初始数组构造差分数组
        this.diff[0] = nums[0];
        for (let i = 1; i < nums.length; i++) {
            this.diff[i] = nums[i] - nums[i - 1];
        }
    }

    /* 给闭区间 [i, j] 增加 val（可以是负数）*/
    increment(i, j, val) {
        this.diff[i] += val;
        if (j + 1 < this.diff.length) { // 说明是对 nums[i] 及以后的整个数组都进行修改，那么就不需要再给 diff 数组减 val 了
            this.diff[j + 1] -= val;
        }
    }

    /* 返回结果数组 */
    result() {
        let res = new Array(this.diff.length);
        // 根据差分数组构造结果数组
        res[0] = this.diff[0];
        for (let i = 1; i < this.diff.length; i++) {
            res[i] = res[i - 1] + this.diff[i];
        }
        return res;
    }
}

/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
var carPooling = function(trips, capacity) {
    // 最多有 1001 个车站
    let nums = new Array(1001).fill(0);

    let df = new Difference(nums);

    for(let trip of trips) {
        let val = trip[0];
        let i = trip[1];
        let j = trip[2] - 1;
        df.increment(i, j, val);
    }

    let res = df.result();

    for (let i = 0; i < res.length; i++) {
        if (capacity < res[i]) {
            return false;
        }
    }
    return true;
};
// @lc code=end

