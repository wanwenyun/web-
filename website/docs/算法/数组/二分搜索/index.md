二分查找常用场景：寻找一个数、寻找左侧边界、寻找右侧边界。

二分查找算法框架：
```js
var binarySearch = function (nums, target) {
    let left = 0, right = ...;

    while(...) {
        let mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            ...
        } else if (nums[mid] < target) {
            left = ...
        } else if (nums[mid] > target) {
            right = ...
        }
    }
    return ...;
}
```
PS： 
1. **分析二分查找的一个技巧是：不要出现 else，而是把所有情况用 else if 写清楚**
2. 计算 mid 时需要防止溢出，代码中 left + (right - left) / 2 就和 (left + right) / 2 的结果相同，但是有效防止了 left 和 right 太大，直接相加导致溢出的情况。

寻找左边界的二分查找
```js
var left_bound = function(nums, target) {
    let left = 0, right = nums.length - 1;
    // 搜索区间为 [left, right]
    while (left <= right) {
        let mid = left + (right - left) / 2;
        if (nums[mid] < target) {
            // 搜索区间变为 [mid+1, right]
            left = mid + 1;
        } else if (nums[mid] > target) {
            // 搜索区间变为 [left, mid-1]
            right = mid - 1;
        } else if (nums[mid] == target) {
            // 收缩右侧边界
            right = mid - 1;
        }
    }
    // 判断 target 是否存在于 nums 中,此时 target 比所有数都大，返回 -1
    // 判断一下 nums[left] 是不是 target，不是则返回-1
    if (left >= nums.length || nums[left] != target) {
        return -1;
    }
    return left;
}

```

寻找右边界的二分查找
```js
let right_bound = function (nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        let mid = left + (right - left) / 2;
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] == target) {
            // 这里改成收缩左侧边界即可
            left = mid + 1;
        }
    }
    // 最后改成返回 right
    if (right < 0 || nums[right] != target) {
        return -1;
    }
    return right;
}

```

口诀：
* 第一个，最基本的二分查找算法：
  ```
    因为我们初始化 right = nums.length - 1
    所以决定了我们的「搜索区间」是 [left, right]
    所以决定了 while (left <= right)
    同时也决定了 left = mid+1 和 right = mid-1

    因为我们只需找到一个 target 的索引即可
    所以当 nums[mid] == target 时可以立即返回
  ```
* 第二个，寻找**左侧边界**的二分查找：
  ```
    因为我们初始化 right = nums.length - 1 
    所以决定了我们的「搜索区间」是 [left, right]
    所以决定了 while (left <= right)
    同时也决定了 left = mid + 1 和 right = mid-1

    因为我们需找到 target 的最左侧索引
    所以当 nums[mid] == target 时不要立即返回
    而要收紧右侧边界以锁定左侧边界(right = mid-1)
  ```
* 第三个，寻找**右侧边界**的二分查找：
  ```
    因为我们初始化 right = nums.length - 1
    所以决定了我们的「搜索区间」是 [left, right]
    所以决定了 while (left <= right)
    同时也决定了 left = mid + 1 和 right = mid-1

    因为我们需找到 target 的最右侧索引
    所以当 nums[mid] == target 时不要立即返回
    而要收紧左侧边界以锁定右侧边界(left = mid + 1)
  ```