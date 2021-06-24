<template>
  <div>
    <van-nav-bar
      title="多语言设置"
      left-text="返回"
      left-arrow
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-cell-group>
      <van-cell
        v-for="item in langSetting"
        :key="item.name"
        :title="item.name"
        @click="selectValue = item.value"
      >
        <van-icon
          slot="right-icon"
          name="success"
          color="#4caf50"
          class="van-cell__right-icon"
          v-show="item.value == selectValue"
        ></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "outside",
  data() {
    return {
      langSetting: [
        { name: "简体中文", value: "zh-cn" },
        { name: "繁体中文", value: "ch-cn" },
        { name: "英语", value: "zh-en" },
        {name:'法语',value:'zh-fn'}
      ],
      selectValue:'zh-cn'
    };
  },
  methods:{
   onClickLeft() {
       this.$router.back()
   },
   onClickRight() {
      localStorage.setItem('lang',this.selectValue)
      this.onClickLeft()
   }
  },
  created() {
    const lang = localStorage.getItem('lang')
    if (lang !==null && lang!==undefined && lang!=="") {
         this.selectValue = lang
    }
  }
};
</script>

<style scoped>

</style>
