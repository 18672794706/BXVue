import axios from "axios";
import { log } from "./log.js";
import { Toast, Notify } from "vant";
import router from "../router/index.js";
const request = axios.create({});
request.defaults.baseURL = window.config.host;
let loadId = null;
request.interceptors.request.use(function(config) {
  if (config.hideloading) {
    // console.log(config);
  } else {
    loadId = Toast.loading({
      message: "请求中...",
      forbidClick: false,
      loadingType: "spinner",
    });
  }
  return config;
});
request.interceptors.response.use(
  function(response) {
    if (loadId) {
      loadId.clear();
    }
    let serverdata = response.data;
    if (serverdata.errorCode === 101) {
      router.push({ path: "/login" });
    } else if (serverdata.success == undefined || serverdata.success) {
      return response.data;
    } else {
      let message =
        serverdata.errorMessage === undefined
          ? serverdata.msg
          : serverdata.errorMessage;
      Notify({ type: "danger", message: message });
    }
  },
  function(error) {
    log.danger(`请求数据异常:${error}`);
    loadId.clear();

    Notify({ type: "danger", message: error.message });
    return Promise.reject(error);
  }
);
export default request;
