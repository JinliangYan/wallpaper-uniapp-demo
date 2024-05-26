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

<script lang="ts" setup>
import {ref} from "vue";
import {apiGetClassify} from "@/api/api";
import {onShareAppMessage, onShareTimeline, onUnload} from "@dcloudio/uni-app";

const classifyList = ref([])

getClassify()

async function getClassify() {
  let res = await apiGetClassify({
    pageSize: 15,
  })
  classifyList.value = res.data
}

/**
 * 分享给好友
 */
onShareAppMessage((e) => {
  return {
    title: "丁丁壁纸, 精选分类",
    path: "pages/classify/classify"
  }
})

/**
 * 分享到朋友圈
 */
onShareTimeline(() => {
  return {
    title: "丁丁壁纸, 精选分类",
    // imageUrl: "https://cdn-icons-png.freepik.com/256/6364/6364002.png?semt=ais_hybrid"
    // path: "pages/index/index"
  }
})

/**
 * 卸载页面后清楚缓存
 */
onUnload(() => {
  uni.removeStorageSync("storageClassList")
})
</script>


<style lang="scss" scoped>
.classifyLayout {
  .classify {
    padding: 30rpx;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
