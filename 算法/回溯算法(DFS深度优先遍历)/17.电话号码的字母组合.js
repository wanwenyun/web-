/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 * 无重复不可复选，排列/组合类型。但没有撤销选择的过程
 * 得先构造数字-字符的map
 */
var letterCombinations = function(digits) {
    const map = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z'],
    }

    const digitsArr = digits.split('');
    let res = [];

    function backtrack(start, sb) {

        if(sb.length === digitsArr.length) {
            res.push(sb.join(''));
            return;
        }

        let choose = map[digitsArr[start]];

        // 这里用回溯
        for(let j = 0; j < choose.length; j++) {
            // 做选择
            sb.push(choose[j]);
            // 递归下一层
            backtrack(start + 1, sb)
            // 撤销选择
            sb.pop();
        }
    }

    if (digitsArr.length === 0) {
        return res;
    }

    // 从 digits[0] 开始进行回溯
    backtrack(0, []);
    return res;
};

console.log(letterCombinations('7'))
// @lc code=end

