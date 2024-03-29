/*
 * @lc app=leetcode.cn id=797 lang=javascript
 *
 * [797] 所有可能的路径
 */

// @lc code=start
/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function(graph) {
    // 图的节点数
    let n = graph.length;

    // 结果
    let res = []; 

    /* 图遍历框架 */
    var traverse = function(graph, s, path) {
        if(s === n-1) {
            res.push(path);
            return;
        }

        // 递归每个相邻节点
        for (let next of graph[s]) {
            traverse(graph, next, [...path, next]);
        }
    }

    traverse(graph, 0, [0]);

    return res;
};
// @lc code=end

console.log(allPathsSourceTarget([[1,2],[3],[3],[]]));