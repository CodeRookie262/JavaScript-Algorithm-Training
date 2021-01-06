/// <reference path="./index.d.ts" />
/**
 * createStore
 * 创建 store 对象，并将对象返回
 * @param {(state:{[key:string]:any},action:{type: string,[key:string]:any}) => {[key:string]:any}} reducer
 * @param {Function} [middleware] 中间件
 * @returns {{dispatch: Function,getState: Function,subscribe: Function}}  state 操作对象
 */

const createStore: CreateStore = function createStore(
  reducer,
  middleware
): Store {
  // store 状态
  let state: State;
  //监听队列
  let listers: Array<Observer> = [];

  /**
   * 获取最新的 state
   * @returns {store} state
   */
  const getState: GetState = function getState() {
    const { parse, stringify } = JSON;
    // 为了安全起见，返回深拷贝后的 state 对象，防止组件随意增加属性造成数据污染
    return parse(stringify(state));
  };

  /**
   * 发布函数
   * 接受一个 action 对象
   * @param {{type: string,[key:string]:any}} action
   * @returns {{[key:string]: any}} action
   */
  const dispatch: Dispatch = function dispatch(action: Action): Action {
    // 将 action 派发给 reducer 函数进行状态处理，并且更新最新的 state
    state = reducer(state, action);

    // 状态更新后还得执行以下我们的监听队列，告诉他们我们的 state 更新啦
    listers.forEach(observer => typeof observer === 'function' && observer());

    // 将此次分发的 action 返回出去
    return action;
  };

  /**
   * 订阅函数
   * @param {Function} lister 监听函数
   * @returns {Function} disconnect 注销监听
   */
  const subscribe: Subscribe = function subscribe(
    lister: Observer
  ): Disconnect {
    if (typeof lister !== 'function') {
      console.warn(
        'The Lister parameter of the subscribe function must be a function'
      );

      // 返回一个匿名函数，防止报错
      return () => {
        // 顺便在多提示几下 ￣ω￣=
        console.warn(
          'The Lister parameter of the subscribe function must be a function'
        );
      };
    }

    if (!listers.includes(lister)) {
      // 这里做一些优化，就是判断当前的 lister 是否已经存在 listers 队列中，存在就说明都不管直接返回注销函数出去即可
      listers.push(lister);
    }

    return function () {
      listers = listers.filter(observer => observer !== lister);
    };
  };

  if (typeof middleware === 'function') {
    return middleware(createStore)(reducer) as Store;
  }
  // 初始化 state
  dispatch({ type: `CODE_ROOKIE_262@@${Date.now().toString(16)}` });

  return {
    dispatch,
    getState,
    subscribe
  };
};

export default createStore;
