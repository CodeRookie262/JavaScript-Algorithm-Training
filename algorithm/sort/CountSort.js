const { getArray } = require('../../utils');
const array = getArray(10, 10);

/**
 * 计数排序
 * 计算原数组中每个元素的数据量 {value: count}
 *
 * @param {Number[]} array
 * @returns {Number[]} array
 */
// 解法一 不推荐，开辟一个长度为 max 的数组太耗内存了，较为极端情况 [1,10000]
function CountSort(array) {
  const len = array.length;
  if (len <= 1) return array;

  // 获取最大值 max
  let max = Math.max(...array);
  let list = Array(max);

  // 计算每个分值的数据量有多大
  array.forEach(item => {
    if (!list[item]) list[item] = 0;
    list[item]++;
  });
  // console.log(list);

  let index = 0;
  list.forEach((count, value) => {
    while (count > 0) {
      array[index++] = value;
      count--;
    }
  });
  console.log(array);
}

// 解法二 采用 hash 表进行 {value: count} 互相关联，减少不必要的内存开销
function CountSort(array) {
  let list = {};

  array.forEach(item => {
    if (!list[item]) list[item] = 0;
    list[item]++;
  });
  // console.log(list);

  let index = 0;
  for (var key in list) {
    let count = list[key];
    while (count > 0) {
      array[index++] = +key;
      count--;
    }
  }
  return array;
}

// console.log(CountSort(array));

module.exports = CountSort;
