const ToolsLogger = () =>
  console.log(`
==========Tools===========
${Object.keys(module.exports).join('\n------------\n')}
`);

/**
 * 生成数组根据
 * @param length   Number    数组长度
 * @param range    [Start,End] | Number 数组边界
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
  Sort array is: ${JSON.stringify(res.slice().sort((a, b) => a - b))}
  `);

  return res;
};

module.exports = {
  getArray,
  logger: ToolsLogger
};
