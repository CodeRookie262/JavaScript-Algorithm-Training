var utils = {
  // 数据类型检测
  toType: val =>
    Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase(),
  isFun(func) {
    return typeof func.__proto__ === 'function' && typeof func === 'function';
  },
  each(itor, cb) {
    if (typeof cb !== 'function') return;

    if (Array.isArray(itor)) {
      itor.forEach(cb);
    } else if (typeof itor === 'object' && itor) {
      for (var key in itor) {
        cb(itor[key], key);
      }
    }
  }
};

var copy = function () {
  const { toType, isFun, each } = utils;

  var target = arguments[0],
    map = arguments[arguments.length - 1],
    deep,
    clone;

  map instanceof Map || (map = new Map());

  if (toType(target) === 'boolean') {
    deep = target;
    target = arguments[1];
  }

  if (map.has(target)) {
    return deep ? null : target;
  }

  // 处理原始值，例如 number，string，boolean，symbol，bigint，null，undefined
  if (
    /^number|string|boolean|symbol|bigint$/i.test(toType(target)) ||
    target == null
  ) {
    return target;
  }

  // 内置类对象
  if (/^regexp|date$/gim.test(toType(target)))
    return new target.constructor(target);

  // 处理函数
  if (isFun(target)) {
    return function () {
      return target.apply(this, [].slice.call(arguments));
    };
  }
  clone = Array.isArray(target) ? [] : {};
  each(target, function (item, key) {
    deep && map.set(item, true);
    clone[key] = deep ? copy(deep, item, map) : item;
  });

  return clone;
};

module.exports = copy;
