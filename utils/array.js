const EmptyCase = Array(26).fill(true),
  LowerCase = EmptyCase.map((_, i) => String.fromCharCode(97 + i)),
  UpperCase = EmptyCase.map((_, i) => String.fromCharCode(65 + i));
/**
 * 生成数组根据
 * @param {number} length     数组长度
 * @param {[Start,End] | Number} range     数组边界
 * @returns 原数组
 */
const getArray = (length, range) => {
  const res = [];
  const getItem = (start = 0, end = Number.MAX_SAFE_INTEGER) =>
    (Math.random() * (end - start + 1) + start) | 0;

  if (Array.isArray(range) && range.length <= 2) {
    for (var i = 0; i < length; i++) {
      res[i] = getItem(...range);
    }
  } else if (/number|undefined/.test(typeof range)) {
    for (var i = 0; i < length; i++) {
      res[i] = getItem(0, range);
    }
  }

  console.log(`
  The original array is: ${JSON.stringify(res)} \n
  Sort: ${JSON.stringify(res.slice().sort((a, b) => a - b))}\n
  Reverse sort: ${JSON.stringify(res.slice().sort((a, b) => b - a))}
  `);

  return res;
};

/**
 * 生成混合数组
 * @param {Number} length
 * @param {[Number,Number]|Number} array_range
 * @returns {Array<String|Number>} blendArray example => ["B",1,'a']
 */
function getBlendArray(length, array_range) {
  let array = [];
  while (length--) {
    let range = Math.random();
    let vr = Math.random();
    let value = Math.floor(
      Array.isArray(array_range)
        ? vr * (array_range[1] - array_range[0]) + array_range[0]
        : vr * array_range
    );

    if (range < 0.3) {
      array.push(LowerCase[value % 26]);
    } else if (range > 0.7) {
      array.push(value);
    } else {
      array.push(UpperCase[value % 26]);
    }
  }

  return array;
}

// console.log(getBlendArray(10, 70));

module.exports = {
  getArray,
  getBlendArray,
  LowerCase,
  UpperCase
};
