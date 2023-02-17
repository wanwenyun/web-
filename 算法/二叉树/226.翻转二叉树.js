/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
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
 * @return {TreeNode}
 */

// 遍历的思想

// var invertTree = function(root) {
//     traverse(root);
//     return root;

// };

// var traverse = function(root) {
//     if(!root) return;

//     /** 前序位置：交换左右子节点 **/
//     let tmp = root.left;
//     root.left = root.right;
//     root.right = tmp;

//     traverse(root.left);
//     traverse(root.right);
// }

// 分解思想: 将以 root 为根的这棵二叉树翻转，返回翻转后的二叉树的根节点
var invertTree = function(root) {
    if(!root) return null; // 注意，这里不能直接return, 需return null

    // 利用函数定义，先翻转左右子树
    let left = invertTree(root.left);
    let right = invertTree(root.right);

    // 然后交换左右子节点
    root.left = right;
    root.right = left;

    // 和定义逻辑自恰：以 root 为根的这棵二叉树已经被翻转，返回 root
    return root;
}
// @lc code=end
