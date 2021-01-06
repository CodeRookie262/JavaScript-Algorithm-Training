import { getArray } from '../../utils';
const array = getArray(10, [50, 200]);
/**
 *
 * 桶排序思想
 *  将要排序的数据分到几个有序的桶中，再将每个桶中的数据进行排序，桶内的数据排序完成后再有序地提取每个桶的数据(因为桶与桶之间有着天然的排序，所以桶与桶之间无需进行排序)，这样最后的数据就是有序的啦~
 *
 * 时间复杂度：
 *  主要取决于数据和桶的数量
 *  例如要对 n 个数据分到 m 个桶进行排序，每个桶有 k = n/m 个数据，那么每个桶排序（快排）的时间复杂度就是 O(k * logk),所以桶排序的时间复杂度为 O(m * k * logk),因为 k = n/m,所以最后简化为 O(n * log(n/m)). 当 m 趋近于 n 时，log(n / m) 就是一个比较小忽略的常数时的时间复杂度可以视为 O(n)
 *
 */

/**
 * 桶排序入口
 * @param {Array} array 数组
 * @param {Number} bucketSize 桶容量
 */
function BucketSort(array: number[], bucketSize: number = 10): number[] {
  // 创建桶
  let buckets = createBuckets(array, bucketSize);

  return sortBuckets(buckets);
}

/**
 * 创建桶
 * @param {Array} array 数组
 * @param {Number} bucketSize 桶容量
 * @returns {Two dimensional array} buckets 桶列表
 */
function createBuckets(array: number[], bucketSize: number) {
  // 获取数组的最大以及最小值，方便动态创建桶
  let len = array.length,
    // 这样写不太好，毕竟会有两次遍历的操作
    // min = Math.min.apply(null,array),
    // max = Math.max.apply(null,array);
    min = array[0],
    max = array[0],
    buckets: Array<number[]> = [];

  // 遍历数组取极值 min，max
  for (var i = 0; i < len; i++) {
    if (array[i] > max) {
      max = array[i];
    } else if (array[i] < min) {
      min = array[i];
    }
  }

  // 通过极值创建桶  这里尽量不使用新语法，主要还是遍历的次数的问题
  // let buckets = Array(Math.floor((max - min)/bucketSize)).fill(0).map(() => [])
  for (var c = Math.floor((max - min) / bucketSize) + 1, k = 0; k < c; k++) {
    buckets[k] = [];
  }

  // 根据区间的不同将对应的数据 push 到不同的桶中
  for (var j = 0; j < len; j++) {
    let bucketIndex = Math.floor((array[j] - min) / bucketSize);
    buckets[bucketIndex].push(array[j]);
  }

  // 将所有桶都返回出去
  return buckets;
}

// 对每个桶都进行排序
function sortBuckets(buckets: Array<number[]>) {
  let tmp: number[] = [];
  // console.log(buckets);
  for (var i = 0; i < buckets.length; i++) {
    tmp = tmp.concat(InsertSort(buckets[i]));
  }
  return tmp;
}

// 插入排序
function InsertSort(array: number[]): number[] {
  let len = array.length;
  if (len <= 1) return array;
  for (var i = 1; i < len; i++) {
    for (var j = i - 1, v = array[i]; j >= 0; j--) {
      if (array[j] > v) {
        array[j + 1] = array[j];
      } else {
        break;
      }
    }
    array[j + 1] = v;
  }

  return array;
}

// console.log(BucketSort(array));

export { BucketSort };
