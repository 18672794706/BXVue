<template>
  <div></div>
</template>
<script>
import Vue from "vue";
import { Toast } from "vant";
import dingtalk from "../../api/dingtalk.js";
Vue.use(Toast);
export default {
  created() {
    this.getdingtalkjssdk();
  },
  methods: {
    getdingtalkjssdk() {
      var $this = this;
      dingtalk
        .dingtalkjssdk()
        .then(function (response) {
          var ddconfig = {
            agentId: response.agentId,
            corpId: response.corpId,
            timeStamp: response.timestamp,
            nonceStr: response.nonceStr,
            signature: response.signature,
            jsApiList: [
              "biz.util.uploadImage",
              "biz.util.uploadImageFromCamera",
              "biz.util.uploadAttachment",
              "biz.cspace.saveFile",
            ],
          };
          dd.config(ddconfig);

          dd.error(function (error) {
            alert("dd error: " + JSON.stringify(error));
          });

          dd.ready(function () {
            dd.runtime.permission.requestAuthCode({
              corpId: response.corpId,
              onSuccess: function (result) {
                dingtalk
                  .dingtalklogin(result.code)
                  .then((result) => {
                    $this.$router.replace({
                      path: "/home",
                    });
                  })
                  .catch((error) => {
                    console.log("异常", error);
                  });
              },
              onFail: function (err) {},
            });
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
