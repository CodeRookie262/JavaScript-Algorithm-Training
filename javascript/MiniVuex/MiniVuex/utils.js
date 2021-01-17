export const forEachObj = (obj, fn) => {
  for (var key in obj) {
    fn && fn(key, obj[key]);
  }
};

// 封装对象或者数组
export const normalizeMap = map => {
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }));
};

// 判断是否是可遍历的对象
export const isValidMap = function isValidMap(map) {
  return Array.isArray(map) || isObject(map);
};

export const isObject = function isObject(obj) {
  return obj !== null && typeof obj === 'object';
};
