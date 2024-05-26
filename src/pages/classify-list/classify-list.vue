<template>
  <view class="classify-list">
    <!--    顶部加载框只在首次进入的时候显示, 即classList为空的时候-->
    <!--    如果没有数据也不显示加载框-->
    <view v-if="!classList.length && !noData" class="loadingLayout">
      <uni-load-more status="loading"></uni-load-more>
    </view>
    <view class="content">
      <!--suppress TypeScriptValidateTypes -->
      <navigator
          v-for="item in classList"
          :key="item._id"
          :url="'../preview/preview?id=' + item._id"
          class="item"
      >
        <image :src="item.smallPicurl" mode="aspectFill"></image>
      </navigator>
    </view>
    <!--    底部加载框只在有内容的时候显示-->
    <view v-if="classList.length" class="loadingLayout">
      <uni-load-more :status="noData ? 'noMore' : 'loading'"></uni-load-more>
    </view>
    <!--    底部安全区域-->
    <view class="safe-area-inset-bottom"></view>
  </view>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {onLoad, onReachBottom, onShareAppMessage, onShareTimeline} from "@dcloudio/uni-app";
import {apiGetClassList} from "@/api/api";
import {gotoHome} from "@/utils/common";

const queryParams: { classid: string, name?: string, pageNum?: number, pageSize?: number } = {}
/* 用于阻止无效的网络请求 */
const noData = ref(false)

onLoad((e) => {
  let {id = null, name = "分类列表"} = e
  if (!id) {
    gotoHome()
  }
  queryParams.classid = id
  queryParams.name = name
  queryParams.pageNum = 1
  queryParams.pageSize = 12
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

/**
 * 获取分类列表网数据
 * @param data 参数列表
 */
async function getClassList(data: WallListRequestData) {
  let res = await apiGetClassList(data)
  // classList.value = [...classList.value, ...res.data]
  classList.value = classList.value.concat(res.data)
  /* 阻止无效的网络请求 */
  /*
    当 queryParams.pageSize 被设置为一个有效的数值时，
    判断 res.data.length 是否小于这个值。
    当 queryParams.pageSize 为 0 或 undefined 时，
    判断 res.data.length 是否小于 Infinity (总是为 true)
  */
  if (res.data.length < (queryParams.pageSize || Infinity))
    noData.value = true
  /* 将数据缓存, 方便预览界面使用 */
  uni.setStorageSync("storageClassList", classList.value)
}

/**
 * 分享给好友
 */
onShareAppMessage((e) => {
  return {
    title: "丁丁壁纸" + queryParams.name,
    path: `pages/classify-list/classify-list?id=${queryParams.classid}&name=${queryParams.name}`,
  }
})

/**
 * 分享到朋友圈
 */
onShareTimeline(() => {
  return {
    title: "丁丁壁纸" + queryParams.name,
    query: `id=${queryParams.classid}&name=${queryParams.name}`
  }
})
</script>


<style lang="scss" scoped>
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
