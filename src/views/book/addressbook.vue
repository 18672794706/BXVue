<template>
  <div>
    <div class="search-div">
      <van-search
        v-model="searchKey"
        placeholder="请输入搜索关键词"
        @cancel="canclehandler"
        @search="seachkeyhanler"
        :show-action="showaction"
      />
    </div>
    <div class="task-tit">
      <span
        class="bread"
        v-for="(item, i) in breadData"
        :key="item.name"
        @click="breadClick(item, i)"
      >
        <b>{{ item.name }}</b>
        <van-icon name="arrow"></van-icon>
      </span>
    </div>
    <div class="cont">
      <van-cell-group v-show="!show">
        <div>
          <van-cell v-for="item in nowData" :key="item.name">
            <!--部门-->
            <div class="item" v-if="item.data.type === 'ou'" @click="dataChange(item)">
              <i class="fa fa-folder-o folder-icon"></i>
              <div class="item-cont">
                <div class="item-cont-inner">{{ item.data.data.Name }}</div>
              </div>
            </div>
            <!--个人-->
            <div class="item" v-if="item.data.type !== 'ou'" @click="openCard(item)">
              <van-icon
                class="item-icon"
                :name="item.data.avatar | userAvatar"
              ></van-icon>
              <div class="item-cont">
                <div class="item-cont-inner">{{ item.data.DisplayName }}</div>
              </div>
            </div>
          </van-cell>
        </div>
      </van-cell-group>
      <!-- 空数据 -->
      <van-empty description="部门无成员" v-show="show" />
    </div>

    <van-popup
      :get-container="modelContainer"
      v-model="userShow"
      class="pro-pop"
      position="bottom"
      style="padding-bottom: 0"
    >
      <van-nav-bar
        title="详细信息"
        @click-left="userShow = !userShow"
        right-text="关闭"
        @click-right="userShow = !userShow"
      />
      <div class="formpanel">
        <div>
          <div class="cell-top">
            <van-cell>
              <template slot="title">
                <van-image
                  class="headImg"
                  width="60"
                  height="60"
                  fit="fill"
                  :src="user.img"
                >
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
            <!-- <van-field
              clickable
              readonly
              label="直接主管"
              right-icon="arrow"
              @click="openLeader"
            >
            </van-field> -->
          </van-cell-group>

          <!--调用本身-->
          <!-- <van-popup v-model="userShow" position="right" get-container="#app" class="pop">
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
      </div>
    </van-popup>
  </div>
</template>

<script>
import bookApi from "../../api/addressbook";
export default {
  name: "addressbook",
  data() {
    return {
      searchKey: "",
      showaction: false,
      loading: false,
      show: false,
      userShow: false,
      modelContainer: "#app",
      breadData: [
        {
          name: "全部",
          id: "all",
        },
      ],
      nowData: [],
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
  filters: {
    userAvatar(avatar) {
      let host = window.location.origin + window.config.host;
      let value = host + avatar;
      return value;
    },
  },
  methods: {
    canclehandler() {},
    seachkeyhanler() {
      let $this = this;
      let value = encodeURIComponent($this.searchKey);
      if (value === "" || value === "" || value === undefined) {
        $this.nowData = [];
        $this.show = false;
        $this.initMainTree();
      } else {
        bookApi
          .searchUserByOrg(value)
          .then((result) => {
            const { children } = result;
            $this.nowData = [];
            if (children.length > 0) {
              children.forEach((element) => {
                let json = {
                  name: "全部",
                  data: element,
                };
                $this.nowData.push(json);
                $this.show = false;
              });
            } else {
              $this.show = true;
            }
          })
          .catch((error) => {
            console.log("查询失败", error);
          });
      }
    },
    breadClick(val, index) {
      let $this = this;
      $this.show = false;
      let cardItem = this.breadData.filter((x) => x.name === val.name);
      if (cardItem !== null && cardItem.length > 0) {
        let item = cardItem[0];
        if (item !== null) {
          $this.nowData = [];
          for (var i = 0; i < $this.breadData.length; i++) {
            console.log(`i:${i},index:${index}`);
            if (i > index) {
              $this.breadData.splice(i, 1);
            }
          }
          if (item.id === "all") {
            $this.initMainTree();
          } else {
            $this.getUserByOrg(item.id);
          }
        }
      }
    },
    dataChange(val) {
      let $this = this;
      const { data } = val;
      if (data !== null) {
        $this.insertBread(data.text, data.id);
      }
      let value = encodeURIComponent(data.id);
      this.getUserByOrg(value);
    },
    getUserByOrg(value) {
      let $this = this;
      bookApi
        .getUserByOrg(value)
        .then((result) => {
          const { children } = result;
          if (children.length <= 0) $this.show = true;
          $this.nowData = [];
          children.forEach((element) => {
            let json = {
              name: "全部",
              data: element,
            };
            $this.nowData.push(json);
          });
        })
        .catch((error) => {
          console.log("获取组织子项异常", error);
        });
    },
    openCard(val) {
      let $this = this;
      $this.userShow = true;
      if (
        val !== null &&
        val !== undefined &&
        val.data !== null &&
        val.data !== undefined
      ) {
        let data = val.data;
        let url = window.location.origin + window.config.host + data.avatar;
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
    insertBread(val, id) {
      let data = this.breadData;
      var item = data.filter((x) => x.name === val);
      if (item === undefined || item.length <= 0) {
        let json = {
          name: val,
          id: id,
        };
        this.breadData.push(json);
      }
      console.log("bread", this.breadData);
    },
    initMainTree() {
      let $this = this;
      bookApi
        .getOrgTree()
        .then((result) => {
          if (result !== null) {
            const { children } = result;
            children.forEach((element) => {
              let json = {
                name: "全部",
                data: element,
              };
              $this.nowData.push(json);
            });
          }
          console.log("json", $this.nowData);
        })
        .catch((error) => {
          console.error("获取组织数异常", error);
        });
    },
  },
  created() {
    this.initMainTree();
  },
};
</script>

<style scoped>
.formpanel {
  height: 100vh;
  height: 100vh;
}
.search-div {
  width: 96%;
  height: 40px;
  margin-top: 0px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
}
.task-tit {
  top: 54px;
  left: 0;
  width: 100%;
  text-align: left;
  white-space: nowrap;
  overflow-x: auto;
  box-sizing: border-box;
  z-index: 1;
  padding: 12px 16px 8px;
  color: #969799;
  font-size: 14px;
  line-height: 16px;
  background-color: #f8f8f8;
}
.bread:last-child i {
  display: none;
}

.bread b {
  font-weight: normal;
  padding: 0 2px;
}

.bread i {
  vertical-align: middle;
}

.bread b:active {
  background-color: rgba(119, 119, 119, 0.1);
}
.item {
  height: 40px;
  position: relative;
}

.item-icon {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 22px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 20px;
  float: left;
  color: #76dbb4;
}

.item-icon.nobg {
  background-color: transparent;
}

.item-icon .van-icon__image {
  width: 100%;
  height: 100%;
}

.item-cont {
  height: 100%;
  overflow: hidden;
}

.item-cont:before {
  content: "";
  width: 0;
  font-size: 0;
  height: 100%;
  visibility: hidden;
  display: inline-block;
  vertical-align: middle;
}

.item-cont-inner {
  width: 100%;
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
  color: #333333;
}

.item-cont-inner.small {
  font-size: 14px;
  color: #81b0e8;
}
.folder-icon {
  float: left;
  margin-right: 13px;
  margin-top: 5px;
  font-size: 30px;
}
/* 用户详情 */
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
