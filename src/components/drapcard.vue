<template>
  <div class="drap-div" @click.stop="draphandler">
    <div class="edit-tip" 
    :class="[icontype == 'minus' ?'edit-red':'edit-grey', 'edit-tip']"
    v-show="isshow&source=='coll'" 
    @click.stop="edithandler(objData,icontype)">
      <van-icon 
       :name="icontype"   
      />
    </div>
    <div class="card-icon" :style="{background:objData.Color}">
      {{objData.ShortName}} 
    </div>
    <p>{{ objData.ProcessName }}</p>
  </div>
</template>

<script>
export default {
  name: "drap",
  props: {
    icontype:{
       type:String,
       default(){
         return 'minus'
       }
    },
    isshow: {
      type: Boolean,
      default() {
        return false;
      },
    },
    objData: {
      type: Object,
      default() {
        return {};
      },
    },
    source:{
      type:String,
      default(){
        return "coll"
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    draphandler() {
     
    },
    edithandler(val,type) {
      console.log('va;',val)
       if (type === 'minus')
           this.$emit('cancleProcess',val.ProcessName)
        else 
           this.$emit('addProcess',val.ProcessName)
    },
  },
};
</script>

<style scoped>
.edit-tip {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  float: right;
  position: relative;
  right: 5px;
  top: 2px;
  text-align: center;
  color: #ffffff;
  line-height: 24px;
}
.edit-red {
    background-color: red;
}
.edit-grey {
      background-color: #c3c3c3;
}
.drap-div {
  width: 25%;
  height: 110px;
  float: left;
}
.drap-div p {
  text-align: center;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: #333;
}
.card-icon {
  margin: 10px auto;
  height: 54px;
  width: 54px;
  border-radius: 10px;
  text-align: center;
  line-height: 54px;
  color: #ffffff;
}
</style>
