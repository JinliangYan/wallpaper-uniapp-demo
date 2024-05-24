<template>
  <view class="classifyLayout pageBg">
    <custom-nav-bar title="分类"></custom-nav-bar>
    <view class="classify">
      <theme-item v-for="item in classifyList"
                  :key="item._id"
                  :item="item"></theme-item>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {apiGetClassify} from "@/api/api";

const classifyList = ref([])

getClassify()

async function getClassify() {
  let res = await apiGetClassify({
    pageSize: 15,
  })
  classifyList.value = res.data
}
</script>


<style scoped lang="scss">
.classifyLayout{
  .classify{
    padding: 30rpx;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
