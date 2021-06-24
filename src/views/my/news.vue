<template>
  <div>
    <van-nav-bar
      title="新消息通知"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group>
      <van-cell v-for="item in setting" :key="item.name" :title="item.name">
        <template #right-icon>
          <van-switch v-model="item.model" size="24" @change="changehandler(item)" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import myApi from "../../api/my.js";
export default {
  name: "news",
  data() {
    return {
      isLoading: true,
      setting: [],
    };
  },
  created() {
    this.initNewsSetting();
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    initNewsSetting() {
      let $this = this;
      myApi
        .getNewSetting()
        .then((result) => {
          if (result !== null && result.success) {
            const { providers } = result;
            providers.forEach(elment=>{
                 let json = {
                   name:elment.ProviderName,
                   model:elment.Enabled
                 }
                 $this.setting.push(json)
            })
          }
        })
        .catch((error) => {
          console.log("获取新消息通知设置异常", error);
        });
    },
    changehandler(val) {
      let item = Object.assign({}, val);
      if (item.model) {
        this.saveNews(item.name);
      } else {
        this.saveNews(item.name);
      }
    },
    saveNews(value) {
      let $this = this;
      myApi
        .saveNewsSetting(value)
        .then((result) => {
          if (result) {
            $this.$notify({ type: "success", message: "操作成功" });
          } else {
            $this.$notify({ type: "success", message: "操作失败" });
          }
        })
        .catch((error) => {
          console.log("启用或者禁用失败", error);
        });
    },
  },
};
</script>

<style scoped></style>
