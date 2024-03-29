/*
 * @lc app=leetcode.cn id=47 lang=javascript
 *
 * [47] 全排列 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    // 排序
    nums.sort((a,b) => a-b);
    // 用来标记选择过了的元素
    let used = new Array(nums.length).fill(false);

    let res = [];
    let track = [];

    var backtrack = function(used, track) {
        // 触发结束条件
        if (track.length === nums.length) {
            res.push([...track]); // 不能这样写res.push(track)，这是浅拷贝
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            // 剪枝：排除已经选择过了的
            if(used[i]) continue;
            // 剪枝：固定相同的元素在排列中的相对位置，如果前面的相邻相等元素没有用过，则跳过
            if(i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

            track.push(nums[i]);
            used[i] = true;
            backtrack(used, track);
            track.pop();
            used[i] = false;
        }
    }

    backtrack(used, track);
    return res;
};
// @lc code=end

