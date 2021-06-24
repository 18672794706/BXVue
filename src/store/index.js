import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageLoading: false,
  },
  mutations: {
    // 开启页面loading
    openLoading(state) {
      state.pageLoading = true;
    },

    // 关闭页面loading
    closeLoading(state) {
      state.pageLoading = false;
    },

    // 开启页面返回按钮
    openPageReturn(state) {
      state.pageReturn = true;
    },

    // 关闭页面返回按钮
    closePageReturn(state) {
      state.pageReturn = false;
    },
  },
  actions: {
    // 开启页面loading
    handleOpenLoading(context) {
      context.commit("openLoading");
    },

    // 关闭页面loading
    handleCloseLoading(context) {
      context.commit("closeLoading");
    },

    // 开启页面返回按钮
    handleOpenPageReturn(context) {
      context.commit("openPageReturn");
    },

    // 关闭页面返回按钮
    handleClosePageReturn(context) {
      context.commit("closePageReturn");
    },
  },
  modules: {},
});
