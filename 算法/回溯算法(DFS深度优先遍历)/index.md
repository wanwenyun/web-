- [总起](#总起)
- [例子](#例子)
- [排列-组合-子集问题分情况讨论](#排列-组合-子集问题分情况讨论)
  - [元素无重,不可复选](#元素无重不可复选)
    - [子集/组合（元素无重,不可复选）](#子集组合元素无重不可复选)
    - [排列（元素无重,不可复选）](#排列元素无重不可复选)
  - [元素可重,不可复选](#元素可重不可复选)
    - [子集/组合（元素可重,不可复选）](#子集组合元素可重不可复选)
    - [排列（元素可重,不可复选）](#排列元素可重不可复选)
  - [元素无重,可复选](#元素无重可复选)
    - [子集/组合（元素无重,可复选）](#子集组合元素无重可复选)
    - [排列（元素无重,可复选）](#排列元素无重可复选)

>[回溯算法解题套路框架](https://labuladong.github.io/algo/di-ling-zh-bfe1b/hui-su-sua-c26da/)
>
>[回溯算法秒杀所有排列-组合-子集问题](https://labuladong.github.io/algo/di-ling-zh-bfe1b/hui-su-sua-56e11/)

# 总起

**DFS 算法（深度优先搜索算法）** 就是`回溯算法`

解决一个回溯问题，实际上就是一个决策树的遍历过程，站在回溯树的一个节点上，你只需要思考 3 个问题：

1. 路径：也就是已经做出的选择。
2. 选择列表：也就是你当前可以做的选择。
3. 结束条件：也就是到达决策树底层，无法再做选择的条件。

回溯算法框架：

```js
let result = []
var backtrack = function(路径, 选择列表){
    if(满足结束条件){
        result.add(路径)
        return;
    }
    for(let 选择 of 选择列表){
        做选择
        backtrack(路径, 选择列表)
        撤销选择
    }
}
```

# 例子

以[LC46.全排列](https://leetcode.cn/problems/permutations/)为例

根据题目意思，以及回溯算法框架定义，可以得到以下树结构：

<img src="./pic/pic1.png" />

定义的 backtrack 函数其实就像一个指针，在这棵树上游走，同时要正确维护每个节点的属性，每当走到树的底层叶子节点，其「路径」就是一个全排列。

再进一步，如何遍历一棵树？各种搜索问题其实都是树的遍历问题，而多叉树的遍历框架就是这样：
```js
var traverse = function(root) {
    for (var i = 0; i < root.children.length; i++) {
        // 前序位置需要的操作
        traverse(root.children[i]);
        // 后序位置需要的操作
    }
}
```

而所谓的`前序遍历`和`后序遍历`，他们只是两个很有用的时间点。前序遍历的代码在进入某一个节点之前的那个时间点执行，后序遍历代码在离开某个节点之后的那个时间点执行。

回想我们刚才说的，`「路径」`和`「选择」`是每个节点的属性，函数在树上游走要正确处理节点的属性，

|||
|--|--|
| <img src="./pic/pic2.png"> | <img src="./pic/pic3.png"> |

我们只要在递归之前做出选择，在递归之后撤销刚才的选择，就能正确得到每个节点的选择列表和路径。

# 排列-组合-子集问题分情况讨论

## 元素无重,不可复选

即 nums 中的元素都是唯一的，每个元素最多只能被使用一次。

### 子集/组合（元素无重,不可复选）

**重点：使用 `start` 参数控制树枝的生长避免产生重复的子集（也就是说，使用 start 变量保证元素`nums[start]` 之后只会出现 `nums[start+1..]` 中的元素，通过固定元素的相对位置保证不出现重复的子集），用 `track` 记录根节点到每个节点的路径的值，同时在前序位置把每个节点的路径值收集起来，完成回溯树的遍历就收集了所有子集**

[78. 子集](https://leetcode.cn/problems/subsets/)
[77. 组合](https://leetcode.cn/problems/combinations/)

算法框架:

```js
// start - 控制树枝的遍历，避免产生重复子集
// track - 路径
var backtrack = function(nums, start) {
    if(满足结束条件){
        ... // 更新结果
    }
    // 回溯算法标准框架
    for (var i = start; i < nums.length; i++) {
        // 做选择
        track.addLast(nums[i]);
        // 注意参数
        backtrack(nums, i + 1); // 保证元素不重复
        // 撤销选择
        track.removeLast();
    }
}
```

### 排列（元素无重,不可复选）

**排列问题本身就是让你穷举元素的位置，`nums[i]` 之后也可以出现 `nums[i] 左边`的元素，所以之前 “排列/组合” 的那一套玩不转了，需要额外使用 `used` 数组来标记哪些元素还可以被选择。**

[46. 全排列](https://leetcode.cn/problems/permutations/)

算法框架:

```js
// used - 标记选择过了的元素
// track - 路径
var backtrack = function(nums) {
    if(满足结束条件){
        ... // 更新结果
    }
    for (var i = 0; i < nums.length; i++) {
        // 剪枝逻辑
        if (used[i])  continue;

        // 做选择
        used[i] = true;
        track.addLast(nums[i]);

        backtrack(nums);
        // 撤销选择
        track.removeLast();
        used[i] = false;
    }
}
```

## 元素可重,不可复选

即 nums 中的元素可以存在重复，每个元素最多只能被使用一次，其关键在于`排序和剪枝`

### 子集/组合（元素可重,不可复选）

**重点：在代码上，需要先进行排序，让相同的元素靠在一起，如果发现 `nums[i] == nums[i-1]`，则跳过：**

[40. 组合总和 II](https://leetcode.cn/problems/combination-sum-ii/)
[90. 子集 II](https://leetcode.cn/problems/subsets-ii/)

算法框架:

```js
nums.sort((a,b) => a-b);
// start - 控制树枝的遍历，避免产生重复子集
// track - 路径
var backtrack = function(nums, start) {
    if(满足结束条件){
        ... // 更新结果
    }
    // 回溯算法标准框架
    for (var i = start; i < nums.length; i++) {
        // 剪枝逻辑，跳过值相同的相邻树枝
        if (i > start && nums[i] == nums[i - 1]) continue;

        // 做选择
        track.addLast(nums[i]);
        // 注意参数
        backtrack(nums, i + 1); // 保证元素不重复
        // 撤销选择
        track.removeLast();
    }
}
```

### 排列（元素可重,不可复选）

**对比普通全排列问题： 多了“排序”和“剪枝”逻辑**

[47. 全排列 II](https://leetcode.cn/problems/permutations-ii/)

算法框架

```js
nums.sort((a,b) => a-b);
// used - 标记选择过了的元素
// track - 路径
var backtrack = function(nums) {
    if(满足结束条件){
        ... // 更新结果
    }
    for (var i = 0; i < nums.length; i++) {
        // 剪枝逻辑
        if (used[i]) continue;
        // 剪枝逻辑，固定相同的元素在排列中的相对位置
        if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;

        // 做选择
        used[i] = true;
        track.addLast(nums[i]);
        backtrack(nums);
        // 撤销选择
        track.removeLast();
        used[i] = false;
    }
}
```

## 元素无重,可复选

即 nums 中的元素都是唯一的，每个元素可以被使用若干次，相比较于元素无重,可复选类型的题目，只要 **删掉去重逻辑（即， 只要把 `i + 1` 改成 `i` 即可）** 即可。

### 子集/组合（元素无重,可复选）

[39. 组合总和](https://leetcode.cn/problems/combination-sum/)

算法框架:

```js
var backtrack = function(nums, start) {
    if(满足结束条件){
        ... // 更新结果
    }
    // 回溯算法标准框架
    for (var i = start; i < nums.length; i++) {
        // 做选择
        track.add(nums[i]);
        // 注意参数
        backtrack(nums, i); // 注意是i，元素可重复
        // 撤销选择
        track.pop();
    }
};
```

### 排列（元素无重,可复选）

leetcode中没有相关题目
