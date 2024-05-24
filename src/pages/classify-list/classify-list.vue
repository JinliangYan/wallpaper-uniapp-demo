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
import {onLoad, onReachBottom} from "@dcloudio/uni-app";
import {apiGetClassList} from "@/api/api";

const queryParams: { classid: string, name?: string, pageNum?: number, pageSize?: number } = {}
/* 用于阻止无效的网络请求 */
const noData = ref(false)

onLoad((e) => {
  let {id = null, name = null} = e
  queryParams.classid = id
  queryParams.name = name
  queryParams.pageNum = 1
  uni.setNavigationBarTitle({
    title: name
  })
  /* onLoad的生命周期晚于setup语法糖, 所以将参数获取放在此处*/
  getClassList(queryParams)
})

onReachBottom(() => {
  if (noData.value) return
  queryParams.pageNum++;
  getClassList(queryParams)
})

const classList = ref([])
/*
  这里 queryParams 为空,
  因为 queryParams 在 onLoad周期初始化, onLoad周期晚于setup
*/
// getClassList(queryParams)

async function getClassList(data = {}) {
  let res = await apiGetClassList(data)
  // classList.value = [...classList.value, ...res.data]
  classList.value = classList.value.concat(res.data)
  /* 阻止无效的网络请求 */
  if (queryParams.pageSize > res.data.length
      || queryParams.pageSize == 0)
    noData.value = true
}
</script>


<style scoped lang="scss">
.classify-list {
  .content {
    padding: 5rpx;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rpx;

    .item {
      height: 440rpx;

      image {
        width: 100%;
        height: 100%;
        display: block; /* 将图像转为块元素 */
      }
    }
  }
}
</style>
