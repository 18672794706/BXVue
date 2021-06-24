<template>
  <div>
    <van-popup
      class="allocate-popup task-handle-popup"
      v-bind="$attrs"
      position="right"
      :style="{ width: '100%', height: '100%' }"
      v-on="$listeners"
      get-container="body"
    >
      <van-nav-bar
        class="gm-nav-bar"
        left-text="分配人员"
        left-arrow
        @click-left="$emit('input', false)"
      />
      <van-cell-group class="handle-cont">
        <van-field :value="activeData.Number" label="报修编号" readonly />
        <van-field
          :value="activeData.EquipmentName"
          label="报修设备"
          readonly
        />
        <van-field
          :value="selection.MaintainName"
          label="维修人员"
          placeholder="请选择"
          is-link
          clickable
          readonly
          @click="selectionPopupShow = true"
        />
        <van-cell />
      </van-cell-group>
      <van-row class="handle-footer" gutter="20">
        <van-col span="12">
          <van-button type="default" block @click="handleCancel">
            取消
          </van-button>
        </van-col>
        <van-col span="12">
          <van-button type="info" block @click="handleConfirm">
            确定
          </van-button>
        </van-col>
      </van-row>
    </van-popup>
    <allocate-selection-popup
      v-model="selectionPopupShow"
      :active-data="activeData"
      @confirm="changeSelection"
    />
  </div>
</template>

<script>
import { Pad_Repair_AssignmentTask } from "../../api/index";
export default {
  name: "AllocatePopup",
  inheritAttrs: false,
  props: {
    activeData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    "allocate-selection-popup": () => import("./AllocateSelectionPopup.vue"),
  },
  data() {
    return {
      selection: {},
      selectionPopupShow: false,
    };
  },
  methods: {
    handleCancel() {
      this.$emit("input", false);
    },
    handleConfirm() {
      const params = {
        TaskId: this.activeData.TaskID,
        TaskAccount: this.selection.MaintainAccount,
      };
      Pad_Repair_AssignmentTask(params)
        .then((res) => {
          if (res.ReturnResult === "1") {
            this.$dialog
              .alert({
                message: res.Message,
              })
              .then(() => {
                this.$emit("input", false);
                this.$emit("confirm");
              });
          } else {
            this.$notify(res.Message);
          }
        })
        .catch((err) => {
          this.$notify(err);
        });
    },
    changeSelection(data) {
      this.selection = data;
      this.selectionPopupShow = false;
    },
  },
};
</script>
