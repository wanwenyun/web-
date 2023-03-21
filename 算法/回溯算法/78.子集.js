/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 * 回溯算法
 */
var subsets = function(nums) {
    // 用于记录结果
    let res = [];
    // 用于记录回溯路径
    const track = [];

     /**
     * 回溯算法的核心函数，用于遍历子集问题的回溯树
     * @param {number} start - 控制树枝的遍历，避免产生重复子集
     */
    var backtrack = function(start) {
        // 前序遍历位置，每个节点的值都是一个子集
        res.push([...track]);

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

