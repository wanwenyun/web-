/*
 * @lc app=leetcode.cn id=398 lang=javascript
 *
 * [398] 随机数索引
 */

// @lc code=start
/**
 * @param {number[]} nums
 */
var Solution = function(nums) {
    this.nums = nums;
    this.length = nums.length;

    // 用map来记录相同元素的下标
    this.map = {};

    for(let i = 0; i < nums.length; i++) {
        if(this.map[nums[i]]) {
            this.map[nums[i]] = [...this.map[nums[i]], i];
        }else {
            this.map[nums[i]] = [i];
        }
    }
};

/** 
 * @param {number} target
 * @return {number}
 */
Solution.prototype.pick = function(target) {
    // 获取目标元素的所有下标
    let arr = this.map[target];
    // 随机生成arr的下标
    let rand =  Math.floor(Math.random()*(arr.length));
    return arr[rand];
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.pick(target)
 */
// @lc code=end

