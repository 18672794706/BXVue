<template>
  <div>
    <van-popup
      class="add-parts-popup task-handle-popup"
      v-bind="$attrs"
      position="right"
      :style="{ width: '100%', height: '100%' }"
      v-on="$listeners"
      get-container="body"
    >
      <van-nav-bar
        class="gm-nav-bar"
        left-text="选择部品"
        left-arrow
        @click-left="$emit('input', false)"
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
          <van-checkbox-group v-model="result">
            <div class="card-wrap">
              <div
                class="gm-border-card"
                v-for="(item, index) in list"
                :key="item"
              >
                <van-cell
                  class="gm-border-card-header"
                  title="东五/秦川发展磨齿机"
                >
                  <template #icon>
                    <van-checkbox
                      class="van-cell__left-icon"
                      :name="index"
                      shape="square"
                    />
                  </template>
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
          </van-checkbox-group>
        </van-list>
      </van-pull-refresh>

      <van-row class="btns-fixed-bottom" gutter="20">
        <van-col span="4">
          <van-icon
            :class="checkedAllImg()"
            style="margin-top: 13px"
            @click="handleCheckedAll()"
          />
        </van-col>
        <van-col span="10">
          <van-button type="default" block @click="handleCancel">
            取消
          </van-button>
        </van-col>
        <van-col span="10">
          <van-button type="info" block @click="handleConfirm">
            确定
          </van-button>
        </van-col>
      </van-row>
    </van-popup>

    <!-- 搜索弹窗 -->
    <van-popup
      v-model="searchPopupShow"
      class="search-popup"
      position="top"
      get-container="body"
    >
      <van-cell-group>
        <van-field
          v-model="keywords.PM"
          label="品名"
          placeholder="请输入品名"
          clearable
        />
        <van-field
          v-model="keywords.BH"
          label="编号"
          placeholder="请输入编号"
          clearable
        />
        <van-field
          v-model="keywords.PP"
          label="品牌"
          placeholder="请输入品牌"
          clearable
        />
        <van-field
          v-model="keywords.GG"
          label="规格"
          placeholder="请输入规格"
          clearable
        />
        <van-field
          v-model="keywords.XH"
          label="型号"
          placeholder="请输入型号"
          clearable
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
  name: "AddPartsPopup",
  inheritAttrs: false,
  data() {
    return {
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      testNum: 1,
      result: [],
      keywords: {
        PM: "",
        BH: "",
        PP: "",
        GG: "",
        XH: "",
      },
      searchPopupShow: false,
      activeIcon: require("../../assets/img/icon-checked.png"),
      inactiveIcon: require("../../assets/img/icon-no-checked.png"),
      checkedSomeIcon: require("../../assets/img/icon-notAllchecked.png"),
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
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onSearch() {
      this.searchPopupShow = false;
    },
    handleCancel() {
      this.$emit("input", false);
    },
    handleConfirm() {
      this.$emit("input", false);
    },
    checkedAllImg() {
      const rLen = this.result.length;
      if (rLen === 0) {
        return "all-icon iconfont iconRectangle271Copy";
      } else if (rLen === this.list.length) {
        return "all-icon iconfont iconxuanzhong";
      } else {
        return "all-icon iconfont iconxuanzhong-bufen";
      }
    },
    handleCheckedAll() {
      const rLen = this.result.length;
      if (rLen === 0) {
        this.result = this.list.map((val, index) => {
          return index;
        });
      } else if (rLen === this.list.length) {
        this.result = [];
      } else {
        this.result = this.list.map((val, index) => {
          return index;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.desc-label {
  font-size: 14px;
  padding: 9px 15px;
}

.card-wrap {
  padding: 0 15px;
}

.van-pull-refresh {
  flex: 1;
}

.van-cell__left-icon.van-checkbox {
  transform: scale(0.8);
}

.all-icon {
  font-size: 18px;
  &.iconRectangle271Copy {
    color: #c8c9cc;
  }

  &.iconxuanzhong {
    color: #1989fa;
  }

  &.iconxuanzhong-bufen {
    color: #1989fa;
  }
}
</style>