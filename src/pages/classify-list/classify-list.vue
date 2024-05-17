<template>
  <view class="classify-list">
    <view class="content">
      <navigator url="" class="item" v-for="item in 10">
        <image src="../../common/images/preview2.jpg" mode="aspectFill"></image>
      </navigator>
    </view>
  </view>
</template>

<script setup lang="ts">

</script>


<style scoped lang="scss">
.classify-list{
  .content{
    padding: 5rpx;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rpx;
    .item{
      height: 440rpx;
      image{
        width: 100%;
        height: 100%;
        display: block; /* 将图像转为块元素 */
      }
    }
  }
}
</style>
