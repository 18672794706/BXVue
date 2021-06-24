<template>
  <div />
</template>
<script>
import Vue from "vue";
import { Toast } from "vant";
import wechat from "../../api/wechat";
Vue.use(Toast);
export default {
  created() {
    var $this = this;
    let code = this.getQueryVariable("code");
    if (code == "" || code == undefined) {
      this.getLoginUrl().then((result) => {
        window.location.replace(result);
      });
    } else {
      wechat
        .wechatlogin(code)
        .then((result) => {
          console.log(result)
          $this.getwehatjssdk();
          $this.$router.replace({
            path: "/",
          });
        })
        .catch((error) => {
          console.log("异常", error);
        });
    }
  },
  methods: {
    getwechatconfig() {
      return wechat
        .getwechatconfig()
        .then((result) => {
          window.WxCropId = result.WxCropId;
        })
        .catch((error) => {
          console.log("获取微信参数异常", error);
        });
    },
    async getLoginUrl() {
      await this.getwechatconfig();
      let redirect = escape(location.href);
      let config = window.WxCropId;
      let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config}&redirect_uri=${redirect}&response_type=code&scope=snsapi_base&state=1#wechat_redirect`;
      return url;
    },
    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
    getwehatjssdk() {
      wechat
        .wechatjssdk()
        .then(function (response) {
          window.wx.config({
            beta: true,
            debug: false,
            appId: response.corpId,
            timestamp: response.timestamp,
            nonceStr: response.nonceStr,
            signature: response.signature,
            jsApiList: [
              "chooseImage",
              "uploadImage",
              "previewFile",
              "previewImage",
              "openLocation",
              "getLocation",
              "scanQRCode"
            ],
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.returnUrl = to.query.returnUrl || from.fullPath || "/";
    });
  },
};
</script>
