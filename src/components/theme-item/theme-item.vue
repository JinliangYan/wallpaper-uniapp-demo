<template>
  <view class="themeItem">
    <navigator url="" class="box">
      <image class="pic" src="../../common/images/classify1.jpg" mode="aspectFill"></image>
      <view class="mask">明星美女</view>
      <view class="tab">3天前更新</view>
    </navigator>
  </view>
</template>

<script setup lang="ts">

</script>


<style scoped lang="scss">
.themeItem{
  .box{
    height: 340rpx;
    border-radius: 10rpx;
    overflow: hidden; /* 如果不加这个, 图片会把圆角覆盖 */
    /*
    relative 定位为 .box 元素定义了一个定位上下文。
    使得其内部的绝对定位子元素（如 .mask）相对于 .box 的位置进行定位。
    本身不会改变 .box 在正常文档流中的位置，
    只是设置了一个基点，以便子元素可以相对于它进行定位。
    */
    position: relative;
    .pic{
      /* 图片有默认宽高, 这里要图片继承父级宽高 */
      width: 100%;
      height: 100%;
    }
    .mask{
      width: 100%;
      height: 70rpx;
      /*
      absolute 定位使 .mask 脱离正常文档流，不会占据空间。
      相对于最近的非 static 祖先元素（即 .box）进行定位。
      在这里，它使用 bottom: 0 和 left: 0 来定位，
      这意味着 .mask 会紧贴在 .box 的底部，并且左侧对齐。
      */
      position: absolute;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, .2); /* 半透明效果 */
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10rpx); /* 模糊效果 */
      font-weight: 600;
      font-size: 30rpx;
    }
    .tab{
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(250, 129, 90, 0.7);
      backdrop-filter: blur(10rpx);
      color: white;
      font-size: 22rpx;
      padding: 6rpx 14rpx;
      border-radius: 0 0 20rpx 0;
      /* 如果文字还要更小 */
      //transform: scale(0.8);
      //transform-origin: left;
    }
  }
}
</style>
