<template>
  <!-- 首页-功能列表 -->
  <div>
    <van-skeleton title :row="8" :loading="loading">
      <div class="gm-card" v-for="item in centers" :key="item.Name">
        <div class="gm-card-header">
          {{ item.Name }}
        </div>
        <div class="gm-card-content">
          <van-grid icon-size="44px">
            <van-grid-item
              v-for="grid in item.Data"
              :key="grid.Name"
              :icon="grid.Icon"
              :text="grid.Name"
              :badge="handleNumber(grid.TaskQty)"
              :url="grid.Url"
            />
          </van-grid>
        </div>
      </div>
    </van-skeleton>
    <van-skeleton title :row="8" :loading="loading" />
  </div>
</template>

<script>
import { Pad_GetApplicationCenter } from "../../api/index";
export default {
  name: "Features",
  data() {
    return {
      loading: false,
      centers: [
        // {
        //   Name: "报修中心",
        //   Data: [
        //     {
        //       Name: "扫码报修",
        //       Icon: "https://alipic.lanhuapp.com/SketchPng489cbc3d36e81ab7fb4d8830f624bef9b22058e81d540ab57528600d569d97e9",
        //       Url: "#/start?qrcode=1",
        //       iswl: false,
        //       TaskQty: 0,
        //     },
        //     {
        //       Name: "我要报修",
        //       Icon: "https://alipic.lanhuapp.com/SketchPng79746abfe3512094ecfc27d832c710b591021e260a4dc2e79762b1bef04a0325",
        //       Url: "#/start",
        //       iswl: false,
        //       TaskQty: 0,
        //     },
        //   ],
        // },
        // {
        //   Name: "维修中心",
        //   Data: [
        //     {
        //       Name: "扫码签到",
        //       Icon: "https://alipic.lanhuapp.com/SketchPng28fd55b240a31ef14d71867ec9b62e1eaef99c00c87d0f8053128608474c988a",
        //       Url: "#/sign-in",
        //       iswl: false,
        //       TaskQty: 0,
        //     },
        //     {
        //       Name: "任务分配",
        //       Icon: "https://alipic.lanhuapp.com/SketchPng8d7e04a59d5084c4e6b96780eae7c1b2b8c3e0ec41f7e935a80cedf44ff93c97",
        //       Url: "#/task-allocate",
        //       iswl: false,
        //       TaskQty: 6,
        //     },
        //     {
        //       Name: "待处理任务",
        //       Icon: "https://alipic.lanhuapp.com/SketchPng9ce07b230c86d96045c7aa64e8389bc05c055ae1fa925e7a7c8ee5388ee61bb0",
        //       Url: "#/task-todo",
        //       iswl: false,
        //       TaskQty: 100,
        //     },
        //     {
        //       Name: "维修中任务",
        //       Icon: "https://alipic.lanhuapp.com/SketchPng0e4076f171cf07cca2e3189bba01719104959961c315af1e55c96be74a8dc51c",
        //       Url: "#/task-running",
        //       iswl: false,
        //       TaskQty: 0,
        //     },
        //     {
        //       Name: "维修记录",
        //       Icon: "https://alipic.lanhuapp.com/SketchPng9ce07b230c86d96045c7aa64e8389bc05c055ae1fa925e7a7c8ee5388ee61bb0",
        //       Url: "#/task-record",
        //       iswl: false,
        //       TaskQty: 0,
        //     },
        //     {
        //       Name: "永久对策任务",
        //       Icon: "https://alipic.lanhuapp.com/SketchPngfe6066d4bb8a74d49d92f8040d1c29989b1dce941f10618edb00087a0f0e0687",
        //       Url: "#/task-permanent-decision",
        //       iswl: false,
        //       TaskQty: 0,
        //     },
        //     {
        //       Name: "协助任务",
        //       Icon: "https://alipic.lanhuapp.com/SketchPng51c8212817064eb15e169d2671d0814bf41380f60025ce64e62da719b75bd5a0",
        //       Url: "#/task-assist",
        //       iswl: false,
        //       TaskQty: 0,
        //     },
        //   ],
        // },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      Pad_GetApplicationCenter()
        .then((res) => {
          if (res.ReturnResult === "1") {
            this.centers = res.ReturnData.AppList;
          } else {
            this.$notify(res.Message);
          }
        })
        .catch((err) => {
          this.$notify(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleNumber(num) {
      return num <= 0 ? "" : num >= 100 ? "99+" : num;
    },
  },
};
</script>

<style lang="scss" scoped>
.gm-card {
  background: #fff;
  margin: 10px 0;

  .gm-card-header {
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
    padding: 0 15px;
    height: 42px;
    line-height: 42px;
  }
}
</style>