<template>
  <view class="layout">
    <view class="navbar">
      <view :style="{height: getStatusBarHeight() + 'px'}" class="statusBar"></view> <!--空白盒子, 设置为状态栏高度-->
      <view :style="{height: getTitleBarHeight() + 'px'}" class="titleBar">
        <view class="title">{{ title }}</view>
        <navigator class="search" url="../../pages/search/search">
          <uni-icons class="icon" color="#888" size="18" type="search"></uni-icons>
          <text class="text">搜索</text>
        </navigator>
      </view>
    </view>

    <!--    制造填充区域: 防止定位属性导致原来界面被遮挡-->
    <view :style="{height : getNavBarHeight() + 'px'}" class="fill"></view>
  </view>
</template>

<script lang="ts" setup>
import {getNavBarHeight, getStatusBarHeight, getTitleBarHeight} from "@/utils/system";

defineProps({
  title: {
    type: String,
    default: "壁纸"
  }
})
</script>


<style lang="scss" scoped>
.layout {
  .navbar {
    /* 固定定位 */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10; /* 将图像置于顶层 */
    background: linear-gradient(to bottom, transparent, white 400rpx),
    linear-gradient(to right, #beecd8 20%, #f4e2d8);

    .titleBar {
      display: flex;
      align-items: center;
      padding: 0 30rpx;

      .title {
        font-size: 22px;
        font-weight: 700;
        color: black;
      }

      .search {
        width: 220rpx;
        height: 56rpx;
        border-radius: 60rpx;
        background: rgba(255, 255, 255, .4);
        border: 1px solid white;
        margin-left: 30rpx;
        color: #999;
        font-size: 28rpx;
        display: flex;
        align-items: center;

        .icon {
          margin-left: 5rpx;
        }

        .text {
          padding-left: 10rpx;
        }
      }
    }
  }
}
</style>
