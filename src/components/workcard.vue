<template>
  <div>
    <van-row class="vant-row-layout" @click="toform(objData)">
      <van-col span="4">
        <div class="icon-div" :style="{ background: objData.Color }">
          {{ objData.ShortName }}
        </div>
      </van-col>
      <van-col span="15" class="process-cell">
        <p class="process-title">
          {{ objData.ProcessName }}
        </p>
        <p class="process-departmemt">{{ objData.OwnerDisplayName }}/{{objData.OwnerAccount}}</p>
        <p class="process-departmemt" v-html="objData.Description"></p>
      </van-col>
      <van-col span="5" v-if="(typeName === 'dsp' || typeName === 'gxc')">
        <div class="icon-status">
          <span class="process-center">{{ objData.CreateAt | formatterTime }}</span>
        </div>
      </van-col>
      <van-col span="5" v-if="(typeName === 'ysp' || typeName === 'wdsq')">
        <div class="icon-status" v-if="objData.State.State === 'approved'">
          <p class="p-icon"><van-icon name="passed" /></p>
          <span>已审批</span>
          <span class="process-center">{{ objData.CreateAt | formatterTime }}</span>
        </div>
        <div class="icon-status" v-else-if="objData.State.State === 'running'">
          <p class="p-icon-active"><van-icon name="clock-o" /></p>
          <span>进行中</span>
          <span class="process-center">{{ objData.CreateAt | formatterTime }}</span>
        </div>
        <div class="icon-status" v-else-if="objData.State.State === 'rejected'">
          <p class="p-icon-close"><van-icon name="close" /></p>
          <span>已拒绝</span>
          <span class="process-center">{{ objData.CreateAt | formatterTime }}</span>
        </div>
        <div class="icon-status" v-else-if="objData.State.State === 'aborted'">
          <p class="p-icon-aborted"><van-icon name="warning-o" /></p>
          <span>已撤销</span>
          <span class="process-center">{{ objData.CreateAt | formatterTime }}</span>
        </div>
        <div class="icon-status" v-else>
          <p class="p-icon-close"><van-icon name="close" /></p>
          <span>未知</span>
          <span class="process-center">{{ objData.CreateAt | formatterTime }}</span>
        </div>
      </van-col>
    </van-row>
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
import { useChangetime } from "../util/index.js";
export default {
  name: "work-card",
  props: ["objData", "typeName"],
  data() {
    return {
      modelContainer: "#app",
      ProcessPop: false,
      processNamePop: "",
      formUrl: "",
      needRead: false,
      timeId: null,
    };
  },
  methods: {
    toform(val) {
      if (val !== null) {
        this.ProcessPop = true;
        this.processNamePop = val.ProcessName;
        let url = `${window.config.host}/Process.aspx?pid=${val.StepID}&tid=${val.TaskID}`;
        if (val.StepID === null || val.StepID === undefined) {
          url = `${window.config.host}/Read.aspx?tid=${val.TaskID}`;
        }
        this.formUrl = url;
      }
    },
    handleMessage() {
      let $this = this;
      $this.ProcessPop = false;
    },
  },
  mounted() {
    let $this = this;
    window.addEventListener("message", function (e) {
      var i = 0;
      if (e.data.cmd !== undefined && e.data.cmd === "yzback") {
        if (i == 0) {
          $this.handleMessage();
          $this.$emit("closeReload", $this.typeName);
        }
        i++;
      }
    });
  },
  filters: {
    formatterTime(val) {
      return useChangetime(val);
    },
  },
};
</script>
<style></style>
<style scoped>
.icon-div {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 20px;
  color: #ffffff;
  text-align: center;
  line-height: 50px;
  margin: 10px auto;
}

.card-main {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #ffffff;
  border-bottom: 1px solid #f3f3f3;
  margin-bottom: 5px;
  padding-top: 10px;
}
.user-div {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  line-height: 50px;
  float: left;
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
  text-align: center;
  color: #ffffff;
}
.user-div img {
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin-top: 5px;
}
.text-center {
  width: 55%;
  height: 55px;
  float: left;
  margin-top: 5px;
  text-indent: 1em;
  font-size: 14px;
  color: #333;
}
.text-right {
  height: 55px;
  margin-top: 5px;
  font-size: 12px;
  color: #797979;
}
.text-center p {
  margin: 0px;
  padding: 0px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.text-center span {
  color: #989494;
  text-indent: 1em;

  display: block;
}
.iframe-formpanel {
  height: calc(100vh - 48px - constant(safe-area-inset-bottom));
  height: calc(100vh - 48px - env(safe-area-inset-bottom));
}
.process-title {
  font-size: 14px;
  line-height: 15px;
}

.process-cell {
  padding: 10px;
  margin-top: 5px;
}
.process-ower {
  color: #969799 !important;
  font-size: 12px !important;
  line-height: 18px !important;
}
.process-departmemt {
  color: #969799;
  font-size: 12px;
  line-height: 22px;
}
.icon-status span {
  font-size: 13px;
}
.process-center {
  font-size: 12px !important;
  display: block;
  color:#9c9a9a  !important;
  
}
.icon-status {
  margin: 10px;
  text-align: center;
}
.p-icon {
  font-size: 20px;
  color: #76dbb4;
  margin: 0px;
  padding: 0px;
  line-height: 20px;
}
.p-icon-active {
  font-size: 20px;
  color: #79b4de;
  margin: 0px;
  padding: 0px;
  line-height: 20px;
}
.p-icon-close {
  font-size: 20px;
  color: #d42121;
  margin: 0px;
  padding: 0px;
  line-height: 20px;
}
.p-icon-aborted{
  font-size: 20px;
  color: #979797;
  margin: 0px;
  padding: 0px;
  line-height: 20px;
}
.vant-row-layout {
  margin-bottom: 6px;
  background: #fff;
}
</style>
