import { normalizeMap, isValidMap } from './utils';
// 辅助方法
const mapState = function(...arg) {
  let namespace = 'root',
    filters = [],
    res = {};

  if (arg.length === 1 && isValidMap(arg[0])) {
    filters = arg[0];
  } else if (
    arg.length >= 2 &&
    typeof arg[0] === 'string' &&
    isValidMap(arg[1])
  ) {
    namespace = `${namespace}/${arg[0]}`;
    filters = arg[1];
  } else {
    console.warn('[Vuex]: 参数异常哦哦哦~');
    return res;
  }

  normalizeMap(filters).forEach(({ key, val }) => {
    res[key] = function mappedState() {
      return typeof val === 'function'
        ? val.call(this, nameSpace.get(namespace).state)
        : nameSpace.get(namespace).state[val];
    };
  });

  return res;
};

const mapGetters = function(...arg) {
  let namespace = 'root',
    filters = [],
    res = {};

  if (arg.length === 1 && isValidMap(arg[0])) {
    filters = arg[0];
  } else if (
    arg.length >= 2 &&
    typeof arg[0] === 'string' &&
    isValidMap(arg[1])
  ) {
    namespace = `${namespace}/${arg[0]}`;
    filters = arg[1];
  } else {
    console.warn('[Vuex]: 参数异常哦哦哦~');
    return res;
  }

  normalizeMap(filters).forEach(({ key, val }) => {
    res[key] = function mappedGetter() {
      return typeof val === 'function'
        ? val.call(this, nameSpace.get(namespace).getters)
        : nameSpace.get(namespace).getters[val];
    };
  });

  return res;
};

const mapMutations = function(...arg) {
  let namespace = 'root',
    filters = [],
    res = {};

  if (arg.length === 1 && isValidMap(arg[0])) {
    filters = arg[0];
  } else if (
    arg.length >= 2 &&
    typeof arg[0] === 'string' &&
    isValidMap(arg[1])
  ) {
    namespace = `${namespace}/${arg[0]}`;
    filters = arg[1];
  } else {
    console.warn('[Vuex]: 参数异常哦哦哦~');
    return res;
  }

  normalizeMap(filters).forEach(({ key, val }) => {
    res[key] = function mappedMutation(...args) {
      console.log(...args, nameSpace.get(namespace).commit(val, ...args));
    };
  });

  return res;
};
const mapActions = function(...arg) {
  let namespace = 'root',
    filters = [],
    res = {};

  if (arg.length === 1 && isValidMap(arg[0])) {
    filters = arg[0];
  } else if (
    arg.length >= 2 &&
    typeof arg[0] === 'string' &&
    isValidMap(arg[1])
  ) {
    namespace = `${namespace}/${arg[0]}`;
    filters = arg[1];
  } else {
    console.warn('[Vuex]: 参数异常哦哦哦~');
    return res;
  }

  normalizeMap(filters).forEach(({ key, val }) => {
    res[key] = function mappedMutation(...args) {
      console.log(...args, nameSpace.get(namespace).dispatch(val, ...args));
    };
  });

  return res;
};

export { mapState, mapGetters, mapMutations, mapActions };
