// 将 Store 注入到组件中
export default function applyMixin(Vue) {
  // 检测 Vue 版本，只满足 V2 版本
  let version = Vue.version.split('.')[0];

  if (version >= 2) {
    // 符合版本
    // 将 Vuex 初始化函数混入到每个组件的 beforeCreate 生命周期中
    Vue.mixin({
      beforeCreate: VuexInit
    });
  } else {
    console.log(`(〒︿〒)你的版本太${version >= 3 ? '高' : '低'}了`);
  }
}

export function VuexInit() {
  var options = this.$options;
  // 将初始化根组件的  store 设置为 组件的 $store 属性
  // 判断根组件是否有注入 store
  // 因为我们是使用了 Vue.mixin 进行 store 注入，Vue 内部会帮我门进行递归处理，所以我们不需要考虑递归实现

  if (options.store) {
    this.$store = options.store;
  } else if (options.parent && options.parent.$store) {
    // 子组件取父组件的 $store属性，一层一层嵌套进行设置
    this.$store = options.parent.$store;
  }
}
