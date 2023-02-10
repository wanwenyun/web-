/*
 * @lc app=leetcode.cn id=904 lang=javascript
 *
 * [904] 水果成篮
 */

// @lc code=start
/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function(fruits) {
    const window = {};
    let left = 0, right = 0;
    let res = 0;
    if(fruits.length <= 2) {
        return fruits.length;
    }

    while(right < fruits.length) {
        // c 是将移入窗口的字符
        let c = fruits[right];
        // 增大窗口
        right++;
        
        // 进行窗口内数据的一系列更新
        window[c] = (window[c] || 0) + 1;

        if(Object.keys(window).length <= 2) {
            let tmp = Object.values(window).reduce((a, b) => a + b, 0);
            res = Math.max(tmp, res);
        }

        while (Object.keys(window).length > 2) { // 当采摘的水果种类大于2种时，便收缩窗口
            // d 是将移出窗口的字符
            let d = fruits[left];
            // 缩小窗口
            left++;
            // 进行窗口内数据的一系列更新
            window[d]--;
            if(window[d] === 0) delete window[d];
        }
    }
    return res;
};
// @lc code=end

console.log(totalFruit([3,3,3,3,3,3]));