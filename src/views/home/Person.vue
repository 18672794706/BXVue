<template>
  <!-- 首页-个人中心 -->
  <div class="person">
    <div class="person-nav">
      <div class="person-name">{{ userInfo.DisplayName }}</div>
      <div class="person-number">{{ userInfo.Account }}</div>
    </div>
    <van-cell-group>
      <van-cell center title="是否开工">
        <template #right-icon>
          <van-switch v-model="userInfo.IsStart" size="22" @change="setStart" />
        </template>
      </van-cell>
      <van-cell center title="是否接收消息通知">
        <template #right-icon>
          <van-switch
            v-model="userInfo.IsMessage"
            size="22"
            @change="setMessage"
          />
        </template>
      </van-cell>
    </van-cell-group>
    <div class="version">当前版本信息0.1.0</div>
  </div>
</template>

<script>
import {
  Pad_PersonalInformation,
  Pad_SetStart,
  Pad_SetMessagePush,
} from "../../api/index";
export default {
  name: "Person",
  data() {
    return {
      userInfo: {
        Account: "",
        DisplayName: "",
        HeadPorUrl: "",
        Sex: "",
        Birthday: "",
        Mobile: null,
        EMail: null,
        IsStart: false,
        IsMessage: false,
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      Pad_PersonalInformation()
        .then((res) => {
          if (res.ReturnResult === "1") {
            this.userInfo = res.ReturnData;
          } else {
            this.$notify(res.Message);
          }
        })
        .catch((err) => {
          this.$notify(err);
        });
    },
    setStart(val) {
      const params = { Type: val ? 1 : 0 };
      Pad_SetStart(params)
        .then((res) => {
          if (res.ReturnResult === "1") {
            this.centers = res.ReturnData.AppList;
          } else {
            this.$notify(res.Message);
          }
        })
        .catch((err) => {
          this.$notify(err);
        });
    },
    setMessage(val) {
      const params = { Type: val ? 1 : 0 };
      Pad_SetMessagePush(params)
        .then((res) => {
          if (res.ReturnResult === "1") {
            this.centers = res.ReturnData.AppList;
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

<style lang="scss" scoped>
.person-nav {
  min-height: 60px;
  padding: 15px;
  color: #fff;
  background: url("../../assets/img/top-bg.jpg") bottom center no-repeat;
  background-size: 100%;

  .person-name {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .person-number {
    font-size: 16px;
  }
}

.version {
  color: #999999;
  font-size: 14px;
  text-align: center;
  margin-top: 150px;
}
</style>