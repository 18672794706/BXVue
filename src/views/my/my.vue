<template>
  <div class="perCenter" @click.prevent>
    <!-- 头部 -->
    <div class="cell-top">
      <div class="avatar-box">
        <van-image
          round
          width="55"
          height="55"
          fit="fill"
          :src="userInfo.avatar"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
      </div>
      <div class="user-name">
        {{ userInfo.DisplayName }}
        <template v-if="userInfo.Account !== undefined"
          >({{ userInfo.Account }})</template
        >
      </div>
      <div class="user-company">{{ userInfo.CompanyName }}</div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <van-cell
        v-for="item in myMenuList"
        :key="item.name"
        :title="item.name"
        @click="handlerSelect(item)"
        is-link
      >
        <template slot="icon">
          <van-icon
            class="van-cell__left-icon"
            :name="item.iconName"
            :color="item.color"
          ></van-icon>
        </template>
      </van-cell>
    </div>
    <van-button class="logOutBtn" color="#ff5722" round @click="handleCallBack"
      >退出登录</van-button
    >
    <!-- 服务信息开始 -->
    <van-popup
      v-model="popShow"
      position="right"
      style="heigth: 100vh; width: 100%"
    >
      <div class="service-div">
        <van-nav-bar
          title="服务信息"
          left-text="返回"
          left-arrow
          @click-left="popShow = false"
        />
        <van-cell-group>
          <van-cell
            v-for="item in contactList"
            :key="item.ServiceCenter"
            :title="item.ServiceCenter"
            :value="item.Product"
            :label="item.Tel"
          />
        </van-cell-group>
      </div>
    </van-popup>
    <!-- 服务信息结束 -->

    <!-- 版本信息开始 -->
    <van-popup
      v-model="popVersionShow"
      position="right"
      style="heigth: 100vh; width: 100%"
    >
      <div class="service-div">
        <van-nav-bar
          title="版本信息"
          left-text="返回"
          left-arrow
          @click-left="popVersionShow = false"
        />
        <div class="ver-div">
          <img :src="logoimg" alt="" />
          <p>易企信</p>
        </div>
      </div>
    </van-popup>
    <!-- 版本信息结束 -->

    <!-- 关于信息开始 -->
    <van-popup
      v-model="popAboutShow"
      position="right"
      style="heigth: 100vh; width: 100%"
    >
      <div class="service-div">
        <van-nav-bar
          title="关于"
          left-text="返回"
          left-arrow
          @click-left="popAboutShow = false"
        />
        <div class="about-div">
          <van-swipe :vertical="false" :loop="false" :show-indicators="false">
            <van-swipe-item v-for="n in 9" :key="n">
              <img
                style="width: 100%; height: 100%"
                :src="`${host}/YZSoft/personal/about/slides/${n}.png`"
              />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
    </van-popup>
    <!-- 关于信息结束 -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import loginApi from "../../api/login.js";
import myApi from "../../api/my.js";
export default {
  name: "perCenter",
  data() {
    return {
      vertical: true,
      checked: true,
      isSetting: false,
      isNews: false,
      isOutside: false,
      isOutChecked: 0,
      popShow: false,
      popVersionShow: false,
      popAboutShow: false,
      contactList: [],
      host:'',
      userInfo: {},
      logoimg:require("../../assets/logo1.png"),
      myMenuList: [
        {
          name: "新消息通知",
          iconName: "comment",
          to: "news",
          target: "new",
          color: "#fa8a53",
        },
        {
          name: "外出设置",
          iconName: "comment-circle",
          to: "outset",
          target: "new",
          color: "#54d1ec",
        },
        {
          name: "多语言",
          iconName: "records",
          to: "molang",
          target: "new",
          color: "#d822a0",
        },
        {
          name: "服务信息",
          iconName: "flower-o",
          to: "outset",
          target: "pop",
          color: "#6009bf",
        },
        {
          name: "版本信息",
          iconName: "tosend",
          to: "outset",
          target: "pop",
          color: "#55aed8",
        },
        {
          name: "关于企信通",
          iconName: "eye-o",
          to: "outset",
          target: "pop",
          color: "#a00a41",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["GETLOGINUSERINFO", "GETUSERINFO"]),
    userAccount() {
      return this.GETLOGINUSERINFO.Account;
    },
  },
  created() {
    this.initUserInfo();
    this.initContact();
  },

  methods: {
    ...mapActions(["SET_USERINFO"]),
    // 初始化用户信息
    initUserInfo() {
      this.host=window.config.host;
      let user = localStorage.getItem("userinfo");
      if (user === null) {
        let $this = this;
        loginApi
          .getUserInfo()
          .then((result) => {
            if (result.success) {
              const { userInfo } = result;
              console.log("userin", userInfo);
              $this.userInfo = userInfo;
              $this.userInfo.avatar = `${window.config.host}${userInfo.avatar}`;
              $this.SET_USERINFO(userInfo);
            }
          })
          .catch((err) => {
            console.log("初始化用户信息异常", err);
          });
      } else {
        let jsonItem = JSON.parse(user);
        this.userInfo = jsonItem;
      }
    },
    handleCallBack() {
      var me = this;
      //清空本地存储的用户信息
      localStorage.removeItem("loginuser");
      localStorage.removeItem("userinfo");
      if (pushuuid != null && pushuuid != "") {
        loginApi.logOut(pushuuid).then((data) => {
          if (isUniApp) {
            uni.getEnv(function (res) {
              if (res.plus) {
                window.logOutApp();
              } else if (res.miniprogram) {
                me.$router.replace({
                  path: "/login",
                });
              }
            });
          } else {
            me.$router.replace({
              path: "/login",
            });
          }
        });
      } else {
        loginApi.logOut("").then((data) => {
          me.$router.replace({
            path: "/login",
          });
        });
      }
    },
    handlerSelect(val) {
      let $this = this;
      if (val.target === "new") {
        this.$router.push({ name: val.to });
      } else {
        switch (val.name) {
          case "服务信息":
            $this.popShow = true;
            break;
          case "版本信息":
            $this.popVersionShow = true;
            break;
          case "关于企信通":
            $this.popAboutShow = true;
            break;
        }
      }
    },
    initContact() {
      let $this = this;
      myApi
        .getAllContact()
        .then((result) => {
          $this.contactList = result;
        })
        .catch((error) => {
          console.log("获取客服异常", error);
        });
    },
  },
};
</script>

<style scoped>
.perCenter {
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f2f2f2;
}

.cell-top {
  padding: 45px 0 50px;
  background: url("../../assets/per-bg.png") no-repeat;
  background-size: 100% 100%;
  background-position: bottom center;
}

.cell-top .van-cell {
  background-color: transparent;
}

.avatar-box {
  text-align: center;
  margin-bottom: 10px;
}

.user-name {
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  margin-bottom: 12px;
}

.user-company {
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 10px;
}

.fullBox {
  width: 100%;
  height: 100%;
  padding-top: 46px;
  box-sizing: border-box;
}

.van-cell__left-icon {
  margin-right: 10px;
}

.van-cell__right-icon {
  color: #cccccc;
}

.logOutBtn {
  width: calc(100% - 30px);
  margin: 0 auto;
  display: block;
}

.content {
  width: calc(100% - 30px);
  border-radius: 10px;
  margin: -35px auto 30px;
  padding: 30px 5px 20px;
  overflow: hidden;
  background-color: #fff;
  box-sizing: border-box;
}
.service-div {
  width: 100%;
  height: 100vh;
  background: #fff;
}
.ver-div {
  width: 100px;
  margin: 50% auto;
  text-align: center;
}
.ver-div img {
  width: 100px;
  height: 100px;
}
.about-div {
  width: 100%;
  height: 100vh;
}
</style>
