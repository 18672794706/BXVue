<template>
  <div>
    <van-popup v-model="fileshow" position="top" :style="{ height: '100%' }">
      <van-nav-bar title="查看" left-arrow @click-left="onClickLeft"></van-nav-bar>
      <iframe
        ref="iframe"
        id="bdIframe"
        :src="fileurl"
        frameborder="0"
        width="100%"
        height="100%"
        scrolling="yes"
      ></iframe>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: ["fileshow", "fileurl"],
  created() {
    this.$toast.loading({
      mask: true,
      message: "加载中..."
    });
  },
  mounted() {
    /**
     * iframe-宽高自适应显示
     */
    let _this = this;
    const oIframe = document.getElementById("bdIframe");
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.height = Number(deviceHeight) + "px";
    // 处理兼容行问题
    if (oIframe.attachEvent) {
      oIframe.attachEvent("onload", function() {
        // iframe加载完毕以后执行操作
        _this.$toast.clear();
      });
    } else {
      oIframe.onload = function() {
        // iframe加载完毕以后执行操作
        _this.$toast.clear();
      };
    }
  },
  methods: {
    onClickLeft() {
      this.$parent.fileshow = false;
    }
  }
};
</script>
