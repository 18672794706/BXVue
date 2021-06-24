<template>
  <div class="start">
    <van-cell-group>
      <van-field
        :value="equipmentInfo.EquipmentSize"
        label="选择设备"
        placeholder="请选择"
        is-link
        clickable
        readonly
        required
        @click="equipsShow = true"
      />
      <van-field
        label="故障类型"
        placeholder="请选择"
        is-link
        clickable
        readonly
        required
        @click="openProblemsPopup"
      >
        <template #input>
          <div class="custom-box">
            <span v-show="problems.length === 0" class="text-placeholder">
              请选择
            </span>
            <div v-for="(item, index) in problems" :key="item.FailureType">
              <van-tag
                closeable
                size="large"
                type="warning"
                plain
                @close="deleteProblem(index)"
              >
                {{ item.FailureType }}
              </van-tag>
            </div>
          </div>
        </template>
      </van-field>
      <van-cell center title="是否紧急">
        <template #right-icon>
          <van-switch v-model="isUrgent" size="22" />
        </template>
      </van-cell>
      <van-field
        v-model="remark"
        label="备注"
        placeholder="请输入备注信息"
        type="textarea"
        autosize
      />
    </van-cell-group>
    <div class="block-btn-wrap">
      <van-button
        v-show="$route.query.qrcode === '1'"
        type="primary"
        block
        @click="scanQrCode()"
      >
        扫一扫
      </van-button>
      <van-button type="info" block @click="submit()"> 完成 </van-button>
    </div>

    <!-- 选择设备 -->
    <equips-popup
      v-model="equipsShow"
      :equipmentInfo="equipmentInfo"
      @confirm="getEquip"
    />
    <!-- 选择故障类型 -->
    <problems-popup
      v-model="problemsShow"
      v-if="problemsShow"
      :equipmentInfo="equipmentInfo"
      :problems="problems"
      @confirm="getProblems"
    />
  </div>
</template>

<script>
import { Pad_EquipmentScanCode, Pad_EquipmentPost } from "../../api/index";
export default {
  name: "Start",
  components: {
    "equips-popup": () => import("../../components/repair/EquipsPopup.vue"),
    "problems-popup": () => import("../../components/repair/ProblemsPopup.vue"),
  },
  data() {
    return {
      equipmentInfo: {},
      problems: [],
      isUrgent: false,
      remark: "",
      equipsShow: false,
      problemsShow: false,
    };
  },
  created() {
    if (this.$route.query.qrcode === "1") {
      this.scanQrCode();
    }
  },
  methods: {
    scanQrCode() {
      const _this = this;
      window.wx.scanQRCode({
        desc: "scanQRCode desc",
        needResult: 1, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是条形码（一维码），默认二者都有
        success: function (res) {
          _this.getDeviceInfo(res.resultStr);
        },
        error: function (res) {
          if (res.errMsg.indexOf("function_not_exist") > 0) {
            alert("版本过低请升级");
          }
        },
      });
    },
    // 扫码获取信息
    getDeviceInfo(code) {
      const params = {
        EquipmentNoDes: code,
      };
      Pad_EquipmentScanCode(params)
        .then((res) => {
          if (res.ReturnResult === "1") {
            this.equipmentInfo = res.ReturnData;
            this.equipsShow = true;
          } else {
            this.$notify(res.Message);
          }
        })
        .catch((err) => {
          this.$notify(err);
        });
    },
    // 打开故障类型弹窗
    openProblemsPopup() {
      if (this.equipmentInfo.EquipmentSize) {
        this.problemsShow = true;
      } else {
        this.$toast("请先选择设备");
      }
    },
    // 选择设备
    getEquip(data) {
      this.equipmentInfo = data;
    },
    // 选择问题
    getProblems(data) {
      this.problems = data;
    },
    // 删除问题
    deleteProblem(index) {
      this.problems.splice(index, 1);
    },
    submit() {
      if (JSON.stringify(this.equipmentInfo) === "{}") {
        this.$notify("请选择设备");
      } else if (this.problems.length === 0) {
        this.$notify("请选择故障类型");
      } else {
        const params = {
          EquipmentID: this.equipmentInfo.EquipmentNo,
          FaultType: this.problems,
          UrgentTask: this.isUrgent ? 1 : 0,
          Remarks: this.remark,
        };
        Pad_EquipmentPost(params)
          .then((res) => {
            if (res.ReturnResult === "1") {
              this.$dialog
                .alert({
                  message: res.Message,
                })
                .then(() => {
                  this.$router.go(-1);
                });
            } else {
              this.$notify(res.Message);
            }
          })
          .catch((err) => {
            this.$notify(err);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-box {
  .van-tag {
    margin-right: 8px;
    margin-bottom: 5px;
  }
}
</style>
