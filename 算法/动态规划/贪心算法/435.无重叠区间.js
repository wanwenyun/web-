/*
 * @lc app=leetcode.cn id=435 lang=javascript
 *
 * [435] 无重叠区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 * 贪心算法核心：选择最早结束的区间
 * 1、从区间集合 intvs 中选择一个区间 x，这个 x 是在当前所有区间中结束最早的（end 最小）。先升序排序。
 * 2、把所有与 x 区间相交的区间从区间集合 intvs 中删除。
 * 3、重复步骤 1 和 2，直到 intvs 为空为止。之前选出的那些 x 就是最大不相交子集。
 */
var eraseOverlapIntervals = function(intervals) {
    if(intervals.length === 1) return 0;
    // 升序排序
    intervals.sort((a,b) => a[1] - b[1]);

    // res用来记录不相交的区间的个数，至少有一个不相交，就是本身
    let res = 1;
    // 排序后，第一个区间就是 x
    let x_end = intervals[0][1];
    for(let interval of intervals) {
        let start = interval[0];

        if(start >= x_end){
            res++;
            x_end = interval[1];
        }
    }
    return intervals.length - res;
};
// @lc code=end

