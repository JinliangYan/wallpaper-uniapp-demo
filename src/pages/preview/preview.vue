<template>
  <view class="preview">
    <swiper circular>
      <swiper-item v-for="item in 5">
        <image src="../../common/images/preview1.jpg" mode="aspectFill"></image>
      </swiper-item>
    </swiper>

    <view class="mask">
      <view class="goBack"></view>
      <view class="count">3 / 9</view>
      <view class="time">10:10</view>
      <view class="date">05月17日</view>
      <view class="footer">
        <view class="box">
          <uni-icons type="info" size="28"></uni-icons>
          <view class="text">信息</view>
        </view>

        <view class="box">
          <uni-icons type="info" size="28"></uni-icons>
          <view class="text">5分</view>
        </view>

        <view class="box">
          <uni-icons type="info" size="28"></uni-icons>
          <view class="text">下载</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">

</script>


<style scoped lang="scss">
.preview{
  width: 100%;
  height: 100vh;
  position: relative;
  swiper{
    width: 100%;
    height: 100%;
    image{
      width: 100%;
      height: 100%;
    }
  }
  .mask{
    .goBack{

    }
    .count{
      position: absolute;
      top: 10vh;

      /* 一个absolute定位布局居中的方式 */
      left: 0;
      right: 0;
      margin: auto;

      width: fit-content; /* 自适应宽度, 有多少内容就有多宽 */
      background: rgba(0, 0, 0, .3);
      font-size: 28rpx;
      color: #fff;
      border-radius: 40rpx;
      padding: 8rpx 28rpx;
      backdrop-filter: blur(10rpx);
    }
    .time{

    }
    .date{

    }
    .footer{

    }
  }
}
</style>
