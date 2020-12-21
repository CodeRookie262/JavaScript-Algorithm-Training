const { getArray } = require('../../utils');

const array = getArray(10, 10);

/**
 * 选择排序
 *
 * 空间复杂度: O(1)
 * 时间复杂度: O(n^2)
 * 属于原地排序，但不是稳定的排序算法
 *
 * Image: SelectionSort.gif
 *
 * description:
 *  选择排序和插入排序有点类似，也是分为排序和未排序区间，区别在于选择排序是将未排序区间的最小值放置到排序区间的最后一位。
 */
function SelectionSort(arr) {
  const length = array.length;

  if (length <= 1) return arr;

  for (var i = 0; i < length; i++) {
    // 默认当前第 i 位为最小元素
    let minIndex = i;
    for (var j = i + 1; j < length; j++) {
      // 如果 array[j] 小于 arr[minIndex]时就更新 minIndex 的值，捕获到当前第 i 个有序的元素
      if (arr[minIndex] > arr[j]) minIndex = j;
    }

    // 如果当前元素的下标与查找到的目标值索引一致时无需交换，跳出此轮循环开始下一轮计算
    if (i === minIndex) continue;

    // 找到第 i 个最小值后将其与原先的元素进行位置交换
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }

  return arr;
}

console.log(`  Sort array is ${JSON.stringify(SelectionSort(array))}`);
