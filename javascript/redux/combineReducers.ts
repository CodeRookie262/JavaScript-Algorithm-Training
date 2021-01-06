interface Action {
  type: string | number;
  [key: string]: any;
}

interface State {
  [key: string]: any;
}

interface Reducers {
  [key: string]: Reducer;
}

type Reducer = (state: State, action: Action) => State;

type CombineReducers = (reducers: Reducers) => Reducer;
/**
 * 合并多个 reducer 函数
 * @param  {{[key:string]: ((state:{[key:string]:any},action:{type: string,[key:string]:any}) => {[key:string]:any})}} reducers {reducer1: reducer1,reducer2: reducer2,...}
 * @returns {(state:{[key:string]:any},action:{type: string,[key:string]:any}) => {[key:string]:any}} reducer
 */
const combineReducers: CombineReducers = function combineReducers(reducers) {
  const reducer: Reducer = function reducer(state = {}, action) {
    let newState: State = {};
    // 更新每个模块的 state，并且将其最新状态返回
    for (var key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }

    return newState;
  };

  return reducer;
};

export default combineReducers;
