<!-- word模板预览页 -->
<template>
  <div class="word-preview-box">
    <div class="content-box">
      <!-- 图片预览区域 -->
      <div class="left">
        <!-- 图片列表 -->
        <div class="img-list-box">
          <ClientOnly>
            <ElScrollbar trigger="hover" style="height: 600px">
              <div v-for="(item, index) in wordInfo.preview_url" :key="index"
                :class="['img-item-box', { active: currentIndex === index }]" @click="selectPreUrl(item, index)">
                <el-image style="width: 150px; height: 200px" :src="item" fit />
              </div>
            </ElScrollbar>
          </ClientOnly>
        </div>
        <!-- 图片大图展示 -->
        <div class="img-big-preview">
          <div class="big-img-box">
            <el-image style="width: 400px; height: 550px" :src="bigPreviewUrl" fit />
          </div>
        </div>
      </div>
      <!-- 模板信息介绍页 -->
      <div class="right">
        <!-- 操作区 -->
        <div class="top">
          <h1>{{ wordInfo.name }}</h1>
          <div class="download-btn">
            <div class="button" @click="download">
              <!-- 先判断是否是会员 -->
              <template v-if="!membershipInfo.hasMembership || membershipInfo.isExpired">
                <div v-if="!isPay" class="how-much">{{ Math.abs(wordInfo.payValue) || ''
                  }}<img width="20" src="@/assets/images/jianB.png" alt="简币" /></div>
              </template>
              <span>立即下载</span>
            </div>
          </div>
          <div class="views-downs-box">
            <div class="icon-box">
              <SvgIcon icon-name="icon-xiazailiang" color="#a3abb1" size="22px"></SvgIcon>
              <span class="number downloads">{{ wordInfo.downloads }}</span>
            </div>
            <div class="icon-box">
              <SvgIcon icon-name="icon-liulanliang1" color="#a3abb1" size="22px"></SvgIcon>
              <span class="number">{{ wordInfo.views }}</span>
            </div>
          </div>
        </div>
        <!-- 详细信息展示区 -->
        <div class="info-box">
          <h1>简历信息</h1>
          <div class="profile-box">
            <span class="label">简介</span>
            <p>{{ wordInfo.profile }}</p>
          </div>
          <div class="profile-box">
            <span class="label">分类</span>
            <p v-for="(item, index) in wordInfo.category" :key="index" class="category">{{
              getCategoryLabel(item)
            }}</p>
          </div>
          <div class="profile-box">
            <span class="label">标签</span>
            <p v-for="(item, index) in wordInfo.tags" :key="index" class="category">{{ item }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-box">
      <!-- 轮播图 -->
      <word-carousel v-if="wordInfo.preview_url" :preview-url-list="wordInfo.preview_url"></word-carousel>
    </div>

    <!-- 下载警告弹窗 -->
    <pay-integral-dialog :dialog-get-integral-visible="dialogGetIntegralVisible" :title="`确定消费简币下载模板？只需一次支付，即可多次下载！`"
      btn-text="确认下载" :confirm-disabled="confirmDisabled" :confirm-tip="confirmTip" @cancle="cancleDialog"
      @confirm="confirmDialog"></pay-integral-dialog>

    <!-- 回到顶部 -->
    <el-backtop :right="50" :bottom="80" />
  </div>
</template>
<script lang="ts" setup>
import WordCarousel from '@/components/word/WordCarousel.vue';
import {
  getWordTemplateInfoAsync,
  wordDownloadUrl
} from '~/composables/api/wordTemplate';
import { downloadFileUtil } from '@/utils/common';
import { useUserIsPayGoods } from '~/composables/useUsrIsPayGoods';
import { storeToRefs } from 'pinia';
import { useMembershipStore } from '~/store/membership';
import { ElMessage } from 'element-plus';
import { useUserInfoStore } from '~/store/user';
import { useWordCategories } from '~/composables/words';

// 获取用户会员信息
const { membershipInfo } = storeToRefs(useMembershipStore());

// 获取word模板id
const route = useRoute();
const id = route.params.id;
const currentIndex = ref<number>(-1); // 选中哪一张预览图

// 查询模板详细信息
const wordInfo = ref<any>([]);
const getWordTemplateInfo = async () => {
  const data = await getWordTemplateInfoAsync(id);
  wordInfo.value = data;
  bigPreviewUrl.value = wordInfo.value.preview_url[0];
  currentIndex.value = 0;
  // 设置seo
  useHead({
    title: wordInfo.value.name
  });

};
getWordTemplateInfo();

// 查询word模板分类列表
const {categories } = useWordCategories();

// 返回分类名称
const getCategoryLabel = (id: string) => {
  console.log('categories', categories);
  if (categories.value) {
    return categories.value.find((item: any) => item.id === id)?.name;
  }
};

// 图片预览大图
const bigPreviewUrl = ref<string>('');
// 点击预览图
const selectPreUrl = (item: any, index: number) => {
  bigPreviewUrl.value = item.url;
  currentIndex.value = index;
};

// 查询用户是否消费过该资源
const isPay = ref<any>(false);
onMounted(async () => {
  isPay.value = await useUserIsPayGoods(id);
});

// 点击立即下载
const dialogGetIntegralVisible = ref<boolean>(false);
const confirmDisabled = ref<boolean>(false);
const confirmTip = ref<string>('');
const download = async () => {
  // 会员直接下载
  if (membershipInfo.value.hasMembership && !membershipInfo.value.isExpired) {
    downloadTemplate();
    return;
  }
  // 判断用户是否支付过
  if (isPay.value) {
    downloadTemplate();
  } else {
    // 判断当前用户简币是否充足
    const userIntegralTotal = useUserInfoStore().userIntegralInfo.integralTotal;
    if (userIntegralTotal < Math.abs(wordInfo.value.payValue)) {
      confirmDisabled.value = true;
      dialogGetIntegralVisible.value = true;
      confirmTip.value = '您的简币数量不足！';
      return;
    } else {
      confirmTip.value = '';
      dialogGetIntegralVisible.value = true;
    }
  }

};

// 关闭弹窗
const cancleDialog = () => {
  dialogGetIntegralVisible.value = false;
};

// 下载弹窗确认
const confirmDialog = () => {
  dialogGetIntegralVisible.value = false;
  downloadTemplate();
};

// 下载文件
const downloadTemplate = async () => {
  const data = await wordDownloadUrl(id);
    ElMessage.success('即将开始下载');
    let url = data[0];
    downloadFileUtil(url);
    isPay.value = await useUserIsPayGoods(id); // 更新用户是否支付过的状态
};
</script>
<style lang="scss" scoped>
.word-preview-box {
  width: 100%;
  font-family: '微软雅黑';

  .content-box {
    margin: 0 auto;
    min-height: 500px;
    padding: 20px 0;
    width: 1200px;
    display: flex;

    .left {
      display: flex;
      justify-content: space-between;

      .img-list-box {
        width: 160px;
        max-height: 600px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        .img-item-box {
          height: 202px;
          width: 152px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: all 0.3s;
          border: 1px solid transparent;
          border-radius: 5px;
          overflow: hidden;

          &:hover {
            border: 1px solid #5b3562;
          }
        }

        .active {
          border: 1px solid #5b3562;
        }
      }

      .img-big-preview {
        margin-left: 30px;

        .big-img-box {
          background: #e7e7e7;
          padding: 24px 21px;
          border-radius: 3px;
        }
      }
    }

    .right {
      flex: 1;
      margin-left: 30px;
      display: flex;
      flex-direction: column;

      .top {
        height: 220px;
        width: 100%;
        background-color: #fff;
        margin-bottom: 20px;
        padding: 20px 30px 0 20px;
        display: flex;
        flex-direction: column;

        h1 {
          font-size: 22px;
          margin-bottom: 30px;
          text-align: justify;
          line-height: 1.5;
        }

        .download-btn {
          .button {
            width: 50%;
            height: 38px;
            margin-right: 20px;
            line-height: 38px;
            text-align: center;
            letter-spacing: 2px;
            color: #fff;
            font-size: 14px;
            background-image: -webkit-linear-gradient(to right, #2ddd9d, #1cc7cf);
            background-image: -moz-linear-gradient(to right, #2ddd9d, #1cc7cf);
            background-image: -ms-linear-gradient(to right, #2ddd9d, #1cc7cf);
            background-image: linear-gradient(to right, #2ddd9d, #1cc7cf);
            -webkit-border-radius: 50px;
            -moz-border-radius: 50px;
            border-radius: 50px;
            background-color: #2ddd9d;
            -webkit-transition: all 0.3s;
            -moz-transition: all 0.3s;
            -ms-transition: all 0.3s;
            -o-transition: all 0.3s;
            transition: all 0.3s;
            cursor: pointer;
            user-select: none;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
              opacity: 0.8;
            }

            .how-much {
              display: flex;
              align-items: center;
              margin-right: 5px;

              img {
                margin: 0 5px;
              }
            }
          }
        }

        .views-downs-box {
          margin-top: 50px;
          border-top: 1px solid #eee;
          flex: 1;
          color: #b2bcc3;
          display: flex;
          align-items: center;

          .icon-box {
            margin-right: 30px;
            display: flex;
            align-items: center;

            .number {
              padding-top: 1px;
              font-size: 18px;
              margin-left: 10px;
            }

            .downloads {
              margin-left: 6px;
              font-size: 18px;
            }
          }
        }
      }

      .info-box {
        width: 100%;
        background-color: #fff;
        padding: 20px 30px 20px 20px;
        display: flex;
        flex-direction: column;

        h1 {
          font-size: 16px;
          color: #515151;
          padding-bottom: 22px;
          border-bottom: 1px solid #ebebeb;
        }

        .profile-box {
          display: flex;
          margin: 10px 0;

          span {
            font-size: 14px;
            color: #555;
            margin-right: 15px;
          }

          p {
            font-size: 14px;
            color: #999999;
            padding: 0 15px;
          }

          .category {
            border-right: 1px solid #eee;
          }
        }
      }
    }
  }

  .bottom-box {
    margin: 30px auto;
    min-height: 500px;
    padding: 20px 0;
    width: 1200px;
    display: flex;
    background-color: #fff;
    display: flex;
  }
}
</style>
