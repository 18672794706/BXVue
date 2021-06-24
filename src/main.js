import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./config/vant";
import "./assets/css/global.scss";
import axios from "axios";
import store from './store'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
//5678
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
