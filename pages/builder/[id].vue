<template>
  <div class="design-resume-box">
    <!-- 导航栏 -->
    <NavBar @reset="reset" @generate-report="generateReport"></NavBar>
    <!-- 底部区域 -->
    <div :key="resetKey" class="bottom-box">
      <!-- 数据配置 -->
      <div v-loading="isLoading" class="left">
        <DataConfig v-if="HJNewJsonStore.componentsTree.length"></DataConfig>
        <!-- 暂无数据 -->
        <div v-else class="no-data-box">
          <NoData></NoData>
        </div>
      </div>
      <!-- 简历预览 -->
      <div id="resume-container" class="right">
        <!-- 主题配置 -->
        <GlobalThemeSettingBar></GlobalThemeSettingBar>
        <div v-loading="isLoading" class="resume-container" :style="{ zoom: zoomScale }">
          <ResumeRender :is-loading="isLoading"></ResumeRender>
        </div>
      </div>
      <!-- 操作列 -->
      <div class="page-eidtor-box">
        <PageEditorList></PageEditorList>
      </div>
    </div>

    <!-- 导出pdf进度弹窗 -->
    <ProcessBarDialog :dialog-visible="dialogVisible" :percentage-num="percentage"
      @cancle="cancleProgress"></ProcessBarDialog>
  </div>
</template>

<script lang="ts" setup>
import NavBar from './components/NavBar.vue';
import { storeToRefs } from 'pinia';
import { getUuid } from '@/utils/common';
import pageSchemas from '../createTemplate/designer/schema/pageSchema';
import ResumeRender from '../createTemplate/designer/components/ResumeRender.vue';
import PageEditorList from './components/PageEditorList.vue';
import { exportPdfNew, exportPNGNew } from '@/utils/pdf';
import ProcessBarDialog from '@/components/ProcessBarDialog/ProcessBarDialog.vue';
import GlobalThemeSettingBar from '../createTemplate/designer/components/GlobalThemeSettingBar.vue';
import { useCreateTemplateStore } from '~/store/createTemplate';
import { useUserInfoStore } from '~/store/user';
import { useTemplateDetail, useUserTemplateDetail } from '~/composables/templates';
import DataConfig from '../createTemplate/designer/components/DataConfig.vue';

definePageMeta({
  layout: 'builder'
})

const isLoading = ref(false);
const { HJNewJsonStore, selectedPageName, fromAiGenerate } = storeToRefs(
  useCreateTemplateStore()
);
const route = useRoute();

// 响应式缩放比例
const zoomScale = ref(1);
const adjustZoomScale = () => {
  const rightBox = document.getElementById('resume-container') as HTMLElement;
  const fixedWidth = 820; // ResumeRender 的固定宽度
  if (rightBox) {
    // 获取容器宽度，减去左右 padding 的宽度
    const styles = window.getComputedStyle(rightBox);
    const paddingLeft = parseFloat(styles.paddingLeft || '0');
    const paddingRight = parseFloat(styles.paddingRight || '0');

    const availableWidth = rightBox.clientWidth - paddingLeft - paddingRight - 90; // 可用宽度
    zoomScale.value = availableWidth / fixedWidth; // 计算缩放比例
    if (zoomScale.value > 1) zoomScale.value = 1; // 限制最大比例为 1
  }
};

const { template } =  useTemplateDetail(route.params.id as string);
console.log(HJNewJsonStore.value,template.value)

// 查询模版数据
const getTemplateData = async () => {
  console.log("sdfsdfsdf")
  const { template } =  useTemplateDetail(route.params.id as string)
    // HJNewJsonStore.value = data.data.template_json;
    // HJNewJsonStore.value.props.title = data.data.template_title;
    // ElMessage.success('初始化成功');
    // useHead({
    //   title: HJNewJsonStore.value.props.title
    // });
    isLoading.value = false;

};

// 重置
const { resetKey } = storeToRefs(useCreateTemplateStore());
const reset = () => {
  getTemplateData();
  resetKey.value++; // 增加key，强制重新渲染
};

// 查询用户数据
const getUserTemplate = async () => {
  const { usertemplate} =  useUserTemplateDetail(route.params.id as string)
    // HJNewJsonStore.value = usertemplate.value.template_json;
    // HJNewJsonStore.value.props.title = usertemplate.value.template_title;
    // ElMessage.success('初始化成功');
  //const data = await getUsertemplateAsync(route.params.id);
    // HJNewJsonStore.value = data.data.data.template_json;
    // HJNewJsonStore.value.props.title = data.data.data.template_json.config.title;
    // useHead({
    //   title: HJNewJsonStore.value.props.title
    // });
    isLoading.value = false;

};

// 默认模版数据
const defaultTemplate = () => {
  HJNewJsonStore.value = pageSchemas[selectedPageName.value];
  HJNewJsonStore.value.id = getUuid();
  isLoading.value = false;
};

const token  = useCookie('token');
if (token.value) {
  // 如果是从AI智能生成简历跳转过来，则不查询模版
  console.log('fromAiGenerate', fromAiGenerate.value);
  if (!fromAiGenerate.value) {
    // 查询用户简历
   // getUserTemplate();
   isLoading.value = false;
  } else {
    isLoading.value = false;
  }
} else {
 // getTemplateData();
  isLoading.value = false;
}

// 初始化和窗口变化事件绑定
onMounted(async () => {
  adjustZoomScale();
  window.addEventListener('resize', adjustZoomScale);
});

onBeforeUnmount(() => {
  fromAiGenerate.value = false;
  window.removeEventListener('resize', adjustZoomScale);
});

// 生成pdf方法
const dialogVisible = ref<boolean>(false);
const percentage = ref<number>(10);
let timer: any = null;
const generateReport = async (type: string) => {
  dialogVisible.value = true;
  timer = setInterval(() => {
    percentage.value += 5;
    if (percentage.value > 95) {
      percentage.value = 98;
      clearInterval(timer);
    }
  }, 500);
  if (type === 'pdf') {
    await exportPdfNew(route.params.id as string);
  } else {
    await exportPNGNew(route.params.id as string);
  }

  clearInterval(timer);
  percentage.value = 100;
  // 查询用简币信息
  const { getUserIntegralTotal } = useUserInfoStore();
  getUserIntegralTotal();
};

// 关闭进度弹窗
const cancleProgress = () => {
  dialogVisible.value = false;
  percentage.value = 10;
};
</script>

<style lang="scss" scoped>
.design-resume-box {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: hidden;
  white-space: pre-line;

  .bottom-box {
    width: 100%;
    flex: 1;
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    overflow-x: auto;
    // background-image: linear-gradient(to right, rgb(203 213 225) 1px, transparent 1px),
    //   linear-gradient(to bottom, rgb(203 213 225) 1px, transparent 1px);
    // background-size: 10px 10px;
    // background-position: center center;
    background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);

    .left {
      flex: 0 0 40%; // 固定宽度占比
      max-width: 40%; // 防止超出
      min-width: 450px; // 设置最小宽度（可以根据需求调整）
      background: #fff;

      .no-data-box {
        height: 100%;
        display: flex;
        align-items: center;
      }

      .no-data {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #fff;

        p {
          font-size: 16px;
          letter-spacing: 1px;
          color: #2cbd99;
        }

        :deep(img) {
          width: 40%;
          height: auto;
        }
      }
    }

    .right {
      flex: 1; // 动态占据剩余空间
      min-width: 500px; // 设置最小宽度
      overflow-x: hidden;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 20px;
      position: relative;

      .resume-container {
        margin-top: 20px;
        width: 820px; // 固定宽度
        height: auto;
        z-index: 1;
      }
    }

    .page-eidtor-box {
      width: 60px;
      min-height: 300px;
      position: absolute;
      right: 15px;
      top: 130px;
    }
  }

  :deep(.full-screen) {
    display: none;

    .el-drawer__body {
      overflow: hidden;
    }
  }
}
</style>
