<template>
  <van-popup
    class="assist-selection-popup task-selection-popup"
    v-bind="$attrs"
    position="bottom"
    v-on="$listeners"
    get-container="body"
  >
    <div class="van-picker__toolbar van-hairline--bottom">
      <button
        type="button"
        class="van-picker__cancel"
        @click="handleCancel"
      >
        取消
      </button>
      <div class="van-ellipsis van-picker__title">
        选择协助人员
      </div>
      <button
        type="button"
        class="van-picker__confirm"
        @click="handleConfirm"
      >
        确认
      </button>
    </div>
    <div class="pick-list">
      <van-cell-group>
        <van-cell
          :class="{ 'select-cell': result === item.account }"
          v-for="item in list"
          clickable
          :key="item.account"
          :title="item.name"
          @click="toggle(item)"
        >
          <template #right-icon>
            <div class="right-area">
              {{ item.status }}
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: "AssistSelectionPopup",
  inheritAttrs: false,
  data() {
    return {
      keywords: "",
      list: [
        {
          account: "孙建荣",
          name: "孙建荣",
          onLine: false,
          status: "空闲",
          statusCont: "",
        },
        {
          account: "杨来军",
          name: "杨来军",
          onLine: true,
          status: "空闲",
          statusCont: "",
        },
        {
          account: "林勇",
          name: "林勇",
          onLine: true,
          status: "空闲",
          statusCont: "",
        },
        {
          account: "毛秀英",
          name: "毛秀英",
          onLine: false,
          status: "忙碌",
          statusCont: "【室内机/BF/钎焊装置1号】压力表故障、管道漏压故障",
        },
        {
          account: "廖敏",
          name: "廖敏",
          onLine: false,
          status: "忙碌",
          statusCont: "压力表故障、管道漏压故障",
        },
      ],
      result: "",
    };
  },
  methods: {
    handleCancel() {
      this.$emit("input", false);
    },
    handleConfirm() {
      this.$emit("changeSelection", this.result);
      this.$emit("input", false);
    },
    toggle(item) {
      this.result = item.account;
    }
  },
};
</script>
