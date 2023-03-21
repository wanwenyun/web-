/*
 * @lc app=leetcode.cn id=90 lang=javascript
 *
 * [90] 子集 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 * 回溯
 * 需要先进行排序，让相同的元素靠在一起，如果发现 nums[i] == nums[i-1]，则跳过
 */
var subsetsWithDup = function(nums) {
    // 排序
    nums.sort((a, b) => a-b);

    let res = [];
    let track = [];

    /**
     * 回溯算法的核心函数，用于遍历子集问题的回溯树
     * @param {number} start - 控制树枝的遍历，避免产生重复子集
     */
    var backtrack = function(start) {
        // 前序遍历位置
        res.push([...track]);

        // 回溯算法标准框架
        for (let i = start; i < nums.length; i++) {
            if(i > start && nums[i] === nums[i-1]) {
                continue;
            } else {
                // 做选择
                track.push(nums[i]);
                // 回溯遍历下一层节点
                backtrack(i+1);
                // 撤销选择
                track.pop();
            }
        }
    }

    backtrack(0);
    return res;
};
// @lc code=end

