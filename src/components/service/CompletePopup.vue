<template>
  <div>
    <van-popup
      class="complete-popup task-handle-popup"
      v-bind="$attrs"
      position="right"
      :style="{ width: '100%', height: '100%' }"
      v-on="$listeners"
      get-container="body"
    >
      <van-nav-bar
        class="gm-nav-bar"
        left-text="确认订单"
        left-arrow
        @click-left="$emit('input', false)"
      />
      <van-cell-group class="handle-cont">
        <van-field v-model="repairNumber" label="报修编号" readonly />
        <van-field v-model="repairEquip" label="报修设备" readonly />
        <van-field
          :value="problems.join('、')"
          label="故障类型"
          placeholder="无"
          readonly
        />
        <van-field label="邀请厂家协助">
          <template #input>
            <van-switch v-model="isAskForManufacturers" size="22" />
          </template>
        </van-field>
        <van-field label="采购协助">
          <template #input>
            <van-switch v-model="isAskForShopping" size="22" />
          </template>
        </van-field>
        <van-field
          v-model="remark"
          label="备注信息"
          type="textarea"
          autosize
          placeholder="请输入备注信息"
        />
        <van-radio-group v-model="riskTreatment" v-if="!isAskForManufacturers">
          <van-cell-group>
            <van-field label="选择对策" is-link @click="riskTreatment = '1'">
              <template #input>
                <div class="cell-radio-box">
                  <van-radio name="1">临时对策</van-radio>
                  <div
                    class="input-wrap"
                    v-show="riskTreatment === '1'"
                    @click.stop="timePickerShow = true"
                  >
                    <input
                      v-model="permanentDecisionTime"
                      type="text"
                      placeholder="请选择永久对策时间"
                      readonly
                    />
                  </div>
                </div>
              </template>
            </van-field>
            <van-field label=" " @click="riskTreatment = '2'">
              <template #input>
                <van-radio name="2">永久对策</van-radio>
              </template>
            </van-field>
          </van-cell-group>
        </van-radio-group>
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
    <van-popup v-model="timePickerShow" position="bottom" round>
      <van-datetime-picker
        v-model="timePickerTime"
        type="date"
        title="选择永久决策时间"
        :min-date="minDate"
        @confirm="timeConfirm"
        @cancel="timePickerShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { parseTime } from "../../utils/index";
export default {
  name: "CompletePopup",
  inheritAttrs: false,
  components: {
    "van-radio": () => import("@/components/common/GmRadio.vue"),
  },
  data() {
    return {
      repairNumber: "00000123456",
      repairEquip: "箱体部/加工中心/东五/南二蜗杆磨齿机",
      problems: ["轨油漏油", "主轴丝杆套坏"],
      isAskForManufacturers: false,
      isAskForShopping: false,
      remark: "",
      riskTreatment: "",
      permanentDecisionTime: "",
      timePickerShow: false,
      timePickerTime: "",
      minDate: new Date(),
    };
  },
  methods: {
    handleCancel() {
      this.$emit("input", false);
    },
    handleConfirm() {
      this.$emit("input", false);
    },
    timeConfirm() {
      this.timePickerShow = false;
      this.permanentDecisionTime = parseTime(
        this.timePickerTime,
        "{y}-{m}-{d}"
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.cell-radio-box {
  display: flex;

  .van-radio {
    width: 90px;
  }

  .input-wrap {
    flex: 1;

    input {
      width: 100%;
      height: 22px;
      line-height: 22px;
      border: none;
      background: transparent;
      text-align: right;
      color: #777;

      &::-webkit-input-placeholder {
        color: #bbbbbb;
      }

      &::-moz-placeholder {
        color: #bbbbbb;
      }
    }
  }
}
</style>
