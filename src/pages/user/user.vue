<template>
  <view class="userLayout pageBg">
    <view :style="{height: getNavBarHeight() + 'px'}"></view>
    <view class="userInfo">
      <view class="avatar">
        <image mode="aspectFill" src="../../static/images/xxmLogo.png"></image>
      </view>
      <view class="ip">{{ userInfo.IP }}</view>
      <!--      这里使用了可选链操作符?.来确保在address存在时才去访问其属性-->
      <view class="address">来自于:
        {{ userInfo.address?.city || userInfo.address?.province || userInfo.address?.country }}
      </view>
    </view>

    <view class="section">
      <view class="list">
        <!--        我的下载-->
        <view class="row">
          <view class="left">
            <uni-icons size="20" type="download-filled"></uni-icons>
            <view class="text">我的下载</view>
          </view>
          <view class="right">
            <view class="text">{{ userInfo.downloadSize }}</view>
            <uni-icons color="#aaa" size="15" type="right"></uni-icons>
          </view>
        </view>
        <!--        我的评分-->
        <view class="row">
          <view class="left">
            <uni-icons size="20" type="star-filled"></uni-icons>
            <view class="text">我的评分</view>
          </view>
          <view class="right">
            <view class="text">{{ userInfo.scoreSize }}</view>
            <uni-icons color="#aaa" size="15" type="right"></uni-icons>
          </view>
        </view>
        <!--        联系客服-->
        <view class="row">
          <view class="left">
            <uni-icons size="20" type="contact"></uni-icons>
            <view class="text">联系客服</view>
          </view>
          <view class="right">
            <uni-icons color="#aaa" size="15" type="right"></uni-icons>
          </view>
          <!-- #ifdef MP -->
          <button open-type="contact"></button> <!--联系微信客服-->
          <!-- #endif -->
          <!-- #ifdef H5 -->
          <button @click="clickContact"></button> <!--拨打电话-->
          <!-- #endif -->
        </view>
      </view>
    </view>

    <view class="section">
      <view class="list">
        <navigator v-for="(item, index) in 2 " :key="index" class="row" url="../classify-list/classify-list">
          <view class="left">
            <uni-icons size="20" type="download-filled"></uni-icons>
            <view class="text">我的下载</view>
          </view>
          <view class="right">
            <view class="text">33</view>
            <uni-icons color="#aaa" size="15" type="right"></uni-icons>
          </view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>

import {getNavBarHeight} from "@/utils/system";
import {apiGetUserInfo} from "@/api/api";
import {reactive} from "vue";

uni.showLoading()
getUserInfo()
uni.hideLoading()

const userInfo = reactive({} as UserInfoData)

function clickContact() {
  uni.makePhoneCall({
    phoneNumber: '19070484090'
  })
}

async function getUserInfo() {
  let res = await apiGetUserInfo();
  Object.assign(userInfo, res.data)
}
</script>


<style lang="scss" scoped>
.userLayout {
  .userInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50rpx 0;

    .avatar {
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
      overflow: hidden;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .ip {
      font-size: 44rpx;
      color: #333;
      padding: 20rpx 0 5rpx;
    }

    .address {
      font-size: 28rpx;
      color: #aaa;
    }
  }

  .section {
    width: 690rpx;
    margin: 50rpx auto; /* 上下50, 左右居中 */
    border: 1px solid #eee;
    border-radius: 10rpx;
    box-shadow: 0 0 30rpx rgba(0, 0, 0, .05);

    .list {
      .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30rpx;
        height: 100rpx;
        background-color: white;
        border-bottom: 1px solid #eee;
        position: relative;
        /* 最后一个不要有边框, 因为父级有边框, 会导致两个边框出现在底部 */
        &:last-child {
          border-bottom: 0
        }

        .left {
          display: flex;
          justify-content: center;
          align-items: center;

          .text {
            padding-left: 20rpx;
            color: #666;
          }

          :deep(.uni-icons) {
            color: $brand-theme-color !important;
          }
        }

        .right {
          display: flex;
          justify-content: center;
          align-items: center;

          .text {
            padding-left: 20rpx;
            font-size: 28rpx;
            color: #aaa;
          }
        }

        button {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          //background: rgba(1, 1, 1, 0); /* 这种透明效果会有黑边 */
          opacity: 0; /* 透明 */
        }
      }
    }
  }
}
</style>
