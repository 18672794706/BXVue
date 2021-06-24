<template>
  <van-popup
    class="allocate-selection-popup task-selection-popup"
    v-bind="$attrs"
    position="bottom"
    v-on="$listeners"
    get-container="body"
  >
    <div class="van-picker__toolbar van-hairline--bottom">
      <button type="button" class="van-picker__cancel" @click="handleCancel">
        取消
      </button>
      <div class="van-ellipsis van-picker__title">维修人员</div>
      <button type="button" class="van-picker__confirm" @click="handleConfirm">
        确认
      </button>
    </div>
    <div class="pick-list">
      <van-cell-group>
        <van-cell
          :class="{
            'select-cell': result.MaintainAccount === item.MaintainAccount,
          }"
          v-for="item in list"
          clickable
          :key="item.MaintainAccount"
          :title="item.MaintainName"
          @click="toggle(item)"
        >
          <template #right-icon>
            <div class="right-area" @click="handleShowMsg(item)">
              {{ item.ISKX ? "空闲" : "忙碌" }}
              <van-icon
                class="van-cell__right-icon"
                v-show="!item.ISKX"
                name="info"
                color="#999"
              />
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </van-popup>
</template>

<script>
import { Pad_Repair_GetSubordinateUser } from "../../api/index";
export default {
  name: "AllocateSelectionPopup",
  inheritAttrs: false,
  props: {
    activeData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    activeData: {
      handler(val, oldVal) {
        if (val.Id !== oldVal.Id) {
          this.getData();
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      list: [
        // {
        //   MaintainAccount: "zhuqing",
        //   MaintainName: "朱青",
        //   ISKX: 0,
        //   BeBusys: [
        //     {
        //       MaintainWorkType: "箱体部",
        //       MaintainWorkName: "加工中心",
        //       EquipmentLine: "",
        //       FaultType: ["机械传动故障"],
        //     },
        //   ],
        // },
      ],
      result: {},
    };
  },
  methods: {
    getData() {
      debugger;
      this.result = "";
      const params = {
        RepairId: this.activeData.Id,
      };
      Pad_Repair_GetSubordinateUser(params)
        .then((res) => {
          if (res.ReturnResult === "1") {
            this.list = res.ReturnData;
          } else {
            this.$notify(res.Message);
          }
        })
        .catch((err) => {
          this.$notify(err);
        });
    },
    handleCancel() {
      this.$emit("input", false);
    },
    handleConfirm() {
      this.$emit("confirm", this.result);
    },
    toggle(item) {
      this.result = item;
    },
    handleShowMsg(item) {
      let msg = "";
      msg = item.BeBusys.map((val) => {
        return `【${val.MaintainWorkType}/${val.MaintainWorkName}/${
          val.EquipmentLine
        }】 ${val.FaultType.join("、")}`;
      }).join("\n");
      this.$toast({
        message: msg,
      });
    },
  },
};
</script>