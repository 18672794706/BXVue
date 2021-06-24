<template>
  <van-popup
    class="equips-popup"
    v-bind="$attrs"
    position="bottom"
    :style="{ height: 'calc(100% - 54px)' }"
    v-on="$listeners"
  >
    <div class="van-picker__toolbar van-hairline--bottom">
      <button type="button" class="van-picker__cancel" @click="handleCancel">
        取消
      </button>
      <div class="van-ellipsis van-picker__title">选择设备</div>
      <button type="button" class="van-picker__confirm" @click="handleConfirm">
        确认
      </button>
    </div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="departVal" :options="departOptions" />
      <van-dropdown-item
        v-model="plantVal"
        :options="plantOptions"
        :disabled="!departVal"
      />
    </van-dropdown-menu>
    <van-tree-select
      :items="treeData"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
      @click-item="handleSelectData"
    />
  </van-popup>
</template>

<script>
import {
  Pad_EquipmentGetWorkType,
  Pad_EquipmentGetWorkName,
  Pad_EquipmentGetFailures,
} from "../../api/index";
import { deepClone } from "../../utils";

export default {
  name: "EquipsPopup",
  props: {
    // 设备信息
    equipmentInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  inheritAttrs: false,
  data() {
    return {
      departVal: "",
      departOptions: [{ text: "部门", value: "" }],
      plantVal: "",
      plantOptions: [{ text: "车间", value: "" }],
      treeData: [
        // {
        //   text: "东一",
        //   children: [
        //     { id: 1, text: "MA-500HB-R" },
        //     { id: "2", text: "FBM-11025" },
        //     { id: 3, text: "TH6380" },
        //     { id: 4, text: "HCN-5000" },
        //     { id: 5, text: "FBM-11025R" },
        //     { id: 6, text: "MA-800HB-R" },
        //   ],
        // },
        // { text: "东二", children: [{ id: 7, text: "东二" }] },
      ],
      activeId: null,
      activeIndex: 0,
      activeData: {},
    };
  },
  watch: {
    equipmentInfo: {
      handler(val) {
        if (val.EquipmentNo !== this.activeId) {
          this.departVal = val.MaintainWorkType;
          this.plantVal = val.MaintainWorkName;
          this.activeId = val.EquipmentNo;
          this.ChangeActiveIndex();
          this.activeData = deepClone(val);
        }
      },
      deep: true,
    },
    departVal() {
      this.getPlant();
    },
    plantVal() {
      this.getFailures();
    },
  },
  mounted() {
    this.getDepart();
  },
  methods: {
    // 获取部门
    getDepart() {
      Pad_EquipmentGetWorkType()
        .then((res) => {
          if (res.ReturnResult === "1") {
            this.departOptions = res.ReturnData.map((val, index) => {
              if (index === 0) {
                this.departVal = val.MaintainWorkType;
              }
              return {
                text: val.MaintainWorkType,
                value: val.MaintainWorkType,
              };
            });
          } else {
            this.$notify(res.Message);
          }
        })
        .catch((err) => {
          this.$notify(err);
        });
    },

    // 获取车间
    getPlant() {
      const params = { MaintainWorkType: this.departVal };
      Pad_EquipmentGetWorkName(params)
        .then((res) => {
          if (res.ReturnResult === "1") {
            this.plantOptions = res.ReturnData.map((val, index) => {
              if (index === 0) {
                this.plantVal = val.MaintainWorkName;
              }
              return {
                text: val.MaintainWorkName,
                value: val.MaintainWorkName,
              };
            });
          } else {
            this.$notify(res.Message);
          }
        })
        .catch((err) => {
          this.$notify(err);
        });
    },

    // 获取设备
    getFailures() {
      const params = {
        MaintainWorkType: this.departVal,
        MaintainWorkName: this.plantVal,
      };
      Pad_EquipmentGetFailures(params)
        .then((res) => {
          if (res.ReturnResult === "1") {
            this.treeData = res.ReturnData.map((val) => {
              val.children.forEach((item) => {
                item.id = item.EquipmentNo;
                item.text = item.EquipmentSize;
              });
              return val;
            });
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
      this.$emit("confirm", this.activeData);
      this.$emit("input", false);
    },

    handleSelectData(data) {
      this.activeData = data;
    },

    ChangeActiveIndex() {},
  },
};
</script>

<style lang="scss" scoped>
.equips-popup {
  display: flex;
  flex-direction: column;
  .van-tree-select {
    flex: 1;
  }
}
</style>
<style lang="scss">
.equips-popup {
  .van-dropdown-menu__bar {
    height: 43px;
    border-bottom: 1px solid #dcdee0;
  }

  .van-tree-select__nav {
    background-color: #f1f5fa;
  }
  .van-sidebar-item--select::before {
    width: 2px;
    height: 100%;
    background-color: #1364e1;
  }
  .van-sidebar-item--select,
  .van-sidebar-item--select:active {
    color: #1364e1;
  }
  .van-tree-select__item--active {
    color: #1364e1;
  }
}
</style>