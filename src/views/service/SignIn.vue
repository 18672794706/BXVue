<template>
  <div class="sign-in">
    <van-cell-group>
      <van-field
        :value="equipmentInfo.EquipmentName"
        label="报修设备"
        placeholder="无"
        readonly
      />
      <van-field
        :value="equipmentInfo.FaultType"
        label="故障类型"
        placeholder="无"
        readonly
      />
      <van-cell center title="是否紧急">
        <template #right-icon>
          <van-tag v-show="equipmentInfo.UrgentTask" type="danger"
            >紧急</van-tag
          >
        </template>
      </van-cell>
      <van-field
        :value="equipmentInfo.Remarks"
        label="备注"
        placeholder="请输入备注信息"
        type="textarea"
        autosize
        readonly
      />
    </van-cell-group>
    <div class="block-btn-wrap">
      <van-button type="primary" block @click="scanQrCode()">
        扫一扫
      </van-button>
      <van-button type="info" block @click="submit"> 签到 </van-button>
    </div>
  </div>
</template>

<script>
import { Pad_EquipmentGetInfo, Pad_ScanCodeSignIn } from "../../api/index";
export default {
  name: "SignIn",
  data() {
    return {
      equipmentInfo: {
        // Id: 1,
        // Number: "202106170024",
        // PresentationTime: "2021-06-17T16:17:45.393",
        // RepairAccount: "kweitan",
        // RepairDisplayName: "谈嘉巍",
        // MaintainWorkType: "箱体部",
        // MaintainWorkName: "加工中心",
        // EquipmentLine: "U1",
        // EquipmentID: 224,
        // EquipmentName: "加工中心",
        // Remarks: "123",
        // RepairStatus: "响应中",
        // ResponsiceTime: 30,
        // MaintainTime: 30,
        // ActualResponsiceAccount: null,
        // ActualResponsiceTime: null,
        // ActualMaintenanceAccount: "zhuqing",
        // ActualMaintenanceTime: null,
        // ActualAssistanceAccount: null,
        // ActualAssistanceTaskId: null,
        // FaultType: "机械传动故障,液压系统故障",
        // UrgentTask: 0,
        // LeaderAccount: "kweitan",
        // IsFlowEquipment: null,
        // EquipmentNoDes: "010-1102",
      },
    };
  },
  created() {
    this.scanQrCode();
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
      Pad_EquipmentGetInfo(params)
        .then((res) => {
          if (res.ReturnResult === "1") {
            this.equipmentInfo = res.ReturnData;
          } else {
            this.$notify(res.Message);
          }
        })
        .catch((err) => {
          this.$notify(err);
        });
    },
    submit() {
      const params = {
        RepairId: this.equipmentInfo.Id,
      };
      Pad_ScanCodeSignIn(params)
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
    },
  },
};
</script>
