<template>
  <div>
    <van-nav-bar
      title="外出设置"
      left-text="返回"
      left-arrow
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-cell-group>
      <van-cell
        v-for="item in outSetting"
        :key="item.name"
        :title="item.name"
        @click="selectChange(item)"
      >
        <van-icon
          slot="right-icon"
          name="success"
          color="#4caf50"
          class="van-cell__right-icon"
          v-show="item.value == selectValue"
        ></van-icon>
      </van-cell>
    </van-cell-group>
    <div class="div-show" v-show="isOutChecked">外出时间段</div>
    <div v-show="isOutChecked">
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="startTime"
        label="开始时间"
        placeholder="请选择开始时间"
        @click="startShow = true"
      />
      <van-popup v-model="startShow" position="bottom">
        <van-datetime-picker
          type="datetime"
          @confirm="onStartConfirm"
          @cancel="startShow = false"
          :formatter="formatter"
          :min-date="minTime"
        />
      </van-popup>
      <!-- 结束时间 -->
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="endTime"
        label="结束时间"
        placeholder="请选择结束时间"
        @click="endShow = true"
      />
      <van-popup v-model="endShow" position="bottom">
        <van-datetime-picker
          type="datetime"
          @confirm="onEndConfirm"
          @cancel="endShow = false"
          :formatter="formatter"
          :min-date="minTime"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import myApi from "../../api/my.js";
import { useTimeFormatter } from "../../util/index.js";
export default {
  name: "outside",
  data() {
    return {
      isOutChecked: false,
      minTime: new Date(),
      maxTime: "",
      startTime: "",
      endTime: "",
      outSetting: [
        { name: "在公司", value: "InOffice" },
        { name: "外出中", value: "Out" },
        { name: "仅在以下时间段外出", value: "Period" },
      ],
      selectValue: "",
      startShow: false,
      endShow: false,
    };
  },
  created() {
    this.initOutSide();
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    selectChange(val) {
      this.selectValue = val.value;
      if (val.value === "Period") {
        this.isOutChecked = true;
      } else {
        this.isOutChecked = false;
        this.startTime = "";
        this.endTime = "";
      }
    },
    formatter(type, val) {
      let itemValue = val;
      switch (type) {
        case "year":
          itemValue = `${val}年`;
          break;
        case "month":
          itemValue = `${val}月`;
          break;
        case "day":
          itemValue = `${val}日`;
          break;
        case "hour":
          itemValue = `${val}时`;
          break;
        case "minute":
          itemValue = `${val}分`;
          break;
        default:
          break;
      }
      return itemValue;
    },
    onStartConfirm(val) {
      this.startTime = useTimeFormatter(val);
      this.startShow = false;
    },
    onEndConfirm(val) {
      this.endTime = useTimeFormatter(val);
      this.endShow = false;
    },
    onClickRight() {
      let $this = this;
      let type = 0;
      let value = $this.selectValue;
      if ($this.isOutChecked) {
        if ($this.startTime === "" || $this.endTime === "") {
          $this.$notify({ type: "warning", message: "开始时间或结束时间不能为空" });
          return;
        }
        type = 1;
      } else {
        this.startTime = "";
        this.endTime = "";
      }
      myApi
        .saveOutSetting(type, value, $this.startTime, $this.endTime)
        .then((result) => {
          if (result) {
            $this.$notify({ type: "success", message: "操作成功" });
          } else {
            $this.$notify({ type: "danger", message: "操作失败" });
          }
        })
        .catch((error) => {
          console.log("保存设置失败", error);
        });
    },
    initOutSide() {
      let $this = this;
      myApi
        .getOutSetting()
        .then((result) => {
          if (result !== null && result !== undefined) {
              let itemValue = result
              if (typeof result === 'string') {
                  itemValue = eval("(" + result + ")");
              }     
            const { state } = itemValue;
            const { DateFrom } = itemValue;
            const { DateTo } = itemValue;
             $this.selectValue = state
            if (state === "Period") {
              $this.selectValue = state;
              $this.isOutChecked = true;
              $this.startTime = useTimeFormatter(DateFrom);
              $this.endTime = useTimeFormatter(DateTo);
            } 
          }
        })
        .catch((error) => {
          console.log("获取外出设置失败", error);
        });
    },
  },
};
</script>

<style scoped>
.div-show {
  width: 100%;
  height: 45px;
  background: #dcdbdb;
  line-height: 45px;
  text-indent: 1em;
  font-weight: bold;
  font-size: 13px;
}
</style>
