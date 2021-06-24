<template>
  <div class="rep-file">
    <van-nav-bar
      class="gm-nav-bar"
      left-text="资料查询"
      left-arrow
      @click-left="$router.go(-1)"
      @click-right="searchPopupShow = true"
    >
      <template #right>
        <van-icon name="search" size="18" color="#888"/>
      </template>
    </van-nav-bar>
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
              title="陆联数控蜗杆磨床使用说明"
              label="设备使用说明规范设备使用说明规范设备使用设备使用说明规范设备使用说明规范设备使用说明设备"
              clickable
            />
          </div>
        </div>
      </van-list>
    </van-pull-refresh>

    <!-- 搜索弹窗 -->
    <van-popup
      v-model="searchPopupShow"
      class="search-popup"
      position="top"
      get-container="body"
    >
      <van-cell-group>
        <van-field
          v-model="keywords.KW"
          label="搜索"
          placeholder="请输入关键词"
        />
      </van-cell-group>
      <van-button class="popup-search-btn" type="info" @click="onSearch">
        搜索
      </van-button>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "RepFile",
  data() {
    return {
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      result: [],
      keywords: {
        KW: "",
      },
      searchPopupShow: false,
    };
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
    onSearch() {
      this.searchPopupShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.rep-file {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.van-pull-refresh {
  flex: 1;
}

.card-wrap {
  padding: 0 15px;
}
</style>