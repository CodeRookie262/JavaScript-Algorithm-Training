const { getArray } = require('../../utils');

const array = getArray(11, 100);

/**
 *  快速排序 （快排）
 *
 *  不得不说，刚开始学的时候表示非常迷，果然我的脑子不允许我一目了然 (ಥ_ಥ)
 *
 *  时间复杂度：O(nlogn)
 *
 *  空间复杂度：O(1)
 *
 *  属于原地排序，但是不是稳定的排序算法
 *
 *  description：
 *  和归并排序一样利用分治进行区间划分和排序，不过排序的操作和归并不一样，和冒泡差不多，不过交换数据的次数没有冒泡那么多，可以说是冒泡排序的升级版哈哈哈
 */

//  快排主入口

function QuickSort(array, left, right) {
  // 终止条件  当区间间距为 1 时则说明数组以及是有序的了
  if (left >= right) return;
  // 选取分区点
  let pivot = right;
  // 已区点值作为参照值进行元素交换
  let partitionIndex = partition(array, pivot, left, right);
  // console.log('---------logger--------\n');
  // 根据区点值进行元素交替后获取新的区点，再对区点做新的一轮分区划分
  QuickSort(array, left, partitionIndex - 1 < left ? left : partitionIndex - 1);
  QuickSort(
    array,
    partitionIndex + 1 > right ? right : partitionIndex + 1,
    right
  );
}
/**
 * 对 [left,right] 区间的元素分别于区值进行比对
 * @param {array} array  原数组
 * @param {number} pivot 分区点
 * @param {number} left  左边界
 * @param {number} right 右边界
 */
function partition(array, pivot, left, right) {
  // console.log(`partition array is ${JSON.stringify(array)}`);
  // 获取区值
  let pivotValue = array[pivot];
  // 标记起点
  let startIndex = left;
  // console.log('=========pivot log===========');
  // 遍历区间
  for (var i = left; i < right; i++) {
    if (array[i] < pivotValue) swap(array, i, startIndex++);
    // console.table({
    //   i: i - left,
    //   array: JSON.stringify(array.slice(left, right + 1)),
    //   pivotValue
    // });
  }
  //
  swap(array, startIndex, pivot);
  return startIndex;
}
/**
 * 交换位置
 * @param {array} array  原数组
 * @param {number} left  左值
 * @param {number} right 右值
 */
function swap(array, left, right) {
  [array[left], array[right]] = [array[right], array[left]];
}

QuickSort(array, 0, array.length - 1);

console.log(`  Sort array is ${JSON.stringify(array)}`);
