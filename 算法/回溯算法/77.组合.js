/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    let nums = new Array(n);
    for (var i = 0; i < n; i++) {
        nums[i] = i + 1;
    }

    // 用于记录结果
    let res = [];
    // 用于记录回溯路径
    const track = [];

    var backtrack = function(start) {
        let len = track.length;
        // 前序遍历位置
        if(len === k){
            res.push([...track]);
            return;
        }

        // 回溯算法标准框架
        for (let i = start; i < nums.length; i++) {
            // 做选择
            track.push(nums[i]);
            // 回溯遍历下一层节点
            backtrack(i+1);
            // 撤销选择
            track.pop();
        }
    }

    backtrack(0);
    return res;
};
// @lc code=end

