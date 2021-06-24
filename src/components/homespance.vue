<template>
  <div>
    <van-grid :column-num="item.COLUNMNUM" :border="item.BORDER == 1">
      <van-grid-item
        v-for="(app, i) in item.children"
        :key="i"
        @click="handlerClick(app)"
      >
        <template #icon>
          <template v-if="app.URLTYPE=='MENU'">
            <i class="fa fa-folder-o"></i>
          </template>
          <template v-else-if="app.ICON === ''">
            <i class="fa fa-file-text-o"></i>
          </template>
          <template v-else>
            <i :class="app.ICON" :style="{ color: app.COLOR }"></i>
          </template>
        </template>
        <template #text>
          <span class="box-label">{{ app.NAME }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "homespance",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["SET_ACTIVETAB"]),
    handlerClick(app) {
      console.log("app", app);
      let json = {
        app: app,
        type: 0,
        urlType:''
      };
      if (app.URLTYPE === "MENU") {
        this.$emit("handlerMenuClick", json);
      } else if (app.URLTYPE === "HTML") {
        this.$router.push({
          path: "/process",
          query: { pagetype: "other", name: app.NAME, page: app.URL },
        });
      } else if (app.URLTYPE === "VUE") {
        this.$router.push({
          path: app.URL,
        });
      } else if (app.URLTYPE === "EXTJS") {
        json.type = 1;
        json.urlType = "EXTJS"
        this.$emit("handlerMenuClick", json);
      }
    },
  },
};
</script>
<style>
.box-label {
  font-size: 12px;
  margin-top: 8px;
}
</style>
