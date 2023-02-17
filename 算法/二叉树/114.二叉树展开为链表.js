/*
 * @lc app=leetcode.cn id=114 lang=javascript
 *
 * [114] 二叉树展开为链表
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
    traverse(root);
};
var traverse = function(root) {
    if (root == null) {
        return;
    }

    traverse(root.left);
    traverse(root.right);

    /**** 后序遍历位置 ****/
    // 1、左右子树已经被拉平成一条链表
    let left = root.left;
    let right = root.right;

    // 2、将左子树作为右子树
    root.left = null;
    root.right = left;

    // 3、将原先的右子树接到当前右子树的末端
    let  p = root;
    while (p.right != null) {
        p = p.right;
    }
    p.right = right;
}

// 你说 traverse 函数是怎么把左右子树拉平的？
// 不容易说清楚，但是只要知道 traverse 的定义如此并利用这个定义，让每一个节点做它该做的事情，然后 traverse 函数就会按照定义工作。
// @lc code=end

