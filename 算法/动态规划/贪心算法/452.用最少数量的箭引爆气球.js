/*
 * @lc app=leetcode.cn id=452 lang=javascript
 *
 * [452] 用最少数量的箭引爆气球
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 * 与435题相似，只需找到无重叠区间的个数有多少即可
 */
var findMinArrowShots = function(points) {
    if(points.length === 1) return 1;
    // 升序排序
    points.sort((a,b) => a[1] - b[1]);

    // res用来记录不相交的区间的个数，至少有一个不相交，就是本身
    let res = 1;
    // 排序后，第一个区间就是 x
    let x_end = points[0][1];
    for(let point of points) {
        let start = point[0];

        if(start > x_end){
            res++;
            x_end = point[1];
        }
    }
    return res;
};
// @lc code=end

