<template>
  <div class="task-todo push-list">
    <van-search v-model="keywords" placeholder="搜索" />
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
            <span v-if="item.MaintenanceTimeout" class="status-text success">
              <van-icon name="passed" />
              响应正常
            </span>
            <span v-else class="status-text success">
              <van-icon name="passed" />
              响应超时
            </span>
          </van-cell>
          <van-cell @click="$router.push(`/task-detail/${item.Id}`)">
            <div class="cont-title van-ellipsis">
              {{ item.OrderDescription }}
            </div>
            <ul class="cont-desc">
              <li>故障类型：{{ item.FailureType }}</li>
              <li>报修时间：{{ item.PresentationTime }}</li>
              <li>备注：{{ item.Remarks || "无" }}</li>
            </ul>
          </van-cell>
          <van-cell class="gm-list-card-footer">
            <van-button
              class="operate-btn"
              type="default"
              size="small"
              @click="handleOpenTransfer(item)"
            >
              转交任务
            </van-button>
          </van-cell>
        </div>
      </van-list>
    </van-pull-refresh>

    <transfer-popup
      v-model="transferPopupShow"
      :active-data="activeData"
      @confirm="onRefresh()"
    />
  </div>
</template>

<script>
import { Pad_Repair_GetRepairResponse } from "../../api/index";
export default {
  name: "TaskTodo",
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
      transferPopupShow: false,
      // 当前项
      activeData: {},
    };
  },
  components: {
    "transfer-popup": () =>
      import("../../components/service/TransferPopup.vue"),
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
        Pad_Repair_GetRepairResponse(params)
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
    handleOpenTransfer(item) {
      this.activeData = item;
      this.transferPopupShow = true;
    },
  },
};
</script>
