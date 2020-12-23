const { getArray } = require('../../utils');
const array = getArray(10, [50, 180]);

/**
 * 基数排序
 *
 * 将所有待比较的正整数统一长度，数位短的数字前面用零来补齐，然后从最低位开始依次进行排序，这样从最低位排序到最高位后得到的数组就是有序的了
 *
 * 因为每个数位的数值大小在 [0,9] 之间，所以我们可以分为 10 个桶来进行每个数位的排序
 *
 * @param {Number[]} array
 * @returns {Number[]} 排序后的数组
 */
function RadixSort(array) {
  let len = array.length,
    MAX_BIT = maxBit(array),
    count = 1;
  if (len <= 1) return array;

  while (MAX_BIT) {
    // 开始计数
    const list = {};
    array.forEach(item => {
      let bit = digit(item, count);
      if (!list[bit]) list[bit] = [];
      list[bit].push(item);
    });
    // 清空数组
    array = [];
    // 重新整理数组
    for (var k in list) {
      array.push(...list[k]);
    }
    // 位数加 1
    count++;
    // loop - 1
    MAX_BIT--;
  }

  return array;
}

/**
 * 找出数组中的最大数位
 * @param {Array} array
 * @returns {Number} 位数值
 */
function maxBit(array) {
  let len = array.length,
    max = Math.max(...array),
    maxBit = 0;
  if (len === 0) return 0;

  while (max) {
    max = (max / 10) | 0;
    maxBit++;
  }

  return maxBit;
}

/**
 * 查找某位数字第几位的数值
 * @param {Number} num 查找的数字
 * @param {Number}  bitNum 位数,默认为 1
 * @returns {Number} 当前位数的数字
 */
function digit(num, bitNum = 1) {
  let pow = 1;
  while (--bitNum) {
    pow *= 10;
  }
  return (num / pow) % 10 | 0;
}

// console.log(RadixSort(array));

module.exports = RadixSort;
