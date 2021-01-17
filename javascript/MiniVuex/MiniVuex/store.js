import applyMixin from './applyMixin';
import { forEachObj } from './utils';

// 保留 Vue 构造函数
let Vue;

// 保护 Vue 实例，避免被注入修改
const VM = Symbol('VM');
const NS = Symbol('NS');

const nameSpace = new Map();
window.nameSpace = nameSpace;

class Store {
  constructor({
    state,
    getters = {},
    mutations = {},
    actions = {},
    modules = {},
    ...options
  }) {
    const computed = {};
    // this 重定向
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);

    this.getters = {};
    this.mutations = mutations;
    this.actions = actions;

    // console.log(modules);
    if (!nameSpace.size) {
      this[NS] = 'root';
      options[NS] = 'root';
      nameSpace.set('root', this);
    }
    if (Object.keys(modules).length > 0) {
      // console.log('存在模块', this[NS]);
      forEachObj(modules, function (key, subOption) {
        let instance = new Store(
          Object.assign(subOption, { [NS]: `${options[NS]}/${key}` })
        );
        instance[NS] = `${options[NS]}/${key}`;
        // console.log(instance, 'sub', subOption);
        nameSpace.set(instance[NS], instance);
        state[key] = instance.state;
      });
    }

    // 遍历 getters ，将它的值封装成一个新的对象并且赋值给 Vue 的 computed 进行缓存
    forEachObj(getters, (key, gets) => {
      computed[key] = () => gets(this.state);
      Object.defineProperty(this.getters, key, {
        get: () => this[VM][key]
      });
    });

    this[VM] = new Vue({
      data: {
        $$state: state
      },
      computed
    });
  }

  get state() {
    return this[VM]._data.$$state;
  }

  // 提交到  mutations 进行数据更改
  commit(key, ...payload) {
    this.mutations[key](this.state, ...payload);
  }

  // 可通过 commit 提交到 mutations 进行数据更改
  dispatch(key, ...payload) {
    // 将 Store 实例传给对应的 actions 函数
    this.actions[key](this, ...payload);
  }
}

// 安装 Vuex
const install = _Vue => {
  // 保存 Vue 构造函数
  applyMixin((Vue = _Vue));
};

export { Store, install };
