<template>
  <view class="classifyLayout pageBg">
    <custom-nav-bar title="分类"></custom-nav-bar>
    <view class="classify">
      <theme-item v-for="item in 15"></theme-item>
    </view>
  </view>
</template>

<script setup lang="ts">

</script>


<style scoped lang="scss">
.classifyLayout{
  .classify{
    padding: 30rpx;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
