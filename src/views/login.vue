<template>
  <div>
    <div class="login-user">
      <img src="../assets/logo1.png" alt="" />
    </div>
    <div class="form-div">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ 
            required: true,
            trigger:'onSubmit'
            }
          ]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import loginApi from "../api/login.js";
import { mapActions, mapGetters } from "vuex";
import { useApp, usePlatForm } from "../util/index.js";
import { Notify } from 'vant';
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["SET_KEYSTORE", "SET_PUBLISHKEY", "SET_LOGINUSERINFO"]),
    ...mapGetters(["GETKEYSTORE"]),
    onSubmit() {
      let $this = this;
      if ($this.username.trim() === '' || $this.password.trim()==='') {
        Notify({ type: 'danger', message: '用户名或密码不能为空' });
        return;
      }
      loginApi
        .getpublishKey()
        .then((result) => {
          if (result.success) {
            $this.SET_KEYSTORE(result.keystore);
            $this.SET_PUBLISHKEY(result.publicKey);
            $this.onLogin();
          }
        })
        .catch((error) => {
          console.log("获取密钥异常", error);
        });
    },
    onLogin() {
      let $this = this;
      let userName = $this.username;
      let passowrd = $this.password;
      let platform = usePlatForm();
      let isapp = useApp();
      loginApi
        .userLogin(userName, passowrd, platform, isapp)
        .then((result) => {
          if (result !== null && result !== "" && result !== null) {
            let serverData = {};
            if (typeof result === "object") {
              serverData = result;
            } else {
              serverData = eval("(" + result + ")");
            }
            $this.SET_LOGINUSERINFO(serverData.user);
            $this.$router.push({ path: "/home" });
          }
        })
        .catch((error) => {
          console.log("登录异常", error);
        });
    },
  },
};
</script>

<style>
.login-user {
  width: 68px;
  height: 68px;
  margin-top: 150px;
  margin-bottom: 10%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
}
.login-user img {
  width: 68px;
  height: 68px;
  border-radius: 5px;
}
.form-div {
  width: 90%;
  margin: 10px auto;
}
</style>
