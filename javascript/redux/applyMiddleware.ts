/// <reference path="./index.d.ts"/>

type Middlewares = (store: Store) => (dispatch: Dispatch) => Dispatch;

type ApplyMiddleware = (...middleware: Middlewares[]) => Middleware;

/**
 *
 * @param  {Function} middleware 中间件
 * @returns {Function} newCreateStore
 */
const applyMiddleware: ApplyMiddleware = function applyMiddleware(
  ...middlewares
) {
  return function (createStore: CreateStore) {
    return function (reducer: Reducer) {
      // 调用 createStore 获取 store 对象
      let store = createStore(reducer);

      // 将 store 对象传入中间件进行修饰
      let middleware = middlewares.map(middle => middle(store));

      // 将 store.dispatch 传入 多个中间件进行修饰
      let middleDispatch = compose(...middleware)(store.dispatch);
      // 返回经过中间件修饰过得 dispatch 以及 store
      return {
        ...store,
        dispatch: middleDispatch
      };
    };
  };
};

/**
 * 将 store.dispatch 传入多个中间件进行二次修改
 * @param  {Function} middlewares
 * @return {Function} composeDispatch
 *
 * 可查阅 https://github.com/CodeRookie262/JavaScript-Algorithm-Training/issues/6
 */

const compose = function (...middlewares: Function[]) {
  return (dispatch: Dispatch) =>
    middlewares.reduce(
      (middleDispatch, curMiddleWare) => curMiddleWare(middleDispatch),
      dispatch
    ) as Dispatch;
};

export default applyMiddleware;
