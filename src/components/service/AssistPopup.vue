<template>
  <div>
    <van-popup
      class="assist-popup task-handle-popup"
      v-bind="$attrs"
      position="right"
      :style="{ width: '100%', height: '100%' }"
      v-on="$listeners"
      get-container="body"
    >
      <van-nav-bar
        class="gm-nav-bar"
        left-text="维修协助"
        left-arrow
        @click-left="$emit('input', false)"
      />
      <van-cell-group class="handle-cont">
        <van-field v-model="repairNumber" label="报修编号" readonly />
        <van-field v-model="repairEquip" label="报修设备" readonly />
        <van-field v-model="repairProblem" label="故障类型" readonly />
        <van-field label="发送至负责人">
          <template #input>
            <van-radio-group v-model="sendToLeader" direction="horizontal">
              <van-radio :name="1"> 是 </van-radio>
              <van-radio :name="0"> 否 </van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-model="selection"
          label="协助人员"
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
    <assist-selection-popup
      v-model="selectionPopupShow"
      @changeSelection="changeSelection"
    />
  </div>
</template>

<script>
export default {
  name: "AssistPopup",
  inheritAttrs: false,
  components: {
    "assist-selection-popup": () => import("./AssistSelectionPopup.vue"),
    "van-radio": () => import("@/components/common/GmRadio.vue"),
  },
  data() {
    return {
      keywords: "",
      repairNumber: "00000123456",
      repairEquip: "箱体部/加工中心/东五/南二蜗杆磨齿机",
      repairProblem: "轨油漏油、主轴丝杆套坏",
      sendToLeader: 0,
      selection: "",
      selectionPopupShow: false,
    };
  },
  methods: {
    handleCancel() {
      this.$emit("input", false);
    },
    handleConfirm() {
      this.$emit("input", false);
    },
    changeSelection(data) {
      this.selection = data;
    },
  },
};
</script>
