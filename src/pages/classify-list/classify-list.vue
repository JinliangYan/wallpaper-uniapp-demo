<template>
  <view class="classify-list">
    <view class="content">
      <navigator
          url="../preview/preview"
          class="item"
          v-for="item in classList"
          :key="item._id"
      >
        <image :src="item.smallPicurl" mode="aspectFill"></image>
      </navigator>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {apiGetClassList} from "@/api/api";

const classList = ref([])

getClassList({
  classid: "6524ace7213929cbcee72e4d"
})

async function getClassList(data = {}) {
  let res = await apiGetClassList(data)
  classList.value = res.data
}
</script>


<style scoped lang="scss">
.classify-list{
  .content{
    padding: 5rpx;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rpx;
    .item{
      height: 440rpx;
      image{
        width: 100%;
        height: 100%;
        display: block; /* 将图像转为块元素 */
      }
    }
  }
}
</style>
