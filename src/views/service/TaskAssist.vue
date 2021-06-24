<template>
  <div class="task-assist push-list">
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
              value="箱体部/加工中心/东五/数控蜗杆磨床"
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
              @click="handleAssistComplele"
            >
              完成协助
            </van-button>
          </van-cell>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: "TaskAssist",
  data() {
    return {
      key: "",
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
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
    handleAssistComplele() {
      this.$dialog
        .confirm({
          message: "确认完成协助吗？",
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
