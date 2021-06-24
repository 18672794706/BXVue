<template>
  <div>
    <div class="cell-top">
      <van-cell>
        <template slot="title">
          <van-image class="headImg" width="60" height="60" fit="fill" :src="user.img">
          </van-image>
          <div class="userName">
            <h1>{{ user.name }}({{ user.account }})</h1>
          </div>
          <van-row gutter="30">
            <van-col span="8" offset="4">
              <a :href="`sms:${user.phone || ''}`" class="btn">
                <van-icon name="chat"></van-icon>短信
              </a>
            </van-col>
            <van-col span="8">
              <a :href="`tel:${user.phone || ''}`" class="btn">
                <van-icon name="phone"></van-icon>电话
              </a>
            </van-col>
          </van-row>
        </template>
      </van-cell>
    </div>
    <van-cell-group title="">
      <van-field label="邮箱">
        <template slot="input">
          <a class="phone" :href="`mailto:${user.email || ''}`">{{ user.email }}</a>
        </template>
      </van-field>
    </van-cell-group>
    <van-cell-group title=" ">
      <van-field label="手机号">
        <template slot="input">
          <a class="phone" :href="`tel:${user.phone || ''}`">{{ user.phone }}</a>
        </template>
      </van-field>
      <van-field label="座机">
        <template slot="input">
          <a class="phone" :href="`tel:${user.tel || ''}`">{{ user.tel }}</a>
        </template>
      </van-field>
      <van-field readonly label="办公地点" :value="user.addr"> </van-field>
    </van-cell-group>
    <van-cell-group title=" ">
      <van-field readonly label="员工编号" :value="user.number"> </van-field>
      <van-field readonly label="入职日期" :value="user.inDate"> </van-field>
      <van-field readonly label="成本中心" :value="user.cost"> </van-field>
      <!--主管们-->
      <van-field
        clickable
        readonly
        label="直接主管"
        right-icon="arrow"
        @click="openLeader"
      >
      </van-field>
    </van-cell-group>

    <!--调用本身-->
    <!-- <van-popup v-model="isPop" position="right" get-container="#app" class="pop">
      <van-nav-bar
        class="per-bar"
        left-text=""
        title="直接主管"
        left-arrow
        @click-left="closeLeader"
      >
      </van-nav-bar>
      <van-cell-group title=" " :key="item" v-for="item in user.leader">
        <van-field readonly label="姓名" :value="item.UserFullName"> </van-field>
        <van-field readonly label="账号" :value="item.UserAccount"> </van-field>
        <van-field readonly label="部门" :value="item.MemberFullName"> </van-field>
      </van-cell-group>
    </van-popup> -->
  </div>
</template>

<script>
export default {
  name: "card",
  data() {
    return {
      isPop: false,
      card: {},
      user: {
        img: "",
        name: "",
        account: "",
        email: "",
        phone: "",
        tel: "",
        addr: "",
        number: "",
        inDate: "",
        cost: "",
        leader: "",
      },
    };
  },
  methods: {
    openLeader() {
      this.isPop = true;
    },
    closeLeader() {
      this.isPop = false;
    },
  },
  created() {
    let item = this.$route.params;
    if (item !== null) {
      const { data } = item;
      let url = window.location.origin+window.config.host+data.avatar
      this.user = {
        img: url,
        name: data.DisplayName,
        account: data.Account,
        email: data.EMail,
        phone: data.Mobile,
        tel: data.HomePhone,
        addr: data.Office,
        number: data.HRID,
        inDate: data.DateHired,
        cost: data.CostCenter,
        leader: data.Supervisors,
      };
    }
  },
};
</script>

<style scoped>
.cell-top {
  min-height: 230px;
  padding: 46px 0 10px;
  background-color: #fff;
  background: url("../../assets/per-bg.png") no-repeat;
  background-size: cover;
  box-sizing: border-box;
}

.van-cell {
  background-color: transparent;
}

.headImg {
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  display: block;
}

.userName {
  margin-bottom: 15px;
}

.userName h1 {
  font-size: 14px;
  line-height: 40px;
  font-weight: normal;
  text-align: center;
  color: #ffffff;
}

.userName h1 i {
  color: #70b5ff;
  vertical-align: middle;
}

.phone {
  color: #537fb1;
}

.van-cell-group__title {
  padding: 5px;
}

.btn {
  display: block;
  width: 100%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
}

.btn:active {
  background-color: rgba(255, 255, 255, 0.8);
}

.btn i {
  vertical-align: middle;
  margin-right: 2px;
}

/*自定义pop和navBar*/
.pop {
  width: 100%;
  height: 100%;
  background-color: #f2f3f5;
}
</style>
