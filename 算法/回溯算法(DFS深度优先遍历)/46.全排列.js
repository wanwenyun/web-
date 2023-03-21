/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let used = new Array(nums.length).fill(false);
    let res = [];
    let track = [];

    // 路径：记录在 track 中
    // 选择列表：nums 中不存在于 track 的那些元素（used[i] 为 false）
    // 结束条件：nums 中的元素全都在 track 中出现
    var backtrack = function(nums, track, used) {
        // 触发结束条件
        if (track.length === nums.length) {
            res.push([...track]); // 不能这样写res.push(track)，这是浅拷贝
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            // 排除已经选择过了的
            if(used[i]) continue;

            // 做选择
            track.push(nums[i]);
            used[i] = true;

            // 进入下一层选择
            backtrack(nums, track, used);

            // 撤销选择，回到上一层
            track.pop();
            used[i] = false;
        }
    }

    backtrack(nums, track, used);
    console.log(res);
    return res;
};


// @lc code=end

