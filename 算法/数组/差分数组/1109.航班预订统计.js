/*
 * @lc app=leetcode.cn id=1109 lang=javascript
 *
 * [1109] 航班预订统计
 */

// @lc code=start
/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 * 思路：差分数组
 */

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

var corpFlightBookings = function(bookings, n) {
    let nums = new Array(n).fill(0);

    let df = new Difference(nums);

    for(let booking of bookings) {
        let i = booking[0] - 1;
        let j = booking[1] - 1;
        let val = booking[2];
        df.increment(i, j, val);
    }

    return df.result();
};
// @lc code=end

