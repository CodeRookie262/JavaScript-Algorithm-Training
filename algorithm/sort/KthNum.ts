import { getArray } from '../../utils';

/**
 * 数组中的第K个最大元素
 * @param {Array} nums
 * @param {Number} k
 *
 * link: https://leetcode-cn.com/problems/kth-largest-element-in-an-array
 */
const findKthLargest = function (nums: number[], k: number): number {
  // 终止条件
  const len = nums.length;
  if (k > len) return -1;
  // solution1
  // return solution1(nums, k);
  // solution2
  let p = partition(nums, 0, len - 1);
  while (p + 1 !== k) {
    if (p + 1 > k) {
      p = partition(nums, 0, p - 1);
    } else {
      p = partition(nums, p + 1, len - 1);
    }
  }
  return nums[p];
};

// 解法1：排序后再取第 K 个最大值

function solution1(nums: number[], k: number): number {
  return nums.sort((a, b) => b - a)[k - 1];
}

// 解法二：快速选择 利用快排中分区函数 partition 进行递归查找
function partition(arr: number[], start: number, end: number): number {
  let pivotValue = arr[end],
    startIndex = start;

  for (let i = start; i < end; i++) {
    if (arr[i] >= pivotValue) {
      swap(arr, i, startIndex++);
    }
  }

  swap(arr, startIndex, end);

  return startIndex;
}

function swap(arr: number[], i: number, j: number): void {
  if (i === j) return;
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

console.log(`  第 K 个最大值为 ${findKthLargest(getArray(10, [50, 410]), 3)}`);

export { findKthLargest };
