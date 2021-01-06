declare interface Action {
  type: string | number;
  [key: string]: any;
}

declare interface State {
  [key: string]: any;
}

declare interface Store {
  dispatch: Dispatch;
  getState: GetState;
  subscribe: Subscribe;
}

declare type Reducer = (state: State, action: Action) => State;
declare type Observer = () => void;
declare type Disconnect = () => void;
declare type Dispatch = (action: Action) => Action;
declare type Subscribe = (observer: Observer) => Disconnect;
declare type GetState = () => State;
declare type Middleware = (
  createStore: CreateStore
) => (reducer: Reducer) => State;
declare type CreateStore = (reducer: Reducer, middleware?: Middleware) => Store;
