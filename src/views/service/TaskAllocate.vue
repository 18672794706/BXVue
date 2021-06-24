<template>
  <div class="task-allocate push-list">
    <van-search v-model="keywords" placeholder="搜索" @search="onSearch" />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="gm-list-card" v-for="item in list" :key="item.Id">
          <van-tag v-if="item.UrgentTask" class="fix-tag" type="danger">
            <span>紧急</span>
          </van-tag>
          <van-cell class="gm-list-card-header" :title="item.Number">
            <span>{{ item.Step }}</span>
            <van-tag plain type="danger"> {{ item.RepairStatus }} </van-tag>
          </van-cell>
          <van-cell @click="$router.push(`/task-detail/${item.Id}`)">
            <div class="cont-title van-ellipsis">
              {{ item.OrderDescription }}
            </div>
            <ul class="cont-desc">
              <li>故障类型：{{ item.FailureType }}</li>
              <li>维修时间：{{ item.PresentationTime }}</li>
              <li>备注：{{ item.Remarks || "无" }}</li>
            </ul>
          </van-cell>
          <van-cell class="gm-list-card-footer">
            <van-button
              type="default"
              size="small"
              @click="handleOpenAllocate(item)"
            >
              任务分配
            </van-button>
          </van-cell>
        </div>
      </van-list>
    </van-pull-refresh>

    <allocate-popup
      v-model="allocatePopupShow"
      :active-data="activeData"
      @confirm="onRefresh()"
    />
  </div>
</template>

<script>
import { Pad_Repair_GetDistributionTask } from "../../api/index";
export default {
  name: "TaskAllocate",
  data() {
    return {
      keywords: "",
      // 下拉树新loading
      isLoading: false,
      list: [],
      // 上拉加载loading
      loading: false,
      // 数据全部加载完成
      finished: false,
      //列表分页
      taskPageCtrl: {
        page: 0,
        size: 5,
        count: 0,
        noMore: false,
      },
      // 分配弹窗显示
      allocatePopupShow: false,
      // 当前项
      activeData: {},
    };
  },
  components: {
    "allocate-popup": () =>
      import("../../components/service/AllocatePopup.vue"),
  },
  methods: {
    onSearch() {
      this.list = [];
      this.taskPageCtrl = {
        page: 0,
        size: 5,
        count: 0,
        noMore: false,
      };
      this.onLoad();
    },
    onRefresh() {
      this.list = [];
      this.taskPageCtrl = {
        page: 0,
        size: 5,
        count: 0,
        noMore: false,
      };
      this.onLoad();
      this.isLoading = false;
      this.$toast("刷新成功");
    },
    onLoad() {
      if (!this.taskPageCtrl.noMore) {
        this.taskPageCtrl.page++;

        const params = {
          Page: this.taskPageCtrl.page,
          Number: this.taskPageCtrl.size,
          KeyWords: this.keywords,
        };
        Pad_Repair_GetDistributionTask(params)
          .then((res) => {
            if (res.ReturnResult === "1") {
              this.list.push(...res.ReturnData.children);

              // 加载状态结束
              this.loading = false;

              // 数据全部加载完成
              if (this.list.length === res.ReturnData.TotalRows) {
                this.finished = true;
              }
            } else {
              this.$notify(res.Message);
            }
          })
          .catch((err) => {
            this.$notify(err);
          });
      }
    },
    handleOpenAllocate(item) {
      this.activeData = item;
      this.allocatePopupShow = true;
    },
  },
};
</script>
