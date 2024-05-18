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
        <view class="box" @click="clickInfo">
          <uni-icons type="info" size="28"></uni-icons>
          <view class="text">信息</view>
        </view>

        <view class="box" @click="clickScore">
          <uni-icons type="star" size="28"></uni-icons>
          <view class="text">5分</view>
        </view>

        <view class="box">
          <uni-icons type="download" size="28"></uni-icons>
          <view class="text">下载</view>
        </view>
      </view>
    </view>

<!--    信息弹窗-->
    <uni-popup ref="infoPopup" type="bottom">
      <view class="infoPopup">
        <view class="popHeader">
          <view></view> <!--空盒子, 为了平均分布-->
          <view class="title">壁纸信息</view>
          <view class="close" @click="clickInfoClose">
            <uni-icons type="closeempty" size="18"></uni-icons>
          </view>
        </view>
        <scroll-view scroll-y>
          <view class="content">
            <view class="row">
              <view class="label">壁纸ID: </view>
              <text selectable class="value">test</text>
            </view>

            <view class="row">
              <view class="label">分类: </view>
              <text selectable class="value classify">test</text>
            </view>

            <view class="row">
              <view class="label">发布者: </view>
              <text selectable class="value">test</text>
            </view>

            <view class="row">
              <view class="label">评分: </view>
              <view class="value roteBox">
                <uni-rate readonly v-model="userScore" size="16"/>
                <text class="score">{{ userScore }}分</text>
              </view>
            </view>

            <view class="row">
              <view class="label">摘要: </view>
              <text selectable class="value">
                摘要文字内容填充部分 摘要文字内容填充部分 摘要文字内容填充部分 摘要文字内容填充部分 摘要文字内容填充部分 摘要文字内容填充部分 摘要文字内容填充部分
              </text>
            </view>

            <view class="row">
              <view class="label">标签: </view>
              <view class="value tabs">
                <view class="tab" v-for="item in 3">标签{{item}}</view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </uni-popup>

<!--    评分弹窗-->
    <uni-popup ref="scorePopup" :is-mask-click="false">
      <view class="scorePopup">
        <view class="popHeader">
          <view></view> <!--空盒子, 为了平均分布-->
          <view class="title">壁纸评分</view>
          <view class="close" @click="clickScoreClose">
            <uni-icons type="closeempty" size="18"></uni-icons>
          </view>
        </view>

        <view class="content">
          <uni-rate v-model="userScore" allowHalf></uni-rate>
          <text class="text">{{ userScore }}分</text>
        </view>

        <view class="footer">
          <button @click="submitScore" :disabled="!userScore" type="default" size="mini" plain> 确认评分 </button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import {ref} from "vue";

const maskState = ref(true)
const userScore = ref(0) /* 壁纸评分 */
const infoPopup = ref() /* 必须与标签上的ref名保持一致 */
const scorePopup = ref() /* 必须与标签上的ref名保持一致 */

/**
 * 提交评分
 */
function submitScore() {
  console.log("评分了")
}

/**
 * 开启评分弹窗
 */
function clickScore() {
  scorePopup.value.open()
}

/**
 * 关闭评分弹窗
 */
function clickScoreClose() {
  scorePopup.value.close()
}

/**
 * 关闭图片信息
 */
function clickInfoClose() {
  infoPopup.value.close()
}

/**
 * 查看图片信息
 */
function clickInfo() {
  infoPopup.value.open()
}

/**
 * 开关遮罩状态
 */
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

  .popHeader{
    display: flex;
    justify-content: space-between; /* 这里利用了空盒子来布局 */
    align-items: center;
    .title{
      color: $text-font-color-2;
      font-size: 26rpx;
    }
    .close{
      padding: 6rpx 6rpx;
    }
  }

  .infoPopup{
    background: #fff;
    padding: 30rpx;
    border-radius: 30rpx 30rpx 0 0;
    overflow: hidden;

    scroll-view{
      max-height: 60vh; /* 限制最大高度, 防止元素过多超出屏幕 */
      .content{
        .row{
          display: flex;
          padding: 16rpx 0;
          font-size: 32rpx;
          line-height: 1.7em;
          .label{
            color: $text-font-color-3;
            width: 140rpx;
            text-align: right; /* 文本右对齐 */
          }
          .value{
            /*
            在 Flexbox 布局中，设置 flex: 1 的元素会尝试占据尽可能多的空间。
            如果没有明确的宽度限制，元素的内容可能会导致其他元素被挤压。
            这时，设置 width: 0 可以确保元素的宽度仅根据 flex 属性来计算，
              而不是内容的固有宽度。
            */
            flex: 1;
            width: 0; /* 防止内容过多, 挤压label */
            padding-left: 10rpx;
          }
          .roteBox{
            display: flex;
            align-items: center;
            .score{
              font-size: 26rpx;
              color: $text-font-color-2;
              padding-left: 10rpx;
            }
          }
          .tabs{
            display: flex;
            flex-wrap: wrap;
            .tab{
              border: 1px solid $brand-theme-color;
              color: $brand-theme-color;
              font-size: 22rpx;
              padding: 10rpx 30rpx;
              border-radius: 40rpx;
              line-height: 1em;
              margin: 0 10rpx 10rpx 0;
            }
          }
          .classify{
            color: $brand-theme-color;
          }
        }
      }
    }
  }

  .scorePopup{
    background: #fff;
    padding: 30rpx;
    width: 70vw;
    border-radius: 30rpx;
    .content{
      padding: 30rpx 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .text{
        color: #ffca3e;
        font-size: 32rpx;
        padding-left: 10rpx;
        width: 80rpx;
        line-height: 1em;
        text-align: right;
      }
    }
    .footer{
      padding: 10rpx 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
