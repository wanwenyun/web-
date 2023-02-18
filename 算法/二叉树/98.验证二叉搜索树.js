/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
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
var isValidBST = function(root) {
    return isValid(root, -Infinity, Infinity);
};
/* 限定以 root 为根的子树节点必须满足 max.val > root.val > min.val */
var isValid = function(root, min, max) {
    // base case
    if(root === null) return true;

    // 若 root.val 不符合 max 和 min 的限制，说明不是合法 BST
    if(root.val <= min || root.val >= max) return false;

    // 限定左子树的最大值是 root.val，右子树的最小值是 root.val
    return isValid(root.left, min, root.val) && isValid(root.right, root.val, max);
}
// @lc code=end

