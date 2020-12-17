/**
 * 生成数组根据
 * @length   Number    数组长度
 * @range    [Start,End] | Number 数组边界
 */
const getArray = (length, range) => {
  const res = [];
  const getItem = (start = 0, end = Number.MAX_SAFE_INTEGER) =>
    (Math.random() * (end + 1) - start) | 0;

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
  Sort array is: ${JSON.stringify(res.slice().sort((a, b) => a - b))}
  `);

  return res;
};

module.exports = {
  getArray
};
