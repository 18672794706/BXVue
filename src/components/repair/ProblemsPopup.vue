<template>
  <van-popup
    class="problems-popup"
    v-bind="$attrs"
    position="bottom"
    :style="{ height: '60%' }"
    v-on="$listeners"
  >
    <div class="van-picker__toolbar van-hairline--bottom">
      <button type="button" class="van-picker__cancel" @click="handleCancel">
        取消
      </button>
      <div class="van-ellipsis van-picker__title">选择故障类型</div>
      <button type="button" class="van-picker__confirm" @click="handleConfirm">
        确认
      </button>
    </div>
    <van-search
      v-model="keywords"
      placeholder="搜索"
      @search="onSearch"
      @cancel="onCancel"
    />
    <div class="problem-list">
      <van-checkbox-group v-model="result">
        <van-cell-group>
          <van-cell
            :class="{ 'select-cell': result.includes(item.ID) }"
            v-for="(item, index) in list"
            clickable
            :key="item.ID"
            :title="item.FailureType"
            @click="toggle(index)"
          >
            <template #right-icon>
              <van-checkbox :name="JSON.stringify(item)" ref="checkboxes">
                <template #icon="props">
                  <span v-if="!props.checked" />
                </template>
              </van-checkbox>
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>
  </van-popup>
</template>

<script>
import { deepClone } from "../../utils/index";
import { Pad_EquipmentGetFailure } from "../../api/index";
export default {
  name: "ProblemsPopup",
  inheritAttrs: false,
  props: {
    // 设备信息
    equipmentInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    problems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      keywords: "",
      list: [
        // {
        //   "ID": "1369",
        //   "EquipmentNo": "224",
        //   "FailureType": "跳电"
        // },
        // {
        //   "ID": "1370",
        //   "EquipmentNo": "224",
        //   "FailureType": "油冷机故障"
        // }
      ],
      result: [],
    };
  },
  watch: {
    problems: {
      handler(val) {
        this.handleResult(val);
      },
      deep: true,
    },
  },
  mounted() {
    this.getData();
    this.handleResult(this.problems);
  },
  methods: {
    getData() {
      const params = {
        EquipmentNo: this.equipmentInfo.EquipmentNo,
        kwd: this.keywords,
      };
      Pad_EquipmentGetFailure(params)
        .then((res) => {
          if (res.ReturnResult === "1") {
            this.list = res.ReturnData;
          } else {
            this.$notify(res.Message);
          }
        })
        .catch((err) => {
          this.$notify(err);
        });
    },
    handleResult(val) {
      const valData = val.map((val) => JSON.stringify(val));
      if (JSON.stringify(valData) !== JSON.stringify(val)) {
        this.result = deepClone(valData);
      }
    },
    handleCancel() {
      this.$emit("input", false);
    },
    handleConfirm() {
      this.$emit(
        "confirm",
        this.result.map((val) => {
          return JSON.parse(val);
        })
      );
      this.$emit("input", false);
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    onSearch() {
      this.list = [];
      this.getData();
    },
    onCancel() {
      this.$toast("搜索取消");
    },
  },
};
</script>
<style lang="scss" scoped>
.problems-popup {
  display: flex;
  flex-direction: column;
  .problem-list {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>

<style lang="scss">
.problems-popup {
  .van-checkbox__icon--checked .van-icon {
    color: #1989fa;
    background-color: transparent;
    border-color: transparent;
    font-size: 20px;
  }
}
</style>