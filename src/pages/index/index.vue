<template>
  <view class="homeLayout">
    <view class="banner">
      <swiper indicator-dots indicator-color="rgba(255,255,255,0.5)"
      indicator-active-color="#fff" autoplay circular>
        <swiper-item v-for="item in 3"><image src="../../common/images/banner1.jpg" mode="aspectFill"></image></swiper-item>
        <swiper-item v-for="item in 3"><image src="../../common/images/banner2.jpg" mode="aspectFill"></image></swiper-item>
        <swiper-item v-for="item in 3"><image src="../../common/images/banner3.jpg" mode="aspectFill"></image></swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.homeLayout{
  .banner{
    width: 750rpx;
    padding: 30rpx 0;   /*上下间距30rpx 左右间距0*/
    swiper{
      width: 750rpx;
      height: 340rpx;
      &-item{
        /* 宽度和高度都继承父级100% */
        width: 100%;
        height: 100%;
        /* 使图片与屏幕左右有间距 */
        /* 需要配合全局样式的 box-sizing: border-box */
        /* 不然会将图片挤压出屏幕范围 */
        padding: 0 30rpx;
        image{
          width: 100%;
          height: 100%;
          /* 增加圆角 */
          border-radius: 10rpx;
        }
      }
    }
  }
}
</style>
