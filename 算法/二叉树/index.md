二叉树，前、后、中序遍历：
* 前序遍历：**根**结点 ---> 左子树 ---> 右子树
* 中序遍历：左子树---> **根**结点 ---> 右子树
* 后序遍历：左子树 ---> 右子树 ---> **根**结点

<img src='./picture/pic1.png' width=50%/>

**快速排序**就是个二叉树的**前序**遍历，**归并排序**就是个二叉树的**后序**遍历。
<!-- 
快排代码框架如下：先构造分界点，然后去左右子数组构造分界点，就是一个二叉树的前序遍历吗。
```js
var sort =  function(nums, lo, hi) {
    /****** 前序遍历位置 ******/
    // 通过交换元素构建分界点 p
    let p = partition(nums, lo, hi);
    /************************/

    sort(nums, lo, p - 1);
    sort(nums, p + 1, hi);
}

```

归并排序代码框架如下：先对左右子数组排序，然后合并（类似合并有序链表的逻辑），就是二叉树的后序遍历框架。
```js
// 定义：排序 nums[lo..hi]
var sort = function(nums, lo, hi) {
    let mid = (lo + hi) / 2;
    // 排序 nums[lo..mid]
    sort(nums, lo, mid);
    // 排序 nums[mid+1..hi]
    sort(nums, mid + 1, hi);

    /****** 后序位置 ******/
    // 合并 nums[lo..mid] 和 nums[mid+1..hi]
    merge(nums, lo, mid, hi);
    /*********************/
}
``` -->

* **前**序位置的代码在刚刚**进入**一个二叉树节点的时候执行；
* **后**序位置的代码在将要**离开**一个二叉树节点的时候执行；
* **中**序位置的代码在一个二叉树节点左子树都遍历完，即将开始遍历右子树的时候执行。


二叉树题目的递归解法可以分两类思路，
1. 第一类是**遍历**一遍二叉树得出答案，**回溯算法**
2. 第二类是通过**分解**问题计算出答案，**动态规划**

二叉树**遍历**框架：
```js
var traverse = function(TreeNode root) {
    if (root == null) {
        return;
    }
    // 在此操作，便是前序位置
    traverse(root.left);
    // 在此操作，便是中序位置
    traverse(root.right);
    // 在此操作，便是后序位置
}
```
`traverse` 函数其实就是一个能够遍历二叉树所有节点的一个函数，与遍历数组或者链表本质上没有区别。


二叉树**分解**框架：（以返回二叉树最大深度为例）
```js
var maxDepth = function(root) {
	if (root == null) {
		return 0;
	}
	// 利用定义，计算左右子树的最大深度
	let leftMax = maxDepth(root.left);
	let rightMax = maxDepth(root.right);
	// 整棵树的最大深度等于左右子树的最大深度取最大值，
    // 然后再加上根节点自己
	let res = Math.max(leftMax, rightMax) + 1;

	return res; // 返回结果
}
```