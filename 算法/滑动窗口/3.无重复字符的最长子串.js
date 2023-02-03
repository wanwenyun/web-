/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */
// 单个字符串的情况
// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const window = {};
    
    let left = 0, right = 0;
    let res = 0;
    while (right < s.length) {
        // c 是将移入窗口的字符
        let c = s[right];
        // 增大窗口
        right++;
        // 进行窗口内数据的一系列更新
        window[c] = (window[c] || 0) + 1;

        /*** debug 输出的位置 ***/
        console.log(`window: [${left}, ${right})\n`);
        
        // 判断左侧窗口是否要收缩
        while (window[c] > 1) { // 如果窗口中有重复发字符了，就收缩窗口
            // d 是将移出窗口的字符
            let d = s[left];
            // 缩小窗口
            left++;
            // 进行窗口内数据的一系列更新
            window[d]--;
        }
        // 在这里更新结果
        res = Math.max(res, right - left);
    }
    return res;
};
// @lc code=end

