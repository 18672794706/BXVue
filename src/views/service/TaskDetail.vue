<template>
  <div class="task-detail">
    <van-cell-group class="step-all">
      <van-steps :active="active" inactive-color="#999" active-color="#1364E1">
        <van-step v-for="item in stepData" :key="item.text">
          {{ item.text }}
          <template #inactive-icon>
            <van-icon :class="`iconfont ${item.icon}`" color="#999" size="20" />
          </template>
          <template #active-icon>
            <van-icon
              :class="`iconfont ${item.icon}`"
              color="#fff"
              style="background: #1364e1"
            />
          </template>
          <template #finish-icon>
            <van-icon
              :class="`iconfont ${item.icon}`"
              color="#1364E1"
              size="20"
            />
          </template>
        </van-step>
      </van-steps>
    </van-cell-group>

    <van-cell-group class="info-cell">
      <van-cell>
        <template #icon>
          <van-icon class="iconfont iconicon5 van-cell__left-icon" />
        </template>
        <template #title>
          <div class="info-text">
            订单状态：<span
              class="success"
              :style="{
                color: info.RepairStatus === '已完成' ? '#07AD34' : '#999',
              }"
              >{{ info.RepairStatus || "未知" }}</span
            >
          </div>
          <div class="info-text">订单编号：{{ info.Number || "未知" }}</div>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="info-cell">
      <van-cell>
        <template #icon>
          <van-icon class="iconfont iconPath van-cell__left-icon" />
        </template>
        <template #title>
          <div class="info-text">
            <span class="fix-label">维修人</span>：{{
              info.RepairPersonnelName || "无"
            }}
          </div>
          <!-- <div class="info-text">
            <span class="fix-label">组别</span>：维修三组
          </div> -->
          <div class="info-text">
            <span class="fix-label">手机</span>：{{ info.RepairPhone || "无" }}
          </div>
          <div class="cell-footer">
            <van-button
              v-show="Button['维修报告书']"
              plain
              type="info"
              size="small"
              @click="goReport(Button['维修报告书'])"
            >
              维修报告书
            </van-button>
            <van-button
              v-show="Button['资料查询']"
              plain
              type="info"
              size="small"
              @click="toRepFile"
            >
              资料查询
            </van-button>
            <van-button
              v-show="Button['维修履历']"
              plain
              type="info"
              size="small"
              @click="toRepRecord"
            >
              维修履历
            </van-button>
          </div>
        </template>
      </van-cell>
      <van-cell class="status-find-cell">
        <div class="info-title">状态跟踪</div>
        <van-empty v-show="TaskInfo.length === 0" description="暂无数据" />
        <van-steps
          direction="vertical"
          :active="TaskInfo.length - 1"
          inactive-color="#999"
          active-color="#1364E1"
          active-icon="passed"
          finish-icon="passed"
        >
          <van-step
            v-for="(item, index) in TaskInfo"
            :key="item.id"
            v-show="showMoreStep(index)"
          >
            <template #active-icon>
              <span v-html="getIcon(item)"></span>
            </template>
            <template #inactive-icon>
              <span v-html="getIcon(item)"></span>
            </template>
            <template #finish-icon>
              <span v-html="getIcon(item)"></span>
            </template>
            <div class="step-title">
              <h3>{{ item.Step }}</h3>
              <span class="time">{{ item.DateTime }}</span>
            </div>
            <p class="step-cont">{{ item.Remarks }}</p>
          </van-step>
        </van-steps>
        <div
          class="showMore"
          v-show="TaskInfo.length > 2"
          @click="findStepShowAll = !findStepShowAll"
        >
          <div v-show="!findStepShowAll">
            点击查看更多<van-icon name="arrow-down" />
          </div>
          <div v-show="findStepShowAll">收起<van-icon name="arrow-up" /></div>
        </div>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
      <div class="gm-list-card">
        <van-cell class="gm-list-card-header">
          <template #title>
            <van-icon
              class="iconfont iconxinxi van-cell__left-icon"
              color="#1364e1"
            />
            报修信息
          </template>
          <div v-show="info.RepairStatus">
            <span>{{ info.RepairStatus }}</span>
            <div class="status-text success" v-show="!info.ResponseTimeout">
              <van-icon name="passed" /> 响应正常
            </div>
            <div class="status-text danger" v-show="info.ResponseTimeout">
              <i class="iconfont iconicon-zhiliuchaoshi1"></i> 响应超时
            </div>
            <div class="status-text success" v-show="!info.MaintenanceTimeout">
              <van-icon name="passed" /> 维修正常
            </div>
            <div class="status-text danger" v-show="info.MaintenanceTimeout">
              <i class="iconfont iconicon-zhiliuchaoshi1"></i> 维修超时
            </div>
          </div>
        </van-cell>
        <van-cell>
          <van-cell
            class="text-cell"
            title="报修设备"
            :value="info.EquipmentName"
          />
          <van-cell
            class="text-cell"
            title="故障类型"
            type="textarea"
            autosize
            :value="info.FailureType"
          />
          <van-cell
            class="text-cell"
            title="维修人员"
            :value="`${info.RepairPersonnelName || '无'}
            ${info.RepairPersonnelPhone || ''}`"
          />
          <van-cell
            class="text-cell"
            title="协助人员"
            :value="`${info.AssistantsName || '无'}
            ${info.AssistantsPhone || ''}`"
          />
          <van-cell
            class="text-cell"
            title="转发人员"
            :value="`${info.HandoverName || '无'}
            ${info.HandoverPhone || ''}`"
          />
        </van-cell>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import { Pad_Repair_GetRepairInfo } from "../../api/index";
export default {
  name: "TaskDetail",
  data() {
    return {
      id: "",
      findStepShowAll: false,
      stepData: [
        {
          text: "提交报修",
          icon: "icontijiaobaogao",
        },
        {
          text: "维修分配",
          icon: "iconfenpei",
        },
        {
          text: "开始维修",
          icon: "iconweixiu",
        },
        {
          text: "完成维修",
          icon: "iconwancheng",
        },
      ],
      info: {},
      StepInfo: [],
      TaskInfo: [],
      Button: {},
    };
  },
  computed: {
    active() {
      return this.StepInfo.length - 1;
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getData();
  },
  methods: {
    getData() {
      const params = {
        RepairId: this.id,
      };
      Pad_Repair_GetRepairInfo(params)
        .then((res) => {
          if (res.ReturnResult === "1") {
            this.Button = res.ReturnData.Button;
            this.StepInfo = res.ReturnData.Task.StepInfo;
            this.TaskInfo = res.ReturnData.Task.TaskInfo;
            this.info = res.ReturnData.info;
          } else {
            this.$notify(res.Message);
          }
        })
        .catch((err) => {
          this.$notify(err);
        });
    },
    getIcon(item) {
      if (item.isFinish) {
        return '<i class="van-icon van-icon-passed van-step__icon"></i>';
      } else if (item.ShowType === "1") {
        return '<i class="van-icon van-icon-passed van-step__icon"></i>';
      } else if (item.ShowType === "2") {
        return '<i class="van-icon van-icon-passed van-step__icon"></i>';
      }
    },
    // 查看更多
    showMoreStep(index) {
      if (index < 2) {
        return true;
      } else if (this.findStepShowAll) {
        return true;
      } else {
        return false;
      }
    },
    // 维修报告书
    goReport(data) {
      window.location.href = data.URL;
    },
    // 资料查询
    toRepFile() {
      this.$router.push(`/rep-file/${this.id}`);
    },
    // 维修履历
    toRepRecord() {
      this.$router.push(`/rep-record/${this.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.task-detail {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: #f4f6f9;

  .van-cell-group {
    margin-bottom: 10px;
  }

  .step-all {
    padding: 15px 15px 5px;
    background-color: #fff;
  }

  .van-button--small {
    height: 28px;
    line-height: 28px;
    border-radius: 4px;
  }

  .van-button + .van-button {
    margin-left: 10px;
  }

  .cell-footer {
    text-align: right;
  }

  .info-cell {
    .van-cell__left-icon {
      font-size: 20px;
      margin-right: 16px;
      color: #1364e1;
    }
  }

  .info-text {
    color: #666666;
    margin-bottom: 5px;
    font-size: 13px;

    .success {
      color: #07ad34;
    }
    .danger {
      color: red;
    }

    .fix-label {
      width: 45px;
      display: inline-block;
      text-align: justify;
      text-justify: distribute-all-lines;
      text-align-last: justify;
    }
  }

  .info-title {
    font-size: 15px;
    color: #333;
    margin-bottom: 10px;
  }

  .status-find-cell {
    .step-title {
      margin-bottom: 5px;
      h3 {
        color: #333333;
        display: inline-block;
        margin-right: 15px;
        font-size: 15px;
        font-weight: bold;
      }
      .time {
        color: #aaa;
        font-size: 13px;
      }
    }

    .step-cont {
      color: #666666;
      margin-bottom: 5px;
    }
  }

  .showMore {
    padding-top: 18px;
    margin-top: -10px;
    text-align: center;
    background-color: #fff;
    color: #999999;
    font-size: 13px;
    z-index: 1;
    position: relative;
  }
}
</style>
<style lang="scss">
.task-detail {
  .step-all {
    .van-steps {
      padding-left: 0;
      padding-right: 0;
    }
    .van-steps__items {
      padding-bottom: 0;
      padding-top: 32px;

      .van-step__circle-container {
        top: auto;
        bottom: 12px;
        left: -17px;

        .iconfont {
          width: 28px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border-radius: 50%;
          background-color: transparent;
          font-size: 14px;
        }
      }

      .van-step__line {
        top: auto;
        bottom: 40px;
        left: 18px;
      }

      .van-step:first-child {
        .van-step__title {
          margin-left: 0;
        }
        .van-step__circle-container {
          left: 0;
          padding-left: 0;
        }
      }

      .van-step:last-child {
        .van-step__circle-container {
          left: auto;
          right: -1px;
          padding-right: 0;
        }
      }
    }
  }

  .status-find-cell {
    .van-step__icon--active,
    .van-step__icon--finish,
    .van-step__title--active,
    .van-step__title--finish {
      color: #1364e1;
    }

    .van-step__icon {
      font-size: 16px;
      background-color: #fff;
    }
  }
}
</style>