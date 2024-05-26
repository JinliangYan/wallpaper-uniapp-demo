<template>
  <view class="homeLayout pageBg">
    <custom-nav-bar title="推荐"></custom-nav-bar>

    <view class="banner">
      <swiper autoplay circular
              indicator-active-color="#fff" indicator-color="rgba(255,255,255,0.5)" indicator-dots>
        <swiper-item v-for="item in bannerList" :key="item._id">
          <image :src="item.picurl" mode="aspectFill"></image>
        </swiper-item>
      </swiper>
    </view>

    <view class="notice">
      <view class="left">
        <uni-icons size="20" type="sound-filled"></uni-icons>
        <text class="text">公告</text>
      </view>
      <view class="center">
        <swiper autoplay circular duration="300" interval="1500" vertical>
          <swiper-item v-for="item in noticeList" :key="item._id">
            <navigator url="../notice/detail">
              {{ item.title }}
            </navigator>
          </swiper-item>
        </swiper>
      </view>
      <view class="right">
        <uni-icons color="#333" size="16" type="right"></uni-icons>
      </view>
    </view>

    <view class="select">
      <common-title>
        <!--        插槽用template指名-->
        <template #name>每日推荐</template>
        <template #custom>
          <view class="date">
            <uni-icons size="18" type="calendar"></uni-icons>
            <view class="text">
              <uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
            </view>
          </view>
        </template>
      </common-title>
      <view class="content">
        <scroll-view scroll-x>
          <view class="box" v-for="item in randomList" :key="item._id"
                @click="goPreview(item._id)">
            <image :src="item.smallPicurl"></image>
          </view>
        </scroll-view>
      </view>
    </view>

    <view class="theme">
      <common-title>
        <template #name>专题精选</template>
        <template #custom>
          <navigator class="more" url="">More+</navigator>
        </template>
      </common-title>

      <view class="content">
        <theme-item v-for="item in classifyList"
                    :key="item._id"
                    :item="item">
        </theme-item>
        <theme-item is-more></theme-item>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {apiGetBanner, apiGetClassify, apiGetDayRandom, apiGetNotice} from "@/api/api";
import {onShareAppMessage, onShareTimeline} from "@dcloudio/uni-app";

getBanner();
getDayRandom()
getNotice()
getClassify()

const bannerList = ref([])
const randomList = ref([])
const noticeList = ref([])
const classifyList = ref([])

async function getBanner() {
  let res = await apiGetBanner();
  bannerList.value = res.data
}

async function getDayRandom() {
  let res = await apiGetDayRandom();
  if (res.errCode === 0) {
    randomList.value = res.data
  }
}

async function getNotice() {
  let res = await apiGetNotice({select: true})
  noticeList.value = res.data
}

async function getClassify() {
  let res = await apiGetClassify({
    select: true
  })
  classifyList.value = res.data
}

function goPreview(id) {
  uni.navigateTo({
    url: "/pages/preview/preview?id=" + id,
  })
  uni.setStorageSync("storageClassList", randomList.value)
}

/**
 * 分享给好友
 */
onShareAppMessage((e) => {
  return {
    title: "丁丁壁纸",
    path: "pages/index/index"
  }
})

/**
 * 分享到朋友圈
 */
onShareTimeline(() => {
  return {
    title: "丁丁壁纸",
    // imageUrl: "https://cdn-icons-png.freepik.com/256/6364/6364002.png?semt=ais_hybrid"
    // path: "pages/index/index"
  }
})

</script>

<style lang="scss" scoped>
.homeLayout {
  .banner {
    width: 750rpx;
    padding: 30rpx 0; /*上下间距30rpx 左右间距0*/
    swiper {
      width: 750rpx;
      height: 340rpx;

      &-item {
        /* 宽度和高度都继承父级100% */
        width: 100%;
        height: 100%;
        /* 使图片与屏幕左右有间距 */
        /* 需要配合全局样式的 box-sizing: border-box */
        /* 不然会将图片挤压出屏幕范围 */
        padding: 0 30rpx;

        image {
          width: 100%;
          height: 100%;
          /* 增加圆角 */
          border-radius: 10rpx;
        }
      }
    }
  }

  .notice {
    width: 690rpx;
    height: 80rpx;
    /*
    设置元素的行高为 80rpx。
    行高用于确定文本行的高度，并在垂直方向上对齐文本。
    当行高等于元素高度时（如这里的 80rpx），文本将在元素内垂直居中。
    这是因为行高大于字体高度时，会在文本的上下方各添加相同的空间，从而实现垂直居中。
    */
    line-height: 80rpx;
    background: #f9f9f9;
    /* 居中 */
    /* 上下边距为 0（无上下边距） */
    /* 左右边距为 auto */
    /* auto 会根据元素的宽度和其包含块的宽度自动计算左右边距，使元素水平居中 */
    margin: 0 auto;
    border-radius: 80rpx; /* 胶囊: border-radius==height */
    display: flex; /* 将所有子元素显示为一行 */
    .left {
      width: 140rpx;
      /* 子元素整体居中 */
      display: flex;
      align-items: center;
      justify-content: center;

      .text {
        color: $brand-theme-color;
        font-weight: 600;
        font-size: 28rpx;
      }

      /* 小程序不能这样写 */
      //.uni-icons{
      //  /* 行内样式优先级大于这里的的样式, 要注明important */
      //  color: $brand-theme-color !important;
      //}
      /* 小程序正确写法 */
      :deep(.uni-icons) {
        color: $brand-theme-color !important;
      }
    }

    .center {
      flex: 1; /* 设置中心子元素的弹性属性 */
      swiper {
        height: 100%;

        &-item {
          height: 100%;
          font-size: 30rpx;
          color: #666;
          /* 内容显示不完整处理 */
          /* 点点点 */
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }

    .right {
      width: 70rpx;
      /* 子元素整体居中 */
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .select {
    padding-top: 50rpx;

    .date {
      color: $brand-theme-color;
      display: flex;
      align-items: center;

      .text {
        margin-left: 5rpx;
      }

      :deep(.uni-icons) {
        color: $brand-theme-color !important;
      }
    }

    .content {
      width: 720rpx;
      margin-left: 30rpx;
      margin-top: 30rpx;

      scroll-view {
        white-space: nowrap; /* 不换行 */
        .box {
          width: 200rpx;
          height: 430rpx;
          display: inline-block;
          margin-right: 15rpx;

          image {
            width: 100%;
            height: 100%;
            border-radius: 10rpx;
          }
        }

        .box:last-child {
          margin-right: 30rpx
        }
      }
    }
  }

  .theme {
    padding: 50rpx 0;

    .more {
      font-size: 32rpx;
      color: #888;
    }

    .content {
      margin-top: 30rpx;
      padding: 0 30rpx;
      display: grid;
      gap: 15rpx;
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
