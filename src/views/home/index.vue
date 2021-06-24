<template>
  <div class="home">
    <div class="main">
      <router-view />
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item replace to="/features">
        <template #icon="props">
          <van-icon
            v-show="props.active"
            class="iconfont icongongnengliebiao-lancopy2"
            color="#1364e1"
            size="20"
          />
          <van-icon
            v-show="!props.active"
            class="iconfont icongongnengliebiao-huicopy21"
            color="#999999"
            size="20"
          />
        </template>
        功能列表
      </van-tabbar-item>
      <van-tabbar-item replace to="/person">
        <template #icon="props">
          <van-icon
            v-show="props.active"
            class="iconfont iconwode-lancopy3"
            color="#1364e1"
            size="20"
          />
          <van-icon
            v-show="!props.active"
            class="iconfont iconwode-lancopy4"
            color="#999999"
            size="20"
          />
        </template>
        个人中心
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      active: 0,
    };
  },
};
</script>
<style lang="scss" scoped>
.home {
  background-color: #f4f6f9;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .main {
    height: calc(100% - 50px);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    box-sizing: border-box;
  }
}
</style>
