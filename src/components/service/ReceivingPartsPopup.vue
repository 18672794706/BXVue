<template>
  <div>
    <van-popup
      class="receiving-parts-popup task-handle-popup"
      v-bind="$attrs"
      position="right"
      :style="{ width: '100%', height: '100%' }"
      v-on="$listeners"
      get-container="body"
    >
      <van-nav-bar
        class="gm-nav-bar"
        left-text="领用部品"
        left-arrow
        @click-left="$emit('input', false)"
      >
        <template #right>
          <van-button
            class="nav-btn"
            icon="plus"
            plain
            type="info"
            @click="addPartsPopupShow = true"
          >
            添加部品
          </van-button>
        </template>
      </van-nav-bar>
      <div class="desc-label">已领用部品：</div>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="card-wrap">
            <div class="gm-border-card" v-for="item in list" :key="item">
              <van-cell
                class="gm-border-card-header"
                title="东五/秦川发展磨齿机"
              >
                <template #right-icon>
                  <van-stepper v-model="testNum" button-size="24" />
                </template>
              </van-cell>
              <van-row class="text-row" gutter="20">
                <van-col span="12"> 编号：010-1102 </van-col>
                <van-col span="12">品牌：北一大隈</van-col>
              </van-row>
              <van-row class="text-row" gutter="20">
                <van-col span="12"> 型号：MA-500HB-R </van-col>
                <van-col span="12">规格：00001</van-col>
              </van-row>
              <van-row class="text-row" gutter="20">
                <van-col span="12"> 数量：12 </van-col>
                <van-col span="12">货架：00001</van-col>
              </van-row>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>

      <van-row class="btns-fixed-bottom" gutter="20">
        <van-col span="12">
          <van-button type="default" block @click="handleCancel">
            取消
          </van-button>
        </van-col>
        <van-col span="12">
          <van-button type="info" block @click="handleConfirm">
            确定
          </van-button>
        </van-col>
      </van-row>
    </van-popup>
    <add-parts-popup v-model="addPartsPopupShow" />
  </div>
</template>

<script>
export default {
  name: "ReceivingPartsPopup",
  inheritAttrs: false,
  data() {
    return {
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      testNum: 1,
      addPartsPopupShow: false,
    };
  },
  components: {
    "add-parts-popup": () => import("./AddPartsPopup.vue"),
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 20) {
          this.finished = true;
        }
      }, 1000);
    },
    handleCancel() {
      this.$emit("input", false);
    },
    handleConfirm() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-btn {
  color:#1364E1;
  height: 34px;
  background: #f1f5fa;
  border-radius: 4px;
  border: none;
  padding:0 10px;
  font-size: 13px;
}

.desc-label {
  font-size: 14px;
  padding: 9px 15px;
}

.gm-border-card:first-child{
  margin-top: 0;
}

.card-wrap {
  padding: 0 15px;
}

.van-pull-refresh {
  flex: 1;
}
</style>