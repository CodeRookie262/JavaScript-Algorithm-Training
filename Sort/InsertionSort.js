const { getArray, logger } = require('../utils');
// logger();
console.log('============Insertion Sort=============');

const arr = getArray(10, 10);

/**
 * 插入排序
 *
 * 空间复杂度： O(1)
 * 时间复杂度：O(n^2)
 * 属于原地排序，稳定
 *
 * Image: InsertionSort.gif
 *
 * Description：
 *  插入排序会讲数组分为两个区间，分别是排序区间和未排序区间，插入排序会从未排序区间中逐一取元素与排序区间进行排序。
 */
const InsertionSort = function InsertionSort(array) {
  const length = array.length;

  if (length <= 1) return array;

  for (var i = 1; i < length; i++) {
    let value = array[i];
    for (var j = i - 1; j >= 0; j--) {
      if (array[j] > value) {
        array[j + 1] = array[j];
      } else {
        // 因为左边是排序区间，如果与最后的元素已经处于有序的话则说明该元素不用在单轮循环与其他元素进行排序了。
        break;
      }
    }
    array[j + 1] = value;
  }

  return array;
};

console.log(`
  Sort array is: ${JSON.stringify(InsertionSort(arr))}
`);
