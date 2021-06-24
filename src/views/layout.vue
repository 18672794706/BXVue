<template>
  <div class="main">
    <!-- 页面路由开始 -->
    <keep-alive>
      {{ $route.meta.isKeepLive }}
      <router-view></router-view>
    </keep-alive>
    <!-- 页面路由结束 -->
    <van-tabbar
      v-model="activeName"
      @change="onChange"
      :inactive-color="colorInfo.USELECTCOLOR"
      :active-color="colorInfo.SELECTCOLOR"
      :style="{
        background: colorInfo.BGCOLOR
      }"
    >
      <van-tabbar-item
        v-for="item in tabBarData"
        :key="item.TITLECN"
        :style="{ background: colorInfo.BGCOLOR }"
        :name="item.TOURL"
      >
        <template v-if="item.ICON !== ''" #icon>
          <i :class="item.ICON" style="font-size: 20px !important"></i>
        </template>
        <template v-else #icon>
          <i class="fa fa-bookmark-o" style="font-size: 20px !important"></i>
        </template>
        {{ item.TITLECN }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import layOutApi from "../api/layout.js";
export default {
  name: "layout",
  data() {
    return {
      colorInfo: {},
      tabBarData: [],
    };
  },
  computed: {
    ...mapGetters(["GET_ACTIVETAB"]),
    activeName: {
      get() {
        return this.GET_ACTIVETAB;
      },
      set() {},
    },
  },
  methods: {
    initTabList() {
      let $this = this;
      layOutApi
        .getTabData()
        .then((result) => {
          if (result.success) {
            const { children } = result;
            $this.tabBarData = children;
            console.log("tabbar", $this.tabBarData);
            let acName = this.GET_ACTIVETAB;
            let item = children.find((m) => m.TOURL === acName);
            if (item != null && item !== undefined)
              this.activeName = item.TITLECN;
          }
          console.log("底部数据", result);
          this.initColor();
        })
        .catch((error) => {
          console.error("获取底部选项卡异常", error);
        });
    },
    initColor() {
      let $this = this;
      layOutApi
        .getColor()
        .then((result) => {
          if (result.success) {
            const { row } = result;
            $this.colorInfo = row;
            console.log("colorinfo", $this.colorInfo);
          }
        })
        .catch((error) => {
          console.error("获取标签栏颜色异常", error);
        });
    },
    onChange(index) {
      let data = this.tabBarData;
      let item = data.find((m) => m.TOURL === index);
      if (item !== null && item !== undefined) {
        if (item.SELECTTYPE.toLowerCase() === "vue") {
          let value = item.TOURL;
          if (!value.startsWith("/")) value = `/${value}`;
          this.$router.push({ path: value });
        } else {
          let url = item.TOURL;
          this.$router.push({
            path: "/process",
            query: { pagetype: "other", name: index, page: url },
          });
        }
      }
    },
  },
  created() {
    this.initTabList();
  },
};
</script>

<style>
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-bottom-width: 0px !important;
}
</style>
