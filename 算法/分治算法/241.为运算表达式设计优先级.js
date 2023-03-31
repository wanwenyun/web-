/*
 * @lc app=leetcode.cn id=241 lang=javascript
 *
 * [241] 为运算表达式设计优先级
 */

// @lc code=start
/**
 * @param {string} expression
 * @return {number[]}
 * 1、不要思考整体，而是把目光聚焦局部，只看一个运算符。
 *    只需要思考，如果不让括号嵌套（即只加一层括号），
 *    其实就是按照「运算符」进行分割，给每个运算符的左右两部分加括号
 *    即分治算法中的"分"
 * 2、明确递归函数的定义是什么，相信并且利用好函数的定义。
 *    通过子问题的结果，合成原问题的结果  
 *    即分治算法中的"治" 
 */
let map = new Map();
var diffWaysToCompute = function(expression) {
    let res = [];
    
    // 优化点，避免重复计算 ，例如 (1 + 1) + (1 + 1 + 1) 和 (1 + 1 + 1) + (1 + 1)
    if(map.has(expression)) {
        return  map.get(expression);
    }
    
    for(let i = 0; i < expression.length; i++) {
        let c = expression[i];
        if(c === '+' || c === '-' || c === '*') {
            // ---------‘分’----------
            // 以运算符为中心，分割成两个字符串，分别递归计算
            let left = diffWaysToCompute(expression.substring(0, i)); // substring() 方法返回一个字符串在开始索引到结束索引之间的一个子集，或从开始索引直到字符串的末尾的一个子集。
            let right = diffWaysToCompute(expression.substring(i+1));

            // ---------'治'----------
            // 通过子问题的结果，合成原问题的结果
            for(let k = 0; k < left.length; k++) {
                for(let j = 0; j < right.length; j++) {
                    if(c === '+') {
                        res .push(left[k] + right[j]);
                    }
                    if(c === '-') {
                        res .push(left[k] - right[j]);
                    }
                    if(c === '*') {
                        res .push(left[k] * right[j]);
                    }
                }
            }
        }
    }
    map.set(expression, res);
    // ----------重点--------------
    // base case 递归函数必须有个 base case 用来结束递归，其实这段代码就是我们分治算法的 base case，代表着你「分」到什么时候可以开始「治」。
    // 如果 res 为空，说明算式是一个数字，没有运算符
    if (res.length === 0) {
      res.push(parseInt(expression));
    }
    return res;
};
// @lc code=end

