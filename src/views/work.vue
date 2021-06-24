<template>
  <div style="background: rgb(244 250 253)">
    <van-nav-bar title="任务中心">
      <template #right>
        <van-icon name="search" size="18" @click="searchPanel = !searchPanel" />
      </template>
    </van-nav-bar>
    <div class="tab-content">
      <van-tabs :sticky="sticky" :swipeable="swipeable" v-model="tabActive">
        <!-- 待审批 -->
        <van-tab>
          <template #title>
            待审批 <span style="color: red">({{ awiteInfo.awiteCount }})</span>
          </template>
          <van-pull-refresh
            v-model="awiteInfo.refreshLoad"
            @refresh="awiteonRefresh"
          >
            <van-list
              v-model="awiteInfo.loading"
              :finished="awiteInfo.finished"
              finished-text="没有更多了"
              @load="awiteonLoad"
            >
              <work-card
                v-for="(item, index) in awiteInfo.awiteData"
                :key="index"
                :objData="item"
                typeName="dsp"
                @closeReload="closeReload"
              ></work-card>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <!-- 共享池 -->
        <van-tab title="共享池">
          <van-pull-refresh
            v-model="shareInfo.refreshLoad"
            @refresh="shareonRefresh"
          >
            <van-list
              v-model="shareInfo.loading"
              :finished="shareInfo.finished"
              finished-text="没有更多了"
              @load="initShareLoad"
            >
              <work-card
                v-for="(item, index) in shareInfo.shareData"
                :key="index"
                :objData="item"
                typeName="gxc"
                @closeReload="closeReload"
              ></work-card>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <!-- 已审批 -->
        <van-tab title="已审批">
          <van-pull-refresh
            v-model="CompleteInfo.refreshLoad"
            @refresh="completeonRefresh"
          >
            <van-list
              v-model="CompleteInfo.loading"
              :finished="CompleteInfo.finished"
              finished-text="没有更多了"
              @load="initCompleteLoad"
            >
              <work-card
                v-for="(item, index) in CompleteInfo.CompleteData"
                :key="index"
                :objData="item"
                typeName="ysp"
                @closeReload="closeReload"
              ></work-card>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <!-- 我的申请 -->
        <van-tab title="我的申请">
          <van-pull-refresh
            v-model="ApplyInfo.refreshLoad"
            @refresh="applyonRefresh"
          >
            <van-list
              v-model="ApplyInfo.loading"
              :finished="ApplyInfo.finished"
              finished-text="没有更多了"
              @load="initApplyLoad"
            >
              <work-card
                v-for="(item, index) in ApplyInfo.ApplyData"
                :key="index"
                :objData="item"
                typeName="wdsq"
                @closeReload="closeReload"
              ></work-card>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>

    <!-- 查询面板 -->
    <van-popup
      v-model="searchPanel"
      position="top"
      :close-on-click-overlay="false"
    >
      <h4 style="text-indent: 1em">快捷筛选</h4>
      <van-field
        clearable
        v-model="commonSearch.byYear"
        type="number"
        name="年份"
        label="年份"
        placeholder="年份"
      />
      <van-field
        clearable
        v-model="commonSearch.processName"
        name="流程名称"
        label="流程名称"
        placeholder="流程名称"
      />

      <van-field
        clearable
        v-model="commonSearch.status"
        name="状态"
        label="状态"
        placeholder="状态"
      />
      <van-field
        clearable
        v-model="commonSearch.sn"
        name="单号"
        label="单号"
        placeholder="单号"
      />
      <van-field
        clearable
        :value="commonSearch.reqStart"
        name="datetimePicker"
        label="开始时间段"
        placeholder="开始时间段"
        @click="startshowPicker = true"
      />
      <!-- 开始时间选择器开始 -->
      <van-popup v-model="startshowPicker" position="bottom">
        <van-datetime-picker
          type="date"
          @cancel="startshowPicker = false"
          @confirm="confirmStart"
        />
      </van-popup>
      <!--  开始时间选择器结束 -->

      <van-field
        clearable
        :value="commonSearch.reqEnd"
        name="datetimePicker"
        label="结束时间段"
        placeholder="结束时间段"
        @click="endshowPicker = true"
      />
      <!-- 结束时间选择器开始 -->
      <van-popup v-model="endshowPicker" position="bottom">
        <van-datetime-picker
          type="date"
          @cancel="endshowPicker = false"
          @confirm="confirmEnd"
        />
      </van-popup>
      <!-- 结束时间选择器结束 -->
      <div class="search-div">
        <van-button
          type="danger"
          size="small"
          style="padding: 15px"
          @click="searchPanel = !searchPanel"
          >关闭</van-button
        >
        <van-button
          type="warning"
          size="small"
          class="search-div-btn"
          @click="clearhanlder"
          >清空</van-button
        >
        <van-button
          type="primary"
          size="small"
          class="search-div-btn"
          @click="searchClick"
          >查询</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import workcard from "@/components/workcard.vue";
import workApi from "../api/work.js";
import { useTimeFormatter } from "../util/index.js";
export default {
  name: "word",
  data() {
    return {
      tabActive: 0,
      active: 0,
      sticky: true,
      swipeable: true,
      searchPanel: false,
      startshowPicker: false,
      endshowPicker: false,
      //公共查询条件
      commonSearch: {
        byYear: "",
        status: "",
        processName: "",
        sn: "",
        reqStart: "",
        reqEnd: "",
        searchKey: "",
      },
      //待审批
      awiteInfo: {
        pageIndex: 1,
        pageSize: 10,
        searchKey: "",
        loading: false,
        finished: false,
        refreshLoad: false,
        awiteData: [],
        awiteCount: 0,
      },
      //共享池
      shareInfo: {
        pageIndex: 1,
        pageSize: 10,
        searchKey: "",
        loading: false,
        finished: false,
        refreshLoad: false,
        shareData: [],
      },
      //已审批
      CompleteInfo: {
        pageIndex: 1,
        pageSize: 10,
        loading: false,
        finished: false,
        refreshLoad: false,
        CompleteData: [],
      },
      //我的申请
      ApplyInfo: {
        pageIndex: 1,
        pageSize: 10,
        loading: false,
        finished: false,
        refreshLoad: false,
        ApplyData: [],
      },
    };
  },
  components: {
    "work-card": workcard,
  },
  methods: {
    initawiteCount() {
      let $this = this;
      workApi
        .getTaskCount()
        .then((result) => {
          $this.awiteInfo.awiteCount = result.worklist;
        })
        .catch((error) => {
          console.log("加载待审批数量异常", error);
        });
    },
    //我的代办
    awiteonLoad() {
      let $this = this;
      workApi
        .getTaskList(
          $this.awiteInfo.pageIndex,
          $this.awiteInfo.pageSize,
          $this.commonSearch
        )
        .then((result) => {
          if (result !== null) {
            if (typeof result === "string") {
              let data = eval("(" + result + ")");
              const { children } = data;
              $this.awiteInfo.refreshLoad = false;
              if (children.length <= 0) {
                $this.awiteInfo.finished = true;
              } else {
                $this.awiteInfo.loading = false;
                $this.awiteInfo.finished = false;
                children.forEach((element) => {
                  $this.awiteInfo.awiteData.push(element);
                });
              }
            } else {
              $this.awiteInfo.refreshLoad = false;
              const { children } = result;
              if (children.length <= 0) {
                $this.awiteInfo.finished = true;
              } else {
                $this.awiteInfo.loading = false;
                $this.awiteInfo.finished = false;
                children.forEach((element) => {
                  $this.awiteInfo.awiteData.push(element);
                });
              }
            }
          }
          $this.awiteInfo.pageIndex += 1;
        })
        .catch((error) => {
          console.log("获取待审批异常", error);
        });
    },
    awiteonRefresh() {
      this.awiteInfo.awiteData = [];
      this.awiteInfo.pageIndex = 1;
      this.awiteonLoad();
    },
    // 初始化共享池
    initShareLoad() {
      let $this = this;
      workApi
        .getShareTask(
          $this.shareInfo.pageIndex,
          $this.shareInfo.pageSize,
          $this.commonSearch
        )
        .then((result) => {
          $this.shareInfo.refreshLoad = false;
          if (result !== null) {
            if (typeof result === "string") {
              let data = eval("(" + result + ")");
              const { children } = data;
              if (children.length <= 0) {
                $this.shareInfo.finished = true;
              } else {
                $this.shareInfo.loading = false;
                $this.shareInfo.finished = false;
                children.forEach((element) => {
                  $this.shareInfo.shareData.push(element);
                });
              }
            } else {
              const { children } = result;
              if (children.length <= 0) {
                $this.shareInfo.finished = true;
              } else {
                $this.shareInfo.loading = false;
                $this.shareInfo.finished = false;
                children.forEach((element) => {
                  $this.shareInfo.shareData.push(element);
                });
              }
            }
          }
          $this.shareInfo.pageIndex += 1;
        })
        .catch((error) => {
          console.log("获取共享池异常", error);
        });
    },
    shareonRefresh() {
      this.shareInfo.pageIndex = 1;
      this.shareInfo.shareData = [];
      this.initShareLoad();
    },
    // 初始化已审核
    initCompleteLoad() {
      let $this = this;
      workApi
        .getHistoryTask(
          $this.CompleteInfo.pageIndex,
          $this.CompleteInfo.pageSize,
          $this.commonSearch
        )
        .then((result) => {
          if (result !== null) {
            $this.CompleteInfo.refreshLoad = false;
            if (typeof result === "string") {
              let data = eval("(" + result + ")");
              const { children } = data;
              if (children.length <= 0) {
                $this.CompleteInfo.finished = true;
              } else {
                $this.CompleteInfo.finished = false;
                $this.CompleteInfo.loading = false;
                children.forEach((element) => {
                  $this.CompleteInfo.CompleteData.push(element);
                });
              }
            } else {
              const { children } = result;
              if (children.length <= 0) {
                $this.CompleteInfo.finished = true;
              } else {
                $this.CompleteInfo.finished = false;
                $this.CompleteInfo.loading = false;
                children.forEach((element) => {
                  $this.CompleteInfo.CompleteData.push(element);
                });
              }
            }
          }
          $this.CompleteInfo.pageIndex += 1;
        })
        .catch((error) => {
          console.log("获取已审核数据异常", error);
        });
      this.CompleteInfo.loading = false;
      this.CompleteInfo.refreshLoad = false;
      this.CompleteInfo.finished = false;
    },
    completeonRefresh() {
      this.CompleteInfo.pageIndex = 1;
      this.CompleteInfo.CompleteData = [];
      this.initCompleteLoad();
    },
    // 初始已申请
    initApplyLoad() {
      let $this = this;
      workApi
        .getMyApplyTask(
          $this.ApplyInfo.pageIndex,
          $this.ApplyInfo.pageSize,
          $this.commonSearch
        )
        .then((result) => {
          $this.ApplyInfo.refreshLoad = false;
          if (result !== null) {
            if (typeof result === "string") {
              let data = eval("(" + result + ")");
              const { children } = data;
              if (children.length <= 0) {
                $this.ApplyInfo.finished = true;
              } else {
                $this.ApplyInfo.finished = false;
                $this.ApplyInfo.loading = false;
                children.forEach((element) => {
                  $this.ApplyInfo.ApplyData.push(element);
                });
              }
            } else {
              const { children } = result;
              if (children.length <= 0) {
                $this.ApplyInfo.finished = true;
              } else {
                $this.ApplyInfo.finished = false;
                $this.ApplyInfo.loading = false;
                children.forEach((element) => {
                  $this.ApplyInfo.ApplyData.push(element);
                });
              }
            }
          }
          $this.ApplyInfo.pageIndex += 1;
        })
        .catch((error) => {
          console.log("获取已审核数据异常", error);
        });
    },
    applyonRefresh() {
      this.ApplyInfo.pageIndex = 1;
      this.ApplyInfo.ApplyData = [];
      this.initApplyLoad();
    },
    closeReload(cmd) {
      let $this = this;
      switch (cmd) {
        case "dsp":
          $this.awiteonRefresh();
          break;
        case "ysp":
          $this.completeonRefresh();
          break;
        case "gxc":
          $this.shareonRefresh();
          break;
        case "wdsq":
          $this.applyonRefresh();
          break;
      }
    },
    // 开始时间确定
    confirmStart(value) {
      this.commonSearch.reqStart = useTimeFormatter(value);
      this.startshowPicker = false;
    },
    confirmEnd(value) {
      this.commonSearch.reqEnd = useTimeFormatter(value);
      this.endshowPicker = false;
    },
    clearhanlder() {
      this.commonSearch.byYear = "";
      this.commonSearch.status = "";
      this.commonSearch.processName = "";
      this.commonSearch.sn = "";
      this.commonSearch.reqStart = "";
      this.commonSearch.reqEnd = "";
      this.commonSearch.searchKey = "";
    },
    // 查询按钮
    searchClick() {
      let type = this.tabActive;
      switch (type) {
        case 0:
          this.awiteInfo.pageIndex = 0;
          this.awiteInfo.awiteData = [];
          this.awiteonLoad();
          break;
        case 1:
          this.shareInfo.pageIndex = 0;
          this.shareInfo.shareData = [];
          this.initShareLoad();
          break;
        case 2:
          this.CompleteInfo.pageIndex = 0;
          this.CompleteInfo.CompleteData = [];
          this.initCompleteLoad();
          break;
        case 3:
          this.ApplyInfo.pageIndex = 0;
          this.ApplyInfo.ApplyData = [];
          this.initApplyLoad();
          break;
      }
      this.searchPanel = false;
    },
  },
  created() {
    this.initawiteCount();
  },
};
</script>

<style scoped>
.tab-content {
  height: calc(100vh - 46px - 50px);
  overflow-y: scroll;
}
.search-div {
  height: 50px;
  width: 100%;
  text-align: right;
}
.search-div-btn {
  margin: 10px;
  padding: 15px;
}
</style>
<style>
.van-tabs__line {
  width: 60px;
}
</style>
