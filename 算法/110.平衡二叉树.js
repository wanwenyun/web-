/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    let flag = true;
    const getDepth = (tree) => {
        if(!tree) return 0;
        if(!flag) return;
        else {
            const leftDep = getDepth(tree.left);
            const rightDep = getDepth(tree.right);
            if(Math.abs(leftDep - rightDep) > 1) flag = false
            return Math.max(getDepth(tree.left), getDepth(tree.right)) + 1;
        }
    }
    if(!root) return true;
    getDepth(root);
    return flag;
};
// @lc code=end

