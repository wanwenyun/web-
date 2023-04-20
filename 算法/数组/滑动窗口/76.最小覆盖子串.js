/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */
// 两个字符串比较的情况，窗口大小不固定
/*
解题思路：https://labuladong.github.io/algo/di-ling-zh-bfe1b/wo-xie-le--f02cd/
1. 用左右两个指针遍历s字符串，初始化 left = right = 0，把索引左闭右开区间 [left, right) 称为一个「窗口」。
2. 我们先不断地增加 right 指针扩大窗口 [left, right)，直到窗口中的字符串符合要求（包含了 T 中的所有字符）。
3. 此时，我们停止增加 right，转而不断增加 left 指针缩小窗口 [left, right)，直到窗口中的字符串不再符合要求（不包含 T 中的所有字符了）。同时，每次增加 left，我们都要更新一轮结果。
4. 重复第 2 和第 3 步，直到 right 到达字符串 S 的尽头。
第 2 步相当于在寻找一个「可行解」，然后第 3 步在优化这个「可行解」，最终找到最优解
*/

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    const need = {}; // 用来记录t中字符出现次数，方便后续的判断
    const window = {}; // 记录「窗口」中的相应字符的出现次数。
    for (let a of t) {
        need[a] = (need[a] || 0) + 1;//统计t中字符频数
    }

    let left = 0, 
        right = 0, 
        valid = 0; // valid 变量表示窗口中满足 need 条件的字符个数

    let res = ''
    
    while (right < s.length) {
        let c = s[right]; // c 是将移入窗口的字符
        // 增大窗口
        right++;
        // 进行窗口内数据的一系列更新
        if(need[c]) { //如果当前字符在need字符中 更新window中字符数
            window[c] = (window[c] || 0) + 1;
            if (window[c] == need[c]) {//如果当前窗口和需要的字符数量一致时，字符种类+1
                valid++;
            }
        }
        

        /*** debug 输出的位置 ***/
        console.log(`window: [${left}, ${right})\n`);
        
        // 判断左侧窗口是否要收缩
        while (valid == Object.keys(need).length) { //字符种类与需要的字符个数一致时，即窗口中的字符串包含了t中的所有字符，就收缩窗口
            const newRes = s.substring(left, right);
            if( !res || newRes.length < res.length ) res = newRes;

            // d 是将移出窗口的字符
            let d = s[left];
            // 缩小窗口
            left++;
            // 进行窗口内数据的一系列更新
            if (need[d]) { //如果d在需要的字符中 更新window中字符数
                if (window[d] == need[d]) {//如果当前窗口和需要的字符数量一致时，字符种类-1
                    valid--;
                }
                window[d]--;
            }
        }
    }
    //没有找到覆盖子串返回'' 否则返回覆盖子串
    return res;
};
// @lc code=end

