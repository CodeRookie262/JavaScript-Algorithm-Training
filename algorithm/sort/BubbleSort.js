const { getArray } = require('../../utils');

// 冒泡排序
console.log('==========BubbleSort=============');

const arr = getArray(10, 10);

/**
 * 冒泡排序
 * 空间复杂度： O(1)
 * 时间复杂度：O(n^2)
 * 属于原地排序，稳定
 *
 * Description：
 *  冒泡排序通过比较相邻的元素进行排序的，如果当 前元素大于下一个元素 则交换位置，第一轮走完后最后一个必定是设置中最大的值，直到数组没有发生过排序则跳出循环体终止循环。
 *  Image： bubbleSort.gif (＾－＾)V
 * （我有一个想法，那它岂不是可以找 第K值 ）
 */

const BubbleSort = function BubbleSort(array) {
  for (var i = 0, length = array.length; i < length; i++) {
    // 判断这一轮是否发生过元素交换，有就继续执行，没有的话则说明已经全部排序 OK ，直接 return 即可。
    let isChange = false;
    for (var j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        isChange = true;
        // Core code
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    if (!isChange) break;
  }

  return array;
};

console.log(`
  Sort array is: ${JSON.stringify(BubbleSort(arr))}
  `);
