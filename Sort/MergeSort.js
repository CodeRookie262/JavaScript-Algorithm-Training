const { getArray } = require('../utils');

const array = getArray(10, 10);
/**
 * 归并排序
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(n)
 *
 * Image: mergeSort
 *
 * descript:
 *  归并排序采用的是分治思想和递归，将大问题分解为小问题，小问题解决了大问题自然也就解决了。
 */

// 归并排序主入口
function MergeSort(arr) {
  const length = arr.length;

  if (length <= 1) return arr;
  // 选取分离点
  let middle = (length / 2) | 0;
  // 划分左右区间
  let left = arr.slice(0, middle),
    right = arr.slice(middle);

  // 将左右区间进行排序&合并
  return merge(MergeSort(left), MergeSort(right));
}

/**
 *
 * @param left 左区间
 * @param right 右区间
 */
//  合并数组
function merge(left = [], right = []) {
  let temp = [],
    leftIndex = 0,
    rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      temp.push(left[leftIndex++]);
    } else {
      temp.push(right[rightIndex++]);
    }
  }

  // 合并剩余的数组
  // 因为 left，right 区间都有可能存在剩余的元素
  return temp.concat(left.slice(leftIndex), right.slice(rightIndex));
}

console.log(`  Sort array is ${JSON.stringify(MergeSort(array))}`);
