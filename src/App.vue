<template>
  <div id="app">
    <router-view />
    <tf-loading v-if="pageLoading" />
    <return-btn v-if="pageReturn" />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState(["pageLoading", "pageReturn"]),
  },
  components: {
    // 返回按钮
    "return-btn": () => import("./components/common/ReturnBtn.vue"),
    // 页面loading
    "tf-loading": () => import("./components/common/loading.vue"),
  },
};
</script>

