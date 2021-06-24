<template>
  <div>
    <van-nav-bar
      :title="processName"
      left-text="返回"
      @click-left="onClickLeft"
      left-arrow
    />
    <iframe
      :src="url"
      frameborder="0"
      class="iframe-formpanel"
      width="100%"
      scrolling="yes"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "ifream",
  data() {
    return {
      formUrl: window.config.host,
      url: "",
      processName: "",
      navBarShow: true,
    };
  },
  methods: {
    getUrl() {
      let type = this.$route.query.pagetype;
      this.processName = this.$route.query.name;
      if (type === "other") {
        let page = this.$route.query.page;
        this.url = page;
        console.log("url", this.url);
      } else {
        let page = this.$route.query.page;
        this.url = `${this.formUrl}${page}`;
        console.log("url", this.url);
      }
    },
    onClickLeft() {
      this.$router.back();
    },
  },
  mounted() {
    let $this = this;
    this.$nextTick(() => {
      $this.getUrl();
    
    });
  },
  created() {},
};
</script>

<style scoped>
.iframe-formpanel {
  height: calc(100vh - 48px - constant(safe-area-inset-bottom));
  height: calc(100vh - 48px - env(safe-area-inset-bottom));
}
</style>
>
