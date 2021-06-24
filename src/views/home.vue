<template>
  <div style="padding-bottom: 100px">
    <div class="home-banner" v-if="config.isOpen">
      <van-swipe
        :autoplay="config.autoplay"
        :duration="config.duration"
        :loop="config.loop"
        :show-indicators="config.showIndicators"
        :vertical="config.vertical"
      >
        <van-swipe-item v-for="(image, index) in imageList" :key="index">
          <img :src="`${image.FILE64}`" alt="" style="width: 100%; height: 160px" />
          {{ image.path }}
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="main-div">
      <div class="title-div">
        <p>
          <b>常用流程</b>
          <span class="addtip" @click="popClick">
            <van-icon name="plus" />
          </span>
        </p>
      </div>
      <!-- 常用流程 -->
      <div class="application-div">
        <div v-for="item in processList" :key="item.NAME">
          <home-spance :item="item" @handlerMenuClick="handlerMenuClick"></home-spance>
        </div>
      </div>
      <!-- 后端返回布局数据 -->
      <div class="application-div">
        <div v-for="item in homeSpanceData" :key="item.NAME">
          <div class="title-div" v-if="item.PID == '-1'">
            <p>
              <b> {{ item.NAME }} </b>
            </p>
          </div>
          <home-spance :item="item" @handlerMenuClick="handlerMenuClick"></home-spance>
        </div>
      </div>
    </div>
    <!-- 编辑流程弹层开始 -->
    <van-popup get-container="#app" v-model="pPop" class="pro-pop" style="padding-bottom: 0" position="bottom">
      <van-nav-bar title="管理常用流程" right-text="完成" @click-right="closeClick" />
      <van-search v-model="searchkey" placeholder="请输入搜索关键词" />
      <p data-v-558b7308="" class="message">
        你可以将常用的流程添加到App首页，
        <br data-v-558b7308="" />也可以按住拖动调整应用顺序
      </p>
      <div class="coll-div">
        <h4 style="text-indent: 1em">我的收藏</h4>
        <draggable
          v-model="popProcessList"
          forceFallback="true"
          group="people"
          animation="1000"
          @end="endhandler"
          :move="onMove"
        >
          <transition-group>
            <drap-card
              v-for="(item, index) in popProcessList"
              :key="'aa' + index"
              :isshow="isshow"
              :objData="item"
              source="coll"
              @cancleProcess="cancleProcess"
            ></drap-card>
          </transition-group>
        </draggable>
      </div>
      <van-divider>以上流程展示在首页(建议最多8个)</van-divider>
      <div class="coll-div">
        <h4 style="text-indent: 1em">所有流程</h4>
        <drap-card
          v-for="(item, index) in searchProcess"
          :key="'aa' + index"
          :isshow="isshow"
          :objData="item"
          source="coll"
          icontype="plus"
          @cancleProcess="cancleProcess"
          @addProcess="addProcess"
        ></drap-card>
      </div>
    </van-popup>
    <!--点击文件夹弹层-->
    <van-popup
      :get-container="modelContainer"
      v-model="menuPop"
      class="pro-pop"
      position="bottom"
      style="padding-bottom: 0"
    >
      <van-nav-bar
        :title="menuPopName"
        right-text="关闭"
        @click-right="menuPop = !menuPop"
      />
      <div class="application-div">
        <div v-for="item in menuPopSpance" :key="item.NAME">
          <div class="title-div" v-if="item.PID == '-1'">
            {{ item.NAME }}
          </div>
          <home-spance :item="item" @handlerMenuClick="handlerMenuClick"></home-spance>
        </div>
      </div>
    </van-popup>
    <!-- 点击流程弹层 -->
    <van-popup
      :get-container="modelContainer"
      v-model="ProcessPop"
      class="pro-pop"
      position="bottom"
      style="padding-bottom: 0"
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
          ref="home"
        ></iframe>
      </div>
    </van-popup>
  </div>
</template>

<script>
import homeApi from "../api/home";
import startApi from "../api/start";
import drapcard from "../components/drapcard";
import draggable from "vuedraggable";
import layOutApi from "../api/layout.js";
import homeSpace from "../components/homespance";
import { mapActions } from "vuex";
export default {
  name: "home",
  data() {
    return {
      imageList: [],
      config: {},
      loading: false,
      pPop: false,
      isshow: true,
      processList: [], //展示首页常用流程
      popProcessList: [], //弹层收藏展示
      //正在拖动的元素，即原元素
      sourceElment: null,
      soucrceIndex: 0, //原元素的位置
      //目标元素，即目标元素
      targetElment: null,
      targetElementIndex: 0, //目标元素的位置
      position: "",
      searchkey: "",
      pageIndex: 1,
      start: 0,
      pageSize: 35,
      newProcessData: [],
      searchProcess: [],
      homeSpanceData: [],
      modelContainer: "#app",
      menuPop: false,
      menuPopName: "",
      menuPopSpance: [],
      ProcessPop: false,
      processNamePop: "",
      formUrl: "",
      navBarShow:true 
    };
  },
  methods: {
    ...mapActions(["SET_SWIPER"]),
    /**
     * 获取常用流程
     */
    getApplication() {
      let $this = this;
      homeApi
        .getMyProcess()
        .then((result) => {
          if (result !== null) {
            const { children } = result;
            if (children !== null && children !== undefined && children.length > 0) {
              let childerJson = {
                BORDER: 1,
                children: [],
              };
              children.forEach((element) => {
                let json = {
                  COLUNMNUM: 4,
                  NAME: element.ShortName,
                  ProcessName: element.ProcessName,
                  URLTYPE: "EXTJS",
                  ICON: "",
                };
                childerJson.children.push(json);
              });
              $this.processList.push(childerJson);
              $this.popProcessList = children;
            }
          }
        })
        .catch((error) => {
          console.log("获取常用流程失败", error);
        });
    },
    endhandler() {
      let requestJson = {
        resType: "Process",
        position: this.position,
        _dc: new Date().getTime(),
        target: this.targetElment.ProcessName,
        noqs: true,
      };
      let sourceArrys = [];
      sourceArrys.push(this.sourceElment.ProcessName);
      startApi
        .moveProcess(requestJson, sourceArrys)
        .then((result) => {
          console.log("流程移动成功", result);
        })
        .catch((error) => {
          console.log("移动流程异常", error);
        });
    },
    onMove(e) {
      this.sourceElment = e.draggedContext.element;
      this.targetElment = e.relatedContext.element;
      this.soucrceIndex = e.draggedContext.index;
      this.targetElementIndex = e.relatedContext.index;
      if (this.soucrceIndex < this.targetElementIndex) {
        this.position = "after";
      } else {
        this.position = "before";
      }
    },
    /**
     * 取消流程
     */
    cancleProcess(val) {
      let $this = this;
      let index = this.popProcessList.findIndex((x) => x.ProcessName === val);
      let item = this.popProcessList.find((x) => x.ProcessName === val);
      this.popProcessList.splice(index, 1);
      $this.processList = $this.popProcessList;
      console.log("取消的数值", val);
      startApi
        .cancleProcess(val)
        .then((result) => {
          console.log("取消成功", result);
          $this.searchProcess.push(item);
        })
        .catch((error) => {
          console.log("取消收藏失败", error);
        });
    },
    /**
     * 添加流程
     */
    addProcess(val) {
      let $this = this;
      homeApi
        .addProcess(val)
        .then((result) => {
          if (result) {
            let index = $this.searchProcess.findIndex((x) => x.ProcessName === val);
            let item = $this.searchProcess.find((x) => x.ProcessName === val);
            $this.searchProcess.splice(index, 1);
            $this.popProcessList.push(item);
          }
        })
        .catch((error) => {
          console.log("流程添加失败", error);
        });
    },
    /**
     * 获取所有流程
     */
    initNewProcess() {
      let $this = this;
      $this.newProcessData = [];
      let requestJson = {
        _dc: new Date().getTime(),
        page: $this.pageIndex,
        start: $this.start,
        limit: $this.pageSize,
      };
      startApi
        .getNewProcess(requestJson)
        .then((result) => {
          if (result !== null) {
            const { children } = result;
            let collData = $this.popProcessList;
            children.forEach((element) => {
              let item = collData.find((x) => x.ProcessName === element.ProcessName);
              if (item === undefined) {
                $this.newProcessData.push(element);
              }
            });
            $this.searchProcess = $this.newProcessData;
          }
        })
        .catch((error) => {
          console.log("获取最新流程异常", error);
        });
    },
    initSwiper() {
      let $this = this;
      layOutApi
        .getSwiper()
        .then((result) => {
          if (result.success) {
            let configItem = JSON.parse(result.config);
            $this.config = configItem;
            console.log("config", configItem);
            $this.imageList = result.items;
            console.log("imagelsit", $this.imageList);
            $this.SET_SWIPER($this.imageList);
          }
        })
        .catch((error) => {
          console.log("获取幻灯片异常", error);
        });
    },
    /**
     * 打开流程
     */
    gopost(val) {
      this.$router.push({
        path: "/process",
        query: {
          name: val.ProcessName,
          page: `/Post.aspx?pn=${encodeURIComponent(val.ProcessName)}`,
        },
      });
    },
    /**
     * 打开extjs应用
     */
    goExtjs(val) {
       this.$router.push({
        path: "/process",
        query: {
          name: val.ProcessName,
          navbarshow:false,
          page: `/h.aspx?xclass=${val.app.URL}`
        },
      });
    },
    /**
     * 初始化首页空间
     */
    initHomeSpance() {
      let $this = this;
      homeApi
        .getHomeSpance()
        .then((result) => {
          if (result.success) {
            const { children } = result;
            $this.homeSpanceData = children;
          }
        })
        .catch((error) => {
          console.log("获取首页空间异常", error);
        });
    },
    /**
     * 点击菜单样式
     */
    handlerMenuClick(app) {
      let $this = this;
      if (app.type === 1) {
        console.log("app", app);
        if (
          app.urlType === "EXTJS" &&
          app.app.ProcessName !== undefined &&
          app.app.ProcessName !== ""
        ) {
          $this.ProcessPop = true;
          $this.processNamePop = app.app.ProcessName;
          let host =
            window.config.host +
            `/Post.aspx?pn=${encodeURIComponent($this.processNamePop)}`;
          $this.formUrl = host;
        } else if (app.urlType === "EXTJS" && app.ProcessName === undefined) {
              $this.goExtjs({navshow:false,app:app.app,ProcessName:app.app.NAME})
        } else {
             $this.gopost({ ProcessName: app.app.ProcessName });
        }
      } else {
        homeApi
          .getHomeSpanceByPID(app.app.ID)
          .then((result) => {
            if (result.success) {
              const { children } = result;
              $this.menuPopSpance = [];
              let json = {
                children: children,
              };
              $this.menuPopSpance.push(json);
              $this.menuPop = true;
              $this.menuPopName = app.app.NAME;
            }
          })
          .catch((error) => {
            console.error("获取菜单子项异常", error);
          });
      }
    },
    popClick() {
      this.pPop = true;
      this.initNewProcess();
    },
    handleMessage() {
      this.ProcessPop = false;
    },
    closeClick() {
      this.pPop = false;
      let items = this.popProcessList;
      this.processList = [];
      let children = [];
      items.forEach((element) => {
        let json = {
          COLUNMNUM: 4,
          NAME: element.ShortName,
          ProcessName: element.ProcessName,
          URLTYPE: "EXTJS",
          ICON: "",
        };
        children.push(json);
      });
      this.processList.push({
        BORDER: 1,
        children: children,
      });
    },
  },
  components: {
    "drap-card": drapcard,
    draggable,
    "home-spance": homeSpace,
  },
  mounted() {
    let $this = this;
    window.addEventListener("message", function (e) {
      if (e.data.cmd !== undefined && e.data.cmd === "yzback") {
        var i = 0;
        if (i == 0) {
          $this.handleMessage();
        }
        i++;
      }
    });
  },
  watch: {
    searchkey: {
      deep: true,
      immediate: true,
      handler(val) {
        console.log("val", val);
        if (val !== "" && val !== null && val !== undefined) {
          let list = this.newProcessData.filter((x) => x.ProcessName.indexOf(val) >= 0);
          this.searchProcess = list;
        } else {
          this.searchProcess = this.newProcessData;
        }
      },
    },
  },
  destroyed() {
    this.$off("handlerMenuClick");
  },
  created() {
    this.initSwiper();
    this.initHomeSpance();
    this.getApplication();
  },
};
</script>

<style scoped>
.home-banner {
  width: 100%;
  height: 160px;
  overflow: hidden;
}
.main-div {
  height: calc(100vh - 160px - 50px);
  overflow-y: scroll;
}
.title-div {
  padding-left: 5px;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  padding-left: 7px;
  font-weight: bold;
}
.title-div p b {
  padding-left: 5px;
  font-size: 15px;
}
.title-div p {
  margin: 0px;
  padding: 0px;
}
.addtip {
  float: right;
  padding-right: 10px;
  color: red;
  height: 40px;
}
.addtip i {
  font-size: 20px;
  padding-top: 10px;
}
.pro-pop {
  height: 100vh;
  overflow: scroll;
}
.coll-div {
  width: 100%;
  height: auto;
  display: inline-block;
}
.message {
  text-align: center;
  color: #333333;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 5px;
}
.iframe-formpanel {
  height: calc(100vh - 48px - constant(safe-area-inset-bottom));
  height: calc(100vh - 48px - env(safe-area-inset-bottom));
}
</style>
