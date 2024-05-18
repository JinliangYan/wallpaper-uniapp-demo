<template>
  <view class="layout">
    <view class="navbar">
      <view class="statusBar"></view> <!--空白盒子, 设置为状态栏高度-->
      <view class="titleBar">
        <view class="title">标题</view>
        <view class="search">
          <uni-icons class="icon" type="search" color="#888" size="18"></uni-icons>
          <text class="text">搜索</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">

</script>


<style scoped lang="scss">
.layout{
  .navbar{
    /* 固定定位 */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10; /* 将图像置于顶层 */
    background:
        linear-gradient(to bottom, transparent, white 400rpx),
        linear-gradient(to right, #beecd8 20%, #f4e2d8);
    .statusBar{
    }
    .titleBar{
      display: flex;
      align-items: center;
      padding: 0 30rpx;
      .title{
        font-size: 22px;
        font-weight: 700;
        color: black;
      }
      .search{
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
        .icon{
          margin-left: 5rpx;
        }
        .text{
          padding-left: 10rpx;
          //d
        }
      }
    }
  }
}
</style>
