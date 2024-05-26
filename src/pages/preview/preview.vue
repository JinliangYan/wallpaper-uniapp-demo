<template>
  <view class="preview" v-if="currentItem.currentInfo != {}">
    <!--suppress TypeScriptValidateTypes -->
    <swiper :current="currentItem.currentIndex" circular @change="swiperChange">
      <!--      减少网络消耗-->
      <swiper-item v-for="(item, index) in state.classList" :key="item._id">
        <image v-if="state.readImgs.has(index)" :src="item.picurl" mode="aspectFill" @click="maskChange"></image>
      </swiper-item>
    </swiper>

    <view v-if="state.maskState" class="mask">
      <view :style="{top: getStatusBarHeight() + 'px'}" class="goBack" @click="goBack">
        <uni-icons color="white" size="28" type="back"></uni-icons>
      </view>
      <view class="count">{{ currentItem.currentIndex + 1 }} / {{ state.classList.length }}</view>
      <view class="time">
        <uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
      </view>
      <view class="date">
        <uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
      </view>
      <view class="footer">
        <view class="box" @click="clickInfo">
          <uni-icons size="28" type="info"></uni-icons>
          <view class="text">信息</view>
        </view>

        <view class="box" @click="clickScore">
          <uni-icons v-if="state.isScored" size="28" type="star-filled"></uni-icons>
          <uni-icons v-else size="28" type="star"></uni-icons>
          <view class="text">{{ currentItem.currentInfo.score }}分</view>
        </view>

        <view class="box" @click="clickDownload">
          <uni-icons size="28" type="download"></uni-icons>
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
            <uni-icons size="18" type="closeempty"></uni-icons>
          </view>
        </view>
        <scroll-view scroll-y>
          <view class="content">
            <view class="row">
              <view class="label">壁纸ID:</view>
              <text class="value" selectable>{{ currentItem.currentId }}</text>
            </view>

            <!--
                        <view class="row">
                          <view class="label">分类:</view>
                          <text class="value classify" selectable>test</text>
                        </view>
            -->

            <view class="row">
              <view class="label">发布者:</view>
              <text class="value" selectable>{{ currentItem.currentInfo.nickname }}</text>
            </view>

            <view class="row">
              <view class="label">评分:</view>
              <view class="value roteBox">
                <uni-rate readonly touchable :value="currentItem.currentInfo.score" size="16"/>
                <text class="score">{{ currentItem.currentInfo.score }}分</text>
              </view>
            </view>

            <view class="row">
              <view class="label">摘要:</view>
              <text class="value" selectable>
                {{ currentItem.currentInfo.description }}
              </text>
            </view>

            <view class="row">
              <view class="label">标签:</view>
              <view class="value tabs">
                <view v-for="(tab, index) in currentItem.currentInfo.tabs" :key="index" class="tab">
                  {{ tab }}
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
        <!--        安全区域-->
        <view class="safe-area-inset-bottom"></view>
      </view>
    </uni-popup>

    <!--    评分弹窗-->
    <uni-popup ref="scorePopup" :is-mask-click="false">
      <view class="scorePopup">
        <view class="popHeader">
          <view></view> <!--空盒子, 为了平均分布-->
          <view class="title">{{ state.isScored ? "已经评分过了~" : "壁纸评分" }}</view>
          <view class="close" @click="clickScoreClose">
            <uni-icons size="18" type="closeempty"></uni-icons>
          </view>
        </view>

        <view class="content">
          <uni-rate :readonly="state.isScored" v-model="userScore"
                    allowHalf></uni-rate>
          <text class="text">{{ userScore }}分</text>
        </view>

        <view class="footer">
          <!--suppress TypeScriptValidateTypes -->
          <button :disabled="!userScore || state.isScored" plain size="mini" type="default" @click="submitScore">
            确认评分
          </button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import {computed, reactive, ref} from "vue";
import {getStatusBarHeight} from "@/utils/system";
import {onLoad, onShareAppMessage, onShareTimeline} from "@dcloudio/uni-app";
import {apiDetailWall, apiDownload, apiRating} from "@/api/api";

const infoPopup = ref() /* 必须与标签上的ref名保持一致 */
const scorePopup = ref() /* 必须与标签上的ref名保持一致 */

const state = reactive({
  maskState: true,
  userScore: 0,
  classList: [],
  readImgs: new Set<number>(),
  isScored: false
});

const currentItem = reactive({
  currentInfo: {} as WallpaperDetailData,
  currentId: "",
  currentIndex: 0,
})

const userScore = computed({
  get() {
    /* 如果评分过, 取服务器上用户评分 */
    if (currentItem.currentInfo.userScore != undefined) {
      state.isScored = true
      return currentItem.currentInfo.userScore
    }
    /* 如果没有评分过, 取用户当前选择的评分 */
    state.isScored = false
    return state.userScore
  },
  set(value: number) {
    if (currentItem.currentInfo.userScore == undefined) {
      state.userScore = value;
    }
  }
});


onLoad(async (onLoad: { type, id }) => {
  currentItem.currentId = onLoad.id
  /* 如果使用户从分享页面进入, 用户是没有缓存信息的, 这里从服务器获取信息 */
  if (onLoad.type == "share") {
    let res = await apiDetailWall({id: currentItem.currentId})
    state.classList = res.data.map((item) => {
      return {
        /* 展开item */
        ...item,
        /* 追加picurl属性 (大图url) */
        picurl: item.smallPicurl.replace("_small.webp", ".jpg"),
      }
    })
  }

  currentItem.currentIndex = state.classList.findIndex(
      (item) => item._id == currentItem.currentId
  )
  // Object.assign(currentItem.currentInfo, state.classList[currentItem.currentIndex])
  currentItem.currentInfo = state.classList[currentItem.currentIndex]
  preLoad()
})


/* 用 `|| []` 返回一个空数组, 防止map报错 */
const storageClassList = uni.getStorageSync("storageClassList") || [];
/* 拿出缓存数据, 在属性中增加picurl, 并赋值给classList */
state.classList = storageClassList.map(item => {
  return {
    /* 展开item */
    ...item,
    /* 追加picurl属性 (大图url) */
    picurl: item.smallPicurl.replace("_small.webp", ".jpg"),
  }
})

/**
 * 图片预加载, 使用户查看图片详情更丝滑
 */
function preLoad() {
  const previousIndex = currentItem.currentIndex <= 0 ? state.classList.length - 1 : currentItem.currentIndex - 1;
  const nextIndex = currentItem.currentIndex >= state.classList.length - 1 ? 0 : currentItem.currentIndex + 1;

  // 使用 Set 来确保索引的唯一性
  state.readImgs.add(previousIndex);
  state.readImgs.add(currentItem.currentIndex);
  state.readImgs.add(nextIndex);
}

/**
 * Swiper 滑动事件
 * 将页面显示的 index 改为当前的实际 index
 * @param e
 */
function swiperChange(e) {
  currentItem.currentIndex = e.detail.current
  currentItem.currentInfo = state.classList[currentItem.currentIndex]
  preLoad()
}

/**
 * 提交评分
 */
async function submitScore() {
  await uni.showLoading({
    title: "加载中..."
  })
  let {classid, _id: wallId} = currentItem.currentInfo;
  let res = await apiRating({classid, wallId, userScore: state.userScore.toString()})
  uni.hideLoading();
  if (res.errCode == 0) {
    await uni.showToast({
      title: "评分成功",
      icon: "none",
    })
    state.classList[currentItem.currentIndex].userScore = state.userScore
    currentItem.currentInfo = state.classList[currentItem.currentIndex]
    uni.setStorageSync("storageClassList", state.classList)
    clickScoreClose()
  }
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
  state.userScore = 0
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
  state.maskState = !state.maskState
}

/**
 * 返回上一页
 */
async function goBack() {
  try {
    await uni.navigateBack();
  } catch (error) {
    /* 回退失败返回主页, 解决分享页面进入返回无效问题 */
    await uni.reLaunch({
      url: "/pages/index/index"
    });
  }
}


/**
 * 点击下载
 */
async function clickDownload() {
  // #ifdef H5
  await uni.showModal({
        content: "请长按保存壁纸",
        showCancel: false
      }
  )
  // #endif

  // #ifdef MP
  try {
    let imageInfoSuccessData = await uni.getImageInfo({
      src: currentItem.currentInfo.picurl || "",
    })

    await uni.showLoading({
      title: "下载中",
      mask: true
    })

    let {classid, _id: wallId} = currentItem.currentInfo
    await apiDownload({
      classid,
      wallId
    })

    await uni.saveImageToPhotosAlbum({
      filePath: imageInfoSuccessData.path
    })
    uni.hideLoading()
    await uni.showToast({
      title: "保存成功",
      icon: "none"
    })
  } catch (err) {
    uni.hideLoading()
    if (err.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
      let res = await uni.showModal({
        title: "提示",
        content: "需要授权保存到相册"
      })
      if (res.confirm) {
        let setting = await uni.openSetting();
        if (setting.authSetting['scope.writePhotosAlbum']) {
          await uni.showToast({
            title: "获取授权成功",
            icon: "none"
          })
        } else {
          await uni.showToast({
            title: "获取授权失败",
            icon: "none"
          })
        }
      }
    } else {
      await uni.showToast({
        title: "保存失败",
        icon: "error"
      })
    }
  }

  // #endif
}

/**
 * 分享给好友
 */
onShareAppMessage((e) => {
  return {
    title: "丁丁壁纸",
    path: `pages/preview/preview?id=${currentItem.currentId}&type=share`
  }
})

/**
 * 分享到朋友圈
 */
onShareTimeline(() => {
  return {
    title: "丁丁壁纸",
    query: `id=${currentItem.currentId}&type=share`
    // imageUrl: "https://cdn-icons-png.freepik.com/256/6364/6364002.png?semt=ais_hybrid"
    // path: "pages/index/index"
  }
})
</script>


<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 100vh;
  position: relative;

  swiper {
    width: 100%;
    height: 100%;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .mask {
    /* 父级紧邻的view */
    & > view {
      position: absolute;
      /* 一个absolute定位布局居中的方式 */
      left: 0;
      right: 0;
      margin: auto;

      color: #fff;
      width: fit-content; /* 自适应宽度, 有多少内容就有多宽 */
    }

    .goBack {
      width: 38px;
      height: 38px;
      background: rgba(0, 0, 0, .5);
      left: 30rpx;
      margin-left: 0;
      border-radius: 100px;
      top: 0;
      backdrop-filter: blur(10px);
      border: 1rpx solid rgba(255, 255, 255, .3);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .count {
      top: 10vh;
      background: rgba(0, 0, 0, .3);
      font-size: 28rpx;
      border-radius: 40rpx;
      padding: 8rpx 28rpx;
      backdrop-filter: blur(10rpx);
    }

    .time {
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

    .date {
      font-size: 34rpx;
      top: calc(10vh + 230rpx);
      text-shadow: 0 2rpx rgba(0, 0, 0, .3);
    }

    .footer {
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

      .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* 利用padding */
        padding: 2rpx 12rpx;

        .text {
          font-size: 26rpx;
          color: $text-font-color-2;
        }
      }
    }
  }

  .popHeader {
    display: flex;
    justify-content: space-between; /* 这里利用了空盒子来布局 */
    align-items: center;

    .title {
      color: $text-font-color-2;
      font-size: 26rpx;
    }

    .close {
      padding: 6rpx 6rpx;
    }
  }

  .infoPopup {
    background: #fff;
    padding: 30rpx;
    border-radius: 30rpx 30rpx 0 0;
    overflow: hidden;

    scroll-view {
      max-height: 60vh; /* 限制最大高度, 防止元素过多超出屏幕 */
      .content {
        .row {
          display: flex;
          padding: 16rpx 0;
          font-size: 32rpx;
          line-height: 1.7em;

          .label {
            color: $text-font-color-3;
            width: 140rpx;
            text-align: right; /* 文本右对齐 */
          }

          .value {
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

          .roteBox {
            display: flex;
            align-items: center;

            .score {
              font-size: 26rpx;
              color: $text-font-color-2;
              padding-left: 10rpx;
            }
          }

          .tabs {
            display: flex;
            flex-wrap: wrap;

            .tab {
              border: 1px solid $brand-theme-color;
              color: $brand-theme-color;
              font-size: 22rpx;
              padding: 10rpx 30rpx;
              border-radius: 40rpx;
              line-height: 1em;
              margin: 0 10rpx 10rpx 0;
            }
          }

          .classify {
            color: $brand-theme-color;
          }
        }
      }
    }
  }

  .scorePopup {
    background: #fff;
    padding: 30rpx;
    width: 70vw;
    border-radius: 30rpx;

    .content {
      padding: 30rpx 0;
      display: flex;
      align-items: center;
      justify-content: center;

      .text {
        color: #ffca3e;
        font-size: 32rpx;
        padding-left: 10rpx;
        width: 80rpx;
        line-height: 1em;
        text-align: right;
      }
    }

    .footer {
      padding: 10rpx 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
