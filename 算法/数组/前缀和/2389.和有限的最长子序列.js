/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 * 排序(升序) -> 前缀和 -> 查找
 */
var answerQueries = function(nums, queries) {
    // 升序排序
    nums.sort((a,b) => a-b);

    let preSum = NumArray(nums);
    console.log('前缀和', preSum);

    let res = [];

    for(let i = 0; i < queries.length; i++) {
        let itemRes = binarySearch(preSum, queries[i]);
        res[i] = itemRes;
    }
    return res;
};

// 前缀和
var NumArray = function(nums) {
    let preSum = new Array(nums.length + 1);
    preSum[0] = 0;
    for(let i = 0; i < nums.length; i++) {
        preSum[i + 1] = preSum[i] + nums[i];
    }
    return preSum;
};

// 二分查找
const  binarySearch = (f, target) => {
    let low = 1, high = f.length;
    while (low < high) {
        const mid = low + Math.floor((high - low) / 2);
        if (f[mid] > target) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return low-1;
};

console.log(answerQueries([4,5,2,1], [3,10,21]))