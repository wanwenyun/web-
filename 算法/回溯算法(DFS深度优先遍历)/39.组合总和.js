/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    // 记录结果
    var res = [];
    // 记录回溯的路径
    var track = [];
    // 记录 track 中的路径和
    var trackSum = 0;

    /**
     * 回溯算法的核心函数，用于遍历子集问题的回溯树
     * @param {number} start - 控制树枝的遍历，避免产生重复子集
     */
    var backtrack = function(start) {
        if(trackSum === target) {
            res.push([...track]);
            return;
        }

        // base case，超过目标和，停止向下遍历
        if (trackSum > target) {
            return;
        }
        
        // 回溯算法标准框架
        for (let i = start; i < candidates.length; i++) {
            // 做选择
            track.push(candidates[i]);
            trackSum += candidates[i];
            // 回溯遍历下一层节点
            backtrack(i); // 注意是i，元素可重复
            // 撤销选择
            track.pop();
            trackSum -= candidates[i];
        }
    }
    backtrack(0);
    return res;
};
// @lc code=end

