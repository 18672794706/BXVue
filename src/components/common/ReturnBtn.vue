<template>
  <div
    class="edit-drag"
    @click.stop="onBtnClicked"
    ref="floatButton"
    :style="{
      left: left + 'px',
      top: top + 'px',
    }"
  >
    <van-icon
      name="share"
      size="22"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      clientWidth: 0,
      clientHeight: 0,
      timer: null,
      currentTop: 0,
      left: 0,
      top: 0,
      isMoved: false,
    };
  },

  props: {
    gapWidth: {
      // 距离左右两边距离
      type: Number,
      default: document.documentElement.clientWidth - 76,
    },

    coefficientHeight: {
      // 从上到下距离比例
      type: Number,
      default: 0.8,
    },
  },

  watch: {
    top(val) {
      if (val < 16) {
        this.top = 16;
      } else if (val > document.documentElement.clientHeight - 61) {
        this.top = document.documentElement.clientHeight - 61;
      }
    },

    left(val) {
      if (val < 16) {
        this.left = 16;
      } else if (val > document.documentElement.clientWidth - 61) {
        this.left = document.documentElement.clientWidth - 61;
      }
    },
  },

  created() {
    this.clientWidth = document.documentElement.clientWidth;
    this.clientHeight = document.documentElement.clientHeight;
    this.left = this.clientWidth - this.itemWidth - this.gapWidth;
    this.top = this.clientHeight * this.coefficientHeight;
  },

  mounted() {
    this.$nextTick(() => {
      const floatButton = this.$refs.floatButton;
      floatButton.addEventListener("touchstart", (e) => {
        e.stopPropagation();
        floatButton.style.transition = "none";
      });

      // 在拖拽的过程中，组件应该跟随手指的移动而移动。
      floatButton.addEventListener("touchmove", (e) => {
        e.stopPropagation();
        this.isMoved = true;
        if (e.targetTouches.length === 1) {
          // 一根手指
          let touch = e.targetTouches[0];
          this.left = touch.clientX - 30;
          this.top = touch.clientY - 30;
        }
      });

      // 拖拽结束以后，重新调整组件的位置并重新设置过度动画。
      floatButton.addEventListener("touchend", (e) => {
        e.stopPropagation();
        if (this.isMoved) {
          floatButton.style.transition = "all 0.05s";
          if (this.left > document.documentElement.clientWidth / 2) {
            this.left = document.documentElement.clientWidth - 45;
          } else {
            this.left = 16;
          }
        }
        this.isMoved = false;
      });
    });
  },

  methods: {
    onBtnClicked() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/w-record" });
      } else {
        this.$router.back(-1);
      }
    },

    handleScrollStart() {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.handleScrollEnd();
      }, 300);
      this.currentTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (this.left > this.clientWidth / 2) {
        this.left = this.clientWidth - this.itemWidth / 2;
      } else {
        this.left = -this.itemWidth / 2;
      }
    },

    handleScrollEnd() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop === this.currentTop) {
        if (this.left > this.clientWidth / 2) {
          this.left = this.clientWidth - this.itemWidth - this.gapWidth;
        } else {
          this.left = this.gapWidth;
        }
        clearTimeout(this.timer);
      }
    },
  },

  beforeDestroy() {
    // 添加监听页面滚动
    window.removeEventListener("scroll", this.handleScrollStart);
  },
};
</script>

<style lang="scss" scoped>
.edit-drag {
  position: fixed;
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  border-radius: 55%;
  color: #1989fa;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1999;
  top: calc(100% - 61px);
  left: 16px;
  box-shadow: 0px 2px 6px 0px rgba(152, 152, 152, 0.49);
  font-size: 14px;
  transition: backgroundColor 0.2s;
  opacity: 0.5;

  &:active {
    opacity: 0.8;
    background-color: rgba(255, 255, 255, 1);
  }

  i{
    vertical-align: middle;
  }
}
</style>