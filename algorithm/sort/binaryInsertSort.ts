('use strict');
import { getArray } from '../../utils';
const array = getArray(10, [30, 90]);

// console.log(array);
/**
 *  二分插入排序
 * @param {number[]} arr
 */
function BinaryInsertSort(arr: number[]): number[] {
  let len = arr.length;
  if (len <= 1) return array;

  for (var i = 0; i < len; i++) {
    let temp = arr[i],
      left = 0,
      right = i - 1;
    /**
     * 这里和插入排序一样，也有左右区间，默认左区间为有序区间
     *
     * 找出有序区间是否存在有比 arr[i] 大的元素的位置，有的话返回比他小的元素的位置，这里的返回的是第一个比他大的位置，这样就说明后面的元素都是比他大的了，只需要遍历后面的元素进行置换即可
     */

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] > temp) {
        //  如果中间数比 temp 还大的话就查看左区间，看看有没有比 temp 小的元素
        right = mid - 1;
      } else {
        left = mid + 1;
        // 反之查看右区间
      }
    }

    //  找到目标位置，开始进行置换

    for (var j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j];
    }

    arr[left] = temp;
  }

  return arr;
}

console.log(BinaryInsertSort(array));

export { BinaryInsertSort };
