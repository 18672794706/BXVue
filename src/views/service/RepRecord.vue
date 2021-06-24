<template>
  <div class="rep-record">
    <van-nav-bar
      class="gm-nav-bar"
      left-text="维修履历"
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
            <van-cell class="gm-border-card-header" title="东六/FBM-11025">
              <template #right-icon>
                <a class="open-link">查看维修报告书</a>
              </template>
            </van-cell>
            <van-row class="card-cont" gutter="20">
              <van-col span="12">
                <van-cell class="text-cell" title="部门：">箱体部</van-cell>
              </van-col>
              <van-col span="12">
                <van-cell class="text-cell" title="车间：">加工中心</van-cell>
              </van-col>
              <van-col span="24">
                <van-cell class="text-cell" title="故障类型：">
                  轨油漏油、主轴丝杆套坏、Z轴不能回零 点、换刀臂卡刀、刀位乱刀
                </van-cell>
              </van-col>
              <van-col span="24">
                <van-cell class="text-cell" title="报修时间：">
                  2020.03.25 12:45:01
                </van-cell>
              </van-col>
              <van-col span="24">
                <van-cell class="text-cell" title="备注：">无</van-cell>
              </van-col>
            </van-row>
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
          label="故障类型"
          placeholder="请输入"
        />
        <van-field
          v-model="keywords.KW"
          label="开始时间"
          placeholder="请输入"
        />
        <van-field
          v-model="keywords.KW"
          label="结束时间"
          placeholder="请输入"
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
  name: "RepRecord",
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
.rep-record {
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

.card-cont {
  padding: 5px 15px;
}

.text-cell {
  padding: 2px 0;

  .van-cell__title,
  .van-cell__value {
    color: #666666;
    text-align: left;
  }
}

.open-link {
  font-size: 12px;
  color: #1364e1;
}
</style>