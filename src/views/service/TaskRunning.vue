<template>
  <div class="task-running push-list">
    <van-search v-model="key" placeholder="搜索" />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="gm-list-card" v-for="item in list" :key="item">
          <van-tag class="fix-tag" type="danger">
            <span>紧急</span>
          </van-tag>
          <van-cell class="gm-list-card-header" title="000012345569">
            <span>维修中</span>
            <span class="status-text success">
              <van-icon name="passed" />
              响应正常
            </span>
            <span class="status-text success">
              <van-icon name="passed" />
              维修正常
            </span>
          </van-cell>
          <van-cell @click="$router.push(`/task-detail/${9}`)">
            <van-cell
              class="text-cell"
              title="报修设备"
              value="箱体部/加工中心/东六/ER磨齿机"
            />
            <van-cell
              class="text-cell"
              title="故障类型"
              value="轨油漏油、主轴丝杆套坏"
            />
            <van-cell
              class="text-cell"
              title="维修时间"
              value="2019.08.08 20:00:30"
            />
            <van-cell
              class="text-cell"
              title="维修人员"
              value="孙建荣 17688889999"
            />
            <van-cell
              class="text-cell"
              title="协助人员"
              value="杨来军 13699997766"
            />
          </van-cell>
          <van-cell class="gm-list-card-footer">
            <van-button
              class="operate-btn"
              type="default"
              size="small"
              @click="handleOpenAssist"
            >
              维修协助
            </van-button>
            <van-button
              class="operate-btn"
              type="default"
              size="small"
              @click="handleOpenGoods"
            >
              领用部品
            </van-button>
            <van-button
              class="operate-btn"
              type="default"
              size="small"
              @click="handleComplete"
            >
              维修完成
            </van-button>
            <van-button
              class="operate-btn"
              type="default"
              size="small"
              @click="handleOpenTransfer"
            >
              转交任务
            </van-button>
          </van-cell>
        </div>
      </van-list>
    </van-pull-refresh>

    <assist-popup v-model="assistPopupShow" />
    <transfer-popup v-model="transferPopupShow" />
    <complele-popup v-model="completePopupShow" />
    <receiving-parts-popup v-model="RPartsPopupShow" />
  </div>
</template>

<script>
export default {
  name: "TaskRunning",
  data() {
    return {
      key: "",
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      assistPopupShow: false,
      RPartsPopupShow: false,
      transferPopupShow: false,
      completePopupShow: false,
    };
  },
  components: {
    "transfer-popup": () =>
      import("../../components/service/TransferPopup.vue"),
    "receiving-parts-popup": () =>
      import("../../components/service/ReceivingPartsPopup.vue"),
    "assist-popup": () => import("../../components/service/AssistPopup.vue"),
    "complele-popup": () =>
      import("../../components/service/CompletePopup.vue"),
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
    handleOpenAssist() {
      this.assistPopupShow = true;
    },
    handleOpenGoods() {
      this.RPartsPopupShow = true;
    },
    handleComplete() {
      this.completePopupShow = true;
    },
    handleOpenTransfer() {
      this.transferPopupShow = true;
    },
  },
};
</script>