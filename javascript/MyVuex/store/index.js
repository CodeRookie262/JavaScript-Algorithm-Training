import Vue from 'vue';

import Vuex from '../myVuex';

Vue.use(Vuex);
const asyncRunner = (time, payload) =>
  new Promise(resolve => {
    const timer = setTimeout(() => {
      resolve(payload);
      clearTimeout(timer);
    }, time);
  });

const Page = {
  state: {
    count: 666666
  },
  // getters: {
  //   msg(state) {
  //     return `当前的count：${state.count}`;
  //   }
  // },
  mutations: {
    add(state, payload) {
      state.count += payload;
    },
    subtract(state, payload) {
      state.count -= payload;
    }
  },
  actions: {
    asyncAdd({ commit }, payload) {
      asyncRunner(2000).then(() => commit('add', payload));
    },
    asyncSubtract({ commit }, payload) {
      asyncRunner(2000).then(() => commit('subtract', payload));
    }
  }
};

const moduleA = {
  name: 'ppp',
  state: {
    count: 555
  },
  // getters: {
  //   msg(state) {
  //     return `当前的count：${state.count}`;
  //   }
  // },
  mutations: {
    add(state, payload) {
      state.count += payload;
    },
    subtract(state, payload) {
      state.count -= payload;
    }
  },
  actions: {
    asyncAdd({ commit }, payload) {
      asyncRunner(2000).then(() => commit('add', payload));
    },
    asyncSubtract({ commit }, payload) {
      asyncRunner(2000).then(() => commit('subtract', payload));
    }
  },
  modules: { Page, A: Page }
};
export default new Vuex.Store({
  state: {
    count: 1
  },
  getters: {
    msg(state) {
      // console.log('getters running~');
      return `当前的count：${state.count}`;
    }
  },
  mutations: {
    add(state, payload) {
      state.count += payload;
    },
    subtract(state, payload) {
      state.count -= payload;
    }
  },
  actions: {
    asyncAdd({ commit }, payload) {
      asyncRunner(2000).then(() => commit('add', payload));
    },
    asyncSubtract({ commit }, payload) {
      asyncRunner(2000).then(() => commit('subtract', payload));
    }
  },
  modules: { moduleA, hhh: Page }
});
