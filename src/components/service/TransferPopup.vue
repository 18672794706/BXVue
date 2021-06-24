<template>
  <div>
    <van-popup
      class="transfer-popup task-handle-popup"
      v-bind="$attrs"
      position="right"
      :style="{ width: '100%', height: '100%' }"
      v-on="$listeners"
      get-container="body"
    >
      <van-nav-bar
        class="gm-nav-bar"
        left-text="转交任务"
        left-arrow
        @click-left="$emit('input', false)"
      />
      <van-cell-group class="handle-cont">
        <van-field v-model="activeData.Number" label="报修编号" readonly />
        <van-field v-model="activeData.OrderDescription" label="报修设备" readonly />
        <van-field v-model="activeData.FailureType" label="故障类型" readonly />
        <van-field
          v-model="selection.MaintainName"
          label="被转交人"
          placeholder="请选择"
          is-link
          clickable
          readonly
          @click="selectionPopupShow = true"
        />
        <van-field
          v-model="remark"
          label="备注"
          type="textarea"
          autosize
          placeholder="请输入备注信息"
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
    <transfer-selection-popup
      v-model="selectionPopupShow"
      :active-data="activeData"
      @confirm="changeSelection"
    />
  </div>
</template>

<script>
export default {
  name: "TransferPopup",
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
    "transfer-selection-popup": () => import("./TransferSelectionPopup.vue"),
  },
  data() {
    return {
      selection: {},
      remark:"",
      selectionPopupShow: false,
    };
  },
  methods: {
    handleCancel() {
      this.$emit("input", false);
    },
    handleConfirm() {
      this.$emit("input", true);
    },
    changeSelection(data) {
      this.selection = data;
      this.selectionPopupShow = false;
    },
  },
};
</script>
