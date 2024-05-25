<!--suppress TypeScriptValidateTypes -->
<template>
  <view class="themeItem">
    <navigator
        v-if="!isMore"
        :url="'../classify-list/classify-list?id='+item._id+'&name='+item.name"
        class="box">
      <image :src="item.picurl" class="pic" mode="aspectFill"></image>
      <view class="mask">{{ item.name }}</view>
      <view class="tab">{{ timeDiffDisplay(item.updateTime) }}前更新</view>
    </navigator>

    <navigator v-else class="box more" open-type="switchTab" url="../classify/classify">
      <image class="pic" mode="aspectFill" src="../../common/images/more.jpg"></image>
      <view class="mask">
        <uni-icons color="white" size="34" type="more-filled"></uni-icons>
        <view class="text">更多</view>
      </view>
    </navigator>
  </view>
</template>

<script lang="ts" setup>
import {timeDiffDisplay} from "@/utils/common";

/* 定义 props 的类型 */
interface Props {
  isMore?: boolean;
  item?: WallpaperCategoryData;
}

/* 设置默认值 */
const props = withDefaults(defineProps<Props>(), {
  isMore: false,
  item: {
    _id: "",
    name: "默认名称",
    picurl: "../../common/images/classify1.jpg",
    updateTime: Date.now() - 1000 * 60 * 60 * 5,
  }
});
</script>


<style lang="scss" scoped>
.themeItem {
  .box {
    margin: 5rpx;
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

    .pic {
      /* 图片有默认宽高, 这里要图片继承父级宽高 */
      width: 100%;
      height: 100%;
    }

    .mask {
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

    .tab {
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

  /* 继承了box的样式, 并在more上设置专属的样式 */
  .box.more {
    .mask {
      width: 100%;
      height: 100%;
      flex-direction: column; /* 设置flex的方向为纵向 */
    }

    .text {
      font-size: 28rpx;
    }
  }
}
</style>
