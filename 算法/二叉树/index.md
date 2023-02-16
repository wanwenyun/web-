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


二叉树遍历框架：
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
`traverse` 函数其实就是一个能够遍历二叉树所有节点的一个函数，与遍历数组或者链表本质上没有区别：
```js
/* 迭代遍历数组 */
var traverse = function(arr) {
    for (let i = 0; i < arr.length; i++) {

    }
}

/* 递归遍历数组 */
var traverse = function(arr, i) {
    if (i == arr.length) {
        return;
    }
    // 前序位置
    traverse(arr, i + 1);
    // 后序位置
}

/* 迭代遍历单链表 */
var traverse = function(head) {
    for (ListNode p = head; p != null; p = p.next) {

    }
}

/* 递归遍历单链表 */
var traverse = function(head) {
    if (head == null) {
        return;
    }
    // 前序位置
    traverse(head.next);
    // 后序位置
}
```

二叉树题目的递归解法可以分两类思路，第一类是遍历一遍二叉树得出答案，第二类是通过分解问题计算出答案，这两类思路分别对应着 **回溯算法**核心框架 和 **动态规划**核心框架。