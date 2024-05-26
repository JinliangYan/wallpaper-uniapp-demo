<template>
  <view class="noticeLayout">
    <view class="title">
      <view class="tag" v-if="detail.select">
        <uni-tag inverted text="置顶" type="error"></uni-tag>
      </view>
      <view class="font">{{ detail.title }}</view>
    </view>

    <view class="info">
      <view class="item">{{ detail.author }}</view>
      <view class="item">
        <uni-dateformat :date="detail.publish_date" format="yyyy-MM-dd hh:mm:ss "></uni-dateformat>
      </view>
    </view>

    <view class="content">
      <mp-html :content="detail.content"></mp-html>
    </view>

    <view class="count">
      阅读 {{ detail.view_count }}
    </view>
  </view>
</template>

<script lang="ts" setup>
import {apiGetNoticeDetail} from "@/api/api";
import {onLoad} from "@dcloudio/uni-app";
import {reactive, ref} from "vue";
import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html'

const detail = reactive({} as NewsDetailData)
const article_status = ref()

onLoad((e: { id: string }) => {
  getNoticeDetail(e.id);
})

async function getNoticeDetail(id: string) {
  try {
    let res = await apiGetNoticeDetail({id})
    Object.assign(detail, res.data)
    article_status.value = detail.article_status ? "发布" : "草稿"
  } catch (e) {
    await uni.showToast({
      title: "出错了~",
      icon: "error"
    })
  }
}
</script>


<style lang="scss" scoped>
.noticeLayout {
  padding: 30rpx;

  .title {
    font-size: 40rpx;
    color: #111;
    line-height: 1.6em;
    padding-bottom: 30rpx;
    display: flex;

    .tag {
      transform: scale(0.8);
      transform-origin: left center;
      flex-shrink: 0;
    }

    .font {
      padding-left: 6rpx;
    }
  }

  .info {
    display: flex;
    align-items: center;
    color: #999;
    font-size: 28rpx;

    .item {
      padding-left: 20rpx;
    }
  }

  .content {
    padding: 50rpx 0;
  }

  .count {
    color: #999;
    font-size: 28rpx;
  }
}
</style>
