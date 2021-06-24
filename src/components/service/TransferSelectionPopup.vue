<template>
  <van-popup
    class="transfer-selection-popup task-selection-popup"
    v-bind="$attrs"
    position="bottom"
    v-on="$listeners"
    get-container="body"
  >
    <div class="van-picker__toolbar van-hairline--bottom">
      <button type="button" class="van-picker__cancel" @click="handleCancel">
        取消
      </button>
      <div class="van-ellipsis van-picker__title">选择被转交人</div>
      <button type="button" class="van-picker__confirm" @click="handleConfirm">
        确认
      </button>
    </div>
    <div class="desc-tool">
      <span class="desc-tool-item">
        <van-badge dot color="#15BC83" />开工
      </span>
      <span class="desc-tool-item">
        <van-badge dot color="#999999" />未开工
      </span>
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
          <template #icon>
            <div class="van-cell__left-icon">
              <van-badge v-show="item.onLine" dot color="#15BC83" />
              <van-badge v-show="!item.onLine" dot color="#999999" />
            </div>
          </template>
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
import { Pad_Repair_GetAllRepairMember } from "../../api/index";
export default {
  name: "TransferSelectionPopup",
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
      list: [],
      result: {},
    };
  },
  methods: {
    getData() {
      this.result = "";
      const params = {
        RepairId: this.activeData.Id,
      };
      Pad_Repair_GetAllRepairMember(params)
        .then((res) => {
          if (res.ReturnResult === "1") {
            this.list = res.ReturnData.ReturnData;
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
      this.$emit("input", false);
    },
    toggle(item) {
      this.result = item;
      //点击直接选中   1231
      // this.$emit("confirm", this.result);
      // this.$emit("input", false);
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
