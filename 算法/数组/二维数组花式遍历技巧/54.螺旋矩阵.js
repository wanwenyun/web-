/*
 * @lc app=leetcode.cn id=54 lang=javascript
 *
 * [54] 螺旋矩阵
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if (matrix.length === 0) return []
    let res = [];
    let top = 0, right = matrix[0].length - 1, bottom = matrix.length - 1, left = 0;
    while(top < bottom && left < right) {
        // 上边, 从左到右，所以i=left； y轴固定为top，y轴由matrix[][]中的第一个中括号决定
        for(let i = left; i < right; i++) res.push(matrix[top][i]);
        // 右边，从上到下，所以i=top；x轴固定为right,x轴由matrix[][]中的第二个中括号决定
        for(let i = top; i < bottom; i++) res.push(matrix[i][right]);
        // 下边，从右到左，所以i=right；y轴固定为bottom，y轴由matrix[][]中的第一个中括号决定
        for(let i = right; i > left; i--) res.push(matrix[bottom][i]);
        // 左边，从下到上，所以i=bottom; x轴固定为left, x轴由matrix[][]中的第二个中括号决定
        for(let i = bottom; i > top; i--) res.push(matrix[i][left]);

        // 四条边同时往内收缩。
        top++;
        left++;
        right--;
        bottom--;
    }

    //因为是按顺时针推入结果数组的，所以剩下的一行，必然是从左至右进入结果；剩下的一列，必然是从上至下进入结果
    if (top === bottom) // 剩下一行，从左到右依次添加
        for (let i = left; i <= right; i++) res.push(matrix[top][i]);
    else if (left === right) // 剩下一列，从上到下依次添加
        for (let i = top; i <= bottom; i++) res.push(matrix[i][left]);
    return res;
};
// @lc code=end

