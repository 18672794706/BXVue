<template>
  <div class="post">
    <!-- 搜索 -->
    <van-search
      @input="isWiting = true"
      placeholder="所有流程"
      class="search"
      clearable
      v-model="searchtext"
      @search="onSearch"
      @clear="load"
    ></van-search>

    <!-- 面包屑 -->
    <div class="task-tit">
      <span
        class="bread"
        v-for="(item, i) in breadData"
        :key="item.name"
        @click="breadClick(item, i)"
      >
        <b>{{ item.name }}</b>
        <van-icon name="arrow"></van-icon>
      </span>
    </div>

    <!-- 选择模式 -->
    <div class="switch-group">
      <ul class="clearfix" @click="showIcon = showIcon === 0 ? 1 : 0">
        <li :class="{ active: showIcon === 0 }">
          <i class="fa fa-list"></i>
        </li>
        <li :class="{ active: showIcon === 1 }">
          <i class="fa fa-th-large"></i>
        </li>
      </ul>
    </div>

    <div class="cont">
      <!-- 列表模式 -->
      <van-cell-group v-if="showIcon === 0">
        <!-- 返回上级 -->
        <van-cell v-show="breadData.length > 1" @click="goLast">
          <div class="item">
            <i
              class="fa fa-mail-reply"
              style="
                float: left;
                margin: 4px 28px 0px 0;
                color: #999;
                font-size: 30px !important;
              "
            ></i>
            <div class="item-cont">
              <div class="item-cont-inner" style="font-size: 14px; color: #999">
                返回{{ lastBreadItem.name }}
              </div>
            </div>
          </div>
        </van-cell>

        <van-cell v-for="(v, i) in searchProcessData" :key="i">
          <!-- 目录型 -->
          <div class="item" v-if="v.type === 0" @click="dataChange(v)">
            <template>
              <i
                class="fa fa-folder"
                style="
                  float: left;
                  margin-right: 20px;
                  color: #ffb800;
                  font-size: 40px !important;
                "
              ></i>
            </template>
            <div class="item-cont">
              <div class="item-cont-inner">{{ v.text || v.ProcessName }}</div>
            </div>
          </div>
          <!-- 文件型 -->
          <div class="item" v-else @click="gopost(v)">
            <i class="item-icon" :style="{ backgroundColor: v.Color }">{{
              v.ShortName
            }}</i>
            <div class="item-cont">
              <div class="item-cont-inner">{{ v.text || v.ProcessName }}</div>
            </div>
          </div>
        </van-cell>
      </van-cell-group>

      <!-- 图标模式 -->
      <van-row gutter="20" v-else>
        <!-- 返回上级 -->
        <van-col
          span="6"
          class="allpro"
          v-show="breadData.length > 1"
          @click="goLast"
        >
          <van-row>
            <i
              class="fa fa-mail-reply"
              style="font-size: 40px; color: #999"
            ></i>
          </van-row>
          <van-row style="margin-top: 8px">
            <van-col span="24">
              <div class="van-ellipsis" style="font-size: 12px; color: #999">
                返回{{ lastBreadItem.name }}
              </div>
            </van-col>
          </van-row>
        </van-col>

        <van-col
          span="6"
          class="allpro"
          v-for="(v, i) in searchProcessData"
          :key="i"
        >
          <!-- 目录型 -->
          <div v-if="v.type === 0" @click="dataChange(v)">
            <van-row>
              <i
                class="fa fa-folder"
                style="color: #ffb800; font-size: 40px !important"
              ></i>
            </van-row>
            <van-row style="margin-top: 8px">
              <van-col span="24">
                <div class="van-ellipsis">{{ v.text || v.ProcessName }}</div>
              </van-col>
            </van-row>
          </div>
          <!-- 文件型 -->
          <div v-else @click="gopost(v)">
            <van-row>
              <van-col
                class="icons"
                span="24"
                :style="{ backgroundColor: v.Color }"
                >{{ v.ShortName }}</van-col
              >
            </van-row>
            <van-row style="margin-top: 8px">
              <van-col span="24">
                <div class="van-ellipsis">{{ v.text || v.ProcessName }}</div>
              </van-col>
            </van-row>
          </div>
        </van-col>
      </van-row>

      <!-- 加载中 -->
      <p v-show="loading" class="loadingText">
        <van-loading type="spinner"></van-loading>
        <span>加载中</span>
      </p>
      <!-- 空数据 -->
      <div
        class="empty"
        v-show="searchProcessData.length <= 0 && !loading && !isWiting"
      >
        <van-icon class-prefix="icon" name="wuren"></van-icon>
        <p v-show="searchtext === ''">暂无数据</p>
        <p v-show="searchtext !== ''">
          未找到
          <cite class="tip-cite">“{{ searchtext }}”</cite>相关结果
        </p>
      </div>
    </div>

<!-- 弹框 -->
      <van-popup
      :get-container="modelContainer"
      v-model="ProcessPop"
      class="pro-pop"
      position="bottom"
    >
      <van-nav-bar
        :title="processNamePop"
        left-text="返回"
         left-arrow
        @click-left="ProcessPop = !ProcessPop"
      />
      <div>
          <iframe
          :src="formUrl"
          frameborder="0"
          class="iframe-formpanel"
          width="100%"
          scrolling="yes"
          name="processform"
        ></iframe>
      </div>
    </van-popup>
  </div>
</template>
<script>
import startApi from "../api/start.js";
export default {
  name: "start",
  data() {
    return {
      apiurl: "",
      mainUrl: "",
      searchtext: "",
      Processlist: [], //用于搜索
      breadData: [],
      showIcon: 0,
      isAddEvent: false,
      loading: false,
      isWiting: false,
      newProcessData: [],
      searchProcessData: [],
      modelContainer: "#app",
      ProcessPop:false,
      processNamePop:'',
      formUrl:''
    };
  },
  mounted(){
    window.addEventListener("message", this.handleMessage);
  },
  methods: {
    onSearch() {
      let $this = this;
      if ($this.searchtext === "") {
        $this.searchProcessData = this.newProcessData;
      } else {
        startApi
          .searchProcess($this.searchtext)
          .then((result) => {
            console.log("result", result);
            if (result !== null) {
              const { children } = result;
              console.log("childer", children);
              $this.searchProcessData = children;
            }
          })
          .catch((error) => {
            console.log("查询流程失败", error);
          });
      }
    },
    load() {
      this.searchProcessData = this.newProcessData;
    },
    gopost(val) {
      let name = val.ProcessName;
      this.processNamePop = name
      let url = `${window.config.host}/Post.aspx?pn=${encodeURIComponent(name)}`
      this.ProcessPop =true;
      this.formUrl = url
    },
    goLast() {
      if (this.breadData.length > 1) {
        this.breadData.pop();
        this.searchProcessData = [...this.breadData].pop().data;
      }
    },
    breadClick() {},
    initNewProcess() {
      let $this = this;
      startApi
        .getStartProcess()
        .then((result) => {
          if (result !== null) {
            const { children } = result;
            $this.newProcessData = children;
            let json = {
              name: "全部",
              data: children,
            };
            $this.breadData.push(json);
            $this.searchProcessData = $this.newProcessData;
            console.log("新流程", $this.newProcessData);
          }
        })
        .catch((error) => {
          console.log("获取最新流程异常", error);
        });
    },
    dataChange(item) {
      let value = JSON.parse(JSON.stringify(item.children));
      this.searchProcessData = value;
      let json = {
        name: item.text,
        data: value,
      };
      this.breadData.push(json);
    },
    handleMessage() {
      this.ProcessPop =false;
    }
  },
  computed: {
    lastBreadItem() {
      return this.breadData[this.breadData.length - 2] || {};
    },
  },
  created() {
    this.initNewProcess();
  },
};
</script>
<style scoped>
.post {
  height: 100%;
  overflow: auto;
}

.paddingtop {
  padding-top: 40px;
  padding-bottom: 40px;
}

.search {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
}

.icons {
  height: 50px;
  border-radius: 3px;
  color: white;
  padding: 15px 0;
  text-align: center;
}

.van-row {
  position: relative;
  width: 100%;
  text-align: center;
  margin-left: 0 !important;
}

.allpro {
  padding: 10px;
}

.van-ellipsis {
  line-height: 15px;
  font-size: 12px;
  text-align: center;
  overflow: hidden;
  color: #555555;
}

.task-tit {
  position: fixed;
  top: 54px;
  left: 0;
  width: calc(100% - 60px);
  text-align: left;
  white-space: nowrap;
  overflow-x: auto;
  box-sizing: border-box;
  z-index: 1;
  padding: 12px 16px 8px;
  color: #969799;
  font-size: 14px;
  line-height: 16px;
  background: #f8f8f8;
}

.switch-group {
  position: fixed;
  width: 76px;
  height: 36px;
  box-sizing: border-box;
  top: 54px;
  right: 0;
  padding: 2px;
  z-index: 1;
  background: #ffffff;
  text-align: right;
}

.switch-group ul {
  /* display: inline-block;
  width: 38px;
  box-sizing: border-box;
  color: skyblue;
  font-size: 14px;
  line-height: 16px;
  border: 1px solid skyblue;
  border-radius: 2px;
  margin-top: 10px; 
  margin-top: 3px;*/
}

.switch-group li {
  padding: 5px;
  text-align: center;
  float: left;
}

.switch-group li:first-child::after {
  content: "";
  display: block;
}

.switch-group li.active i {
  color: #000;
}

.switch-group li i {
  font-size: 22px;
  color: #aaa;
}

.cont {
  position: absolute;
  top: 95px;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  background-color: #fff;
}

.bread:last-child i {
  display: none;
}

.bread b {
  font-weight: normal;
  padding: 0 2px;
}

.bread i {
  vertical-align: middle;
}

.bread b:active {
  background-color: rgba(119, 119, 119, 0.1);
}

.icons-folder {
  height: 50px;
  border-radius: 3px;
  color: skyblue;
  padding: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icons-folder i {
  font-size: 32px;
}

.icons-return {
  height: 50px;
  border-radius: 3px;
  color: skyblue;
  padding: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icons-return i {
  font-size: 35px;
}

/* 列表样式 */
.item {
  height: 40px;
  position: relative;
}

.item-icon {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 22px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 20px;
  float: left;
  color: #ffffff;
  background-color: #f3f3f3;
}

.item-icon-folder,
.item-icon-return {
  color: skyblue;
}

.item-icon-return {
  font-size: 27px;
  background-color: transparent;
}

.item-icon.nobg {
  background-color: transparent;
}

.item-icon .van-icon__image {
  width: 100%;
  height: 100%;
}

.item-cont {
  height: 100%;
  overflow: hidden;
}

.item-cont:before {
  content: "";
  width: 0;
  font-size: 0;
  height: 100%;
  visibility: hidden;
  display: inline-block;
  vertical-align: middle;
}

.item-cont-inner {
  width: 100%;
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
  color: #333333;
}

.item-cont-inner.small {
  font-size: 14px;
  color: #81b0e8;
}

.loadingText {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
  color: #999999;
  font-size: 12px;
}

.loadingText span {
  margin: 10px 0;
}

.empty {
  color: #9e9e9e;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  font-size: 14px;
}

.empty i {
  display: block;
  color: #cccccc;
  font-size: 50px;
  margin-bottom: 10px;
}

.empty {
  text-align: center;
}

.tip-cite {
  color: skyblue;
  margin: 0 5px;
}
.iframe-formpanel {
  height: calc(100vh - 48px - constant(safe-area-inset-bottom));
  height: calc(100vh - 48px - env(safe-area-inset-bottom));
}

</style>
