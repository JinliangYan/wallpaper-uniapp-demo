<template>
  <view class="preview">
    <swiper circular>
      <swiper-item v-for="item in 5">
        <image @click="maskChange" src="../../common/images/preview1.jpg" mode="aspectFill"></image>
      </swiper-item>
    </swiper>

    <view class="mask" v-if="maskState">
      <view class="goBack"></view>
      <view class="count">3 / 9</view>
      <view class="time">
        <uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
      </view>
      <view class="date">
        <uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
      </view>
      <view class="footer">
        <view class="box">
          <uni-icons type="info" size="28"></uni-icons>
          <view class="text">信息</view>
        </view>

        <view class="box">
          <uni-icons type="star" size="28"></uni-icons>
          <view class="text">5分</view>
        </view>

        <view class="box">
          <uni-icons type="download" size="28"></uni-icons>
          <view class="text">下载</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";

const maskState = ref(true)
function maskChange() {
  maskState.value = !maskState.value
}
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
    /* 父级紧邻的view */
    &>view{
      position: absolute;
      /* 一个absolute定位布局居中的方式 */
      left: 0;
      right: 0;
      margin: auto;

      color: #fff;
      width: fit-content; /* 自适应宽度, 有多少内容就有多宽 */
    }
    .goBack{

    }
    .count{
      top: 10vh;
      background: rgba(0, 0, 0, .3);
      font-size: 28rpx;
      border-radius: 40rpx;
      padding: 8rpx 28rpx;
      backdrop-filter: blur(10rpx);
    }
    .time{
      font-size: 140rpx;
      top: calc(10vh + 80rpx);
      font-weight: 100;
      line-height: 1em; /* 去掉文字默认行高: 行高与字体大小相同*/

      /* 设置文本阴影效果 */
      /*
      text-shadow: h-shadow v-shadow blur color;
        h-shadow: 水平偏移（必需）。可以是负值。定义阴影向右（正值）或向左（负值）移动的距离。
        v-shadow: 垂直偏移（必需）。可以是负值。定义阴影向下（正值）或向上（负值）移动的距离。
        blur: 模糊半径（可选）。不能为负值。定义阴影的模糊半径，值越大，阴影越模糊，边缘越柔和。
        color: 阴影的颜色（可选）。可以使用任何 CSS 颜色值，如 rgba, hex, 或颜色名称。
      */
      text-shadow: 0 4rpx rgba(0, 0, 0, .3);
    }
    .date{
      font-size: 34rpx;
      top: calc(10vh + 230rpx);
      text-shadow: 0 2rpx rgba(0, 0, 0, .3);
    }
    .footer{
      background: rgba(255, 255, 255, .8);
      bottom: 10vh;
      height: 120rpx;
      width: 65vw;
      border-radius: 120rpx;
      color: #000;
      display: flex;
      align-items: center;
      justify-content: space-around;
      box-shadow: 0 2rpx rgba(0, 0, 0, .1);
      backdrop-filter: blur(20rpx);
      .box{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* 利用padding */
        padding: 2rpx 12rpx;
        .text{
          font-size: 26rpx;
          color: $text-font-color-2;
        }
      }
    }
  }
}
</style>
