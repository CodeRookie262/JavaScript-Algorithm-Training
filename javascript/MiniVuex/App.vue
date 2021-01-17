<template>
  <div id="app">
    <ul>
      <li>count => {{ count }}</li>
      <li>pageCount => {{ pageCount }}</li>
      <li>msg => {{ msg }}</li>
    </ul>

    <div>
      <button @click="add1(1)">+</button>{{ " " }}
      <button @click="subtract(1)">-</button>{{ " " }}
      <button @click="asyncAdd(1)">异步+</button>{{ " " }}
      <button @click="asyncSubtract(1)">异步-</button>{{ " " }}
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "./MiniVuex";

export default {
  name: "App",
  computed: {
    count() {
      return this.$store.state.count;
    },
    // msg() {
    //   return this.$store.getters.msg;
    // },
    // 辅助方法
    ...mapState("moduleA/Page", {
      pageCount: "count",
    }),
    ...mapGetters(["msg"]),
  },
  methods: {
    // add(payload) {
    //   this.$store.commit("add", payload);
    // },
    // subtract(payload) {
    //   this.$store.commit("subtract", payload);
    // },
    asyncAdd(payload) {
      this.$store.dispatch("asyncAdd", payload);
    },
    asyncSubtract(payload) {
      this.$store.dispatch("asyncSubtract", payload);
    },
    // 辅助方法
    ...mapMutations({
      add1: "add",
    }),
    ...mapActions(["asyncAdd", "asyncSubtract"]),
  },
};
</script>

