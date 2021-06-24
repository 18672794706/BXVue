<template>
  <div>
    <div class="line-div">
      <van-cell :title="listitemData.ProcessName">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon v-if="listitemData.isActive">
            <van-icon color="#1989fa" name="star" />   
        </template>
         <template #right-icon v-else>
            <van-icon  name="star-o" />   
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
    name:'listcard',
    props:{
       listitemData:{
           type:Object,
           default(){
               return {}
           }
       }
    },
    data() {
        return {

        }
    }
};
</script>

<style scoped>
.line-div {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ece8e8;
}
</style>
