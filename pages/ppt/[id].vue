<!-- ppt模板预览页 -->
<template>
  <div class="ppt-preview-box">
    <div class="content-box">
      <!-- 图片预览区域 -->
      <div class="left">
        <!-- 图片大图展示 -->
        <div class="img-big-preview">
          <div class="big-img-box">
            <el-image style="width: 100%; height: 440px" :src="ppt?.preview_url[0]" fit />
          </div>
        </div>
        <!-- 图片列表 -->
        <div class="img-list-box">
          <ClientOnly>
            <ElScrollbar ref="scrollbarRef" trigger="hover" style="width: 800px">
              <div v-for="(item, index) in ppt?.preview_url" :key="index"
                :class="['img-item-box', { active: currentIndex === index }]"
                @click="selectPreUrl($event, item, index)">
                <el-image style="width: 160px; height: 90px" :src="item" fit />
              </div>
            </ElScrollbar>
          </ClientOnly>
        </div>
      </div>
      <!-- 模板信息介绍页 -->
      <div class="right">
        <!-- 操作区 -->
        <div class="top">
          <h1>{{ ppt?.name }}</h1>
          <div class="download-btn">
            <div class="button" @click="download">
              <span>立即下载</span>
            </div>
          </div>
          <div class="views-downs-box">
            <div class="icon-box">
              <svg-icon icon-name="icon-xiazailiang" color="#a3abb1" size="22px"></svg-icon>
              <span class="downloads">{{ ppt?.downloads }}</span>
            </div>
            <div class="icon-box">
              <svg-icon icon-name="icon-liulanliang1" color="#a3abb1" size="22px"></svg-icon>
              <span class="number">{{ ppt?.views }}</span>
            </div>
          </div>
        </div>
        <!-- 详细信息展示区 -->
        <div class="info-box">
          <h1>简历信息</h1>
          <div class="profile-box">
            <span class="label">简介</span>
            <p>{{ ppt?.profile }}</p>
          </div>
          <div class="profile-box">
            <span class="label">类型</span>
            <p>{{ ppt?.effect }}PPT</p>
          </div>
          <div class="profile-box">
            <span class="label">比例</span>
            <p>{{ ppt?.proportion }}</p>
          </div>
          <div class="profile-box">
            <span class="label">页数</span>
            <p>{{ ppt?.pages }}页</p>
          </div>
          <div class="profile-box">
            <span class="label">分类</span>
            <p v-for="(item, index) in ppt?.category" :key="index" class="category">{{
              getCategoryLabel(item)
            }}</p>
          </div>
          <div class="profile-box">
            <span class="label">标签</span>
            <div class="tags-box">
              <p v-for="(item, index) in ppt?.tags" :key="index" class="category">{{ item }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-box">
      <!-- 轮播图 -->
      <ppt-carousel v-if="ppt?.preview_url" :preview-url-list="ppt.preview_url"></ppt-carousel>
    </div>

    <!-- 下载警告弹窗 -->
    <pay-integral-dialog :dialog-get-integral-visible="dialogGetIntegralVisible" :title="`确定消费简币下载模板？只需一次支付，即可多次下载！`"
      btn-text="确认下载" :confirm-disabled="confirmDisabled" :confirm-tip="confirmTip" @cancle="cancleDialog"
      @confirm="confirmDialog"></pay-integral-dialog>
  </div>
</template>
<script lang="ts" setup>
import PptCarousel from '@/components/ppt/PptCarousel.vue';
import { downloadFileUtil } from '@/utils/common';
import 'element-plus/es/components/message-box/style/index';
import { useUserIsPayGoods } from '~/composables/useUsrIsPayGoods';
import { ElMessage } from 'element-plus';
import { fetchPptDownloadUrl, usePptCategories, usePptDetail } from '~/composables/ppt';

// 获取ppt模板id
const route = useRoute();
const id = route.params.id as string;
const currentIndex = ref<number>(-1); // 选中哪一张预览图

// 查询模板详细信息
const { ppt, loading} = usePptDetail(id);

// 查询ppt模板分类列表
const { categories} = usePptCategories();

// 返回分类名称
const getCategoryLabel = (id: string) => {
  if (categories.value) {
    return categories.value.find((item: any) => item.id === id)?.name;
  }
};

// 图片预览大图
const scrollbarRef = ref<any>(null);
const bigPreviewUrl = ref<string>('');
// 点击预览图
const selectPreUrl = (e: any, item: any, index: number) => {
  bigPreviewUrl.value = item.url;
  currentIndex.value = index;
  console.log(e);
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
    downloadTemplate();
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
  const data = await fetchPptDownloadUrl({id});
  ElMessage.success('即将开始下载');
  let url = data[0];
  downloadFileUtil(url);
};
</script>
<style lang="scss" scoped>
.ppt-preview-box {
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
      flex-direction: column;
      width: 800px;

      .img-list-box {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: flex-start;

        :deep(.c-scrollbar-content) {
          display: flex;
          position: relative;
        }

        .img-item-box {
          height: 90px;
          width: 160px;
          margin-bottom: 10px;
          cursor: pointer;
          transition: all 0.3s;
          border: 1px solid transparent;
          border-radius: 5px;
          overflow: hidden;
          flex-grow: 0;
          flex-shrink: 0;
          margin: 0 5px;
          position: relative;

          &:hover {
            border: 1px solid #5b3562;
          }
        }

        .active {
          border: 1px solid #5b3562;
        }
      }

      .img-big-preview {
        margin-bottom: 20px;

        .big-img-box {
          background: #e7e7e7;
          padding: 24px 21px;
          border-radius: 3px;
          display: flex;
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
          font-size: 18px;
          margin-bottom: 30px;
          text-align: justify;
          line-height: 1.5;
        }

        .download-btn {
          .button {
            width: 100%;
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
          margin-top: 30px;
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
        padding: 20px 30px 0 20px;
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
            flex-grow: 0;
            flex-shrink: 0;
            padding-top: 3px;
          }

          p {
            font-size: 14px;
            color: #999999;
            padding: 0 0 0 15px;
            text-align: justify;
            line-height: 1.5;
          }

          .category {
            border-right: 1px solid #eee;
            margin-bottom: 15px;
          }

          .tags-box {
            display: flex;
            flex-wrap: wrap;

            p {
              padding: 0 15px;
            }
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
