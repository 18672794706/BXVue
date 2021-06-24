<template>
  <van-radio v-bind="$attrs" v-on="$listeners">
    <slot></slot>
    <template #icon="props">
      <i
        v-show="props.checked"
        class="iconfont iconShape2"
        style="color: #1364e1"
      />
      <i
        v-show="!props.checked"
        class="iconfont iconShapeCopy"
        style="color: #dddddd"
      />
    </template>
  </van-radio>
</template>

<script>
export default {
  inheritAttrs: false,
  name: "gm-radio",
};
</script>

<style lang="scss" scoped>
.iconfont{
  vertical-align: top;
}
</style>