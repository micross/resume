<template>
  <nav class="nav-box">
    <div class="nav-left">
      <div class="return-icon" @click="returnPage">
        <el-icon>
          <ArrowLeftBold />
        </el-icon>
      </div>
      <!-- 简历标题 -->
      <div class="resume-title">
        <p v-show="!isShowIpt">
          {{ HJNewJsonStore.config.title }}
          <el-icon :size="20" color="#74a274" @click="changeTitle">
            <Edit />
          </el-icon>
        </p>
        <el-input v-show="isShowIpt" ref="titleIpf" v-model="HJNewJsonStore.config.title" autofocus placeholder="请输入标题"
          @blur="blurTitle" />
      </div>
      <!-- 最近保存时间 -->
      <div v-if="draftTips" class="draft-tips-box">
        <span class="draft-tips">{{ draftTips }}</span>
        <IconClock icon-name="icon-shijian1" color="#999999" :size="14"></IconClock>
      </div>
    </div>
    <div class="nav-center"> </div>
    <div class="nav-right">
      <el-tooltip effect="dark" content="AI智能诊断" placement="bottom">
        <div class="ai-bot-container ai-optimize-box" @click="aiOptimize"><img
            src="@/assets/images/home/ai-optimize.svg" width="24" height="24" />
          <div class="ai-bot-text">AI简历诊断</div>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="AI智能语种切换" placement="bottom">
        <div class="ai-bot-container" @click="languageSelect"><img src="@/assets/images/ai-translate.webp" width="24"
            height="24" />
          <div class="ai-bot-text">AI翻译</div>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="下载到本地" placement="bottom">
        <div class="icon-box icon-download" @click="downloadResume">
          <IconDownload icon-name="icon-xiazai" color="#fff" :size="17"></IconDownload>
          <span class="icon-tips">导出</span>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="保存为草稿" placement="bottom">
        <div class="icon-box" @click="saveDraft">
          <IconSave icon-name="icon-caogaoxiang1" color="#555" :size="17"></IconSave>
          <span class="icon-tips">暂存</span>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="预览简历" placement="bottom">
        <div class="icon-box" @click="previewResume">
          <IconEye icon-name="icon-yulan1" color="#555" :size="19"></IconEye>
          <span class="icon-tips">预览</span>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="重置所有设置" placement="bottom">
        <div class="icon-box" @click="reset">
          <IconRotateCcw icon-name="icon-zhongzhi" color="#555" :size="17"></IconRotateCcw>
          <span class="icon-tips">重置</span>
        </div>
      </el-tooltip>
    </div>
  </nav>

  <!-- 下载弹窗 -->
  <DownloadDialog :dialog-download-visible="dialogDownloadVisible" :export-pdf-pay-integral="exportPdfPayIntegral"
    :export-img-pay-integral="exportImgPayIntegral" @close-download-dialog="closeDownloadDialog"
    @download-file="downloadResumeFile"></DownloadDialog>

  <!-- 预览窗口 -->
  <PreviewImage v-if="dialogPreviewVisible" @close="closePreview">
    <ResumePreview :show-line="true"></ResumePreview>
  </PreviewImage>

  <!-- 语种切换弹窗 -->
  <TranslateDialog :dialog-translate-visible="dialogTranslateVisible" @cancle="translateCancle"></TranslateDialog>

  <!-- AI诊断确认弹窗 -->
  <AiOptimizeDialog :dialog-ai-optimize-visible="dialogAiOptimizeVisible" @cancle="aiDialogCancle"
    @update-success="updateSuccess"></AiOptimizeDialog>

  <!-- AI诊断抽屉 -->
  <AiOptimizeDrawer :drawer="aiDrawer" :model-info-obj="modelInfoObj"
    @close-ai-optimize-drawer="closeAiDrawer"></AiOptimizeDrawer>
</template>
<script lang="ts" setup>
import { ElMessageBox, ElNotification } from 'element-plus';
import 'element-plus/es/components/message-box/style/index';
import { storeToRefs } from 'pinia';
import DownloadDialog from '../../designer/components/DownloadDialog.vue';
import { debounce } from 'lodash';
import { saveDraftAsync } from '~/composables/api/createTemplate';
import { formatListDate } from '@/utils/common';
import ResumePreview from '@/pages/createTemplate/previewer/index.vue';
import TranslateDialog from './TranslateDialog.vue';
import AiOptimizeDrawer from '@/pages/createTemplate/designer/components/AiOptimizeDrawer.vue';
import AiOptimizeDialog from '@/pages/createTemplate/designer/components/AiOptimizeDialog.vue';
import { useCreateTemplateStore } from '~/store/createTemplate';

const { HJNewJsonStore } = storeToRefs(useCreateTemplateStore());
const emit = defineEmits([
  'generateReport',
  'generateReportNew',
  'reset',
  'saveDataToLocal',
  'publishComment'
]);
const route = useRoute();
const id = route.params.id;

// 返回上一页
const router = useRouter();
const returnPage = () => {
  router.go(-1);
};

// 更改标题
const titleIpf = ref<any>(null);
const isShowIpt = ref<boolean>(false);
const changeTitle = () => {
  isShowIpt.value = true;
  titleIpf.value.focus();
};
const blurTitle = () => {
  isShowIpt.value = false;
};

// 查询导出为pdf需要的简币数
const exportPdfPayIntegral = ref<number>(0);
// 查询导出为图片需要的简币数
const exportImgPayIntegral = ref<number>(0);
onMounted(async () => {
  // exportImgPayIntegral.value = Number(await getIntegralPayNumber('9'));
  // exportPdfPayIntegral.value = Number(await getIntegralPayNumber('8'));
});

// 保存草稿
let draftTips = ref<string>('');
const saveDataToLocal = () => {
  return new Promise(async (resolve) => {
    const data = {
      template_id: id,
      template_json: HJNewJsonStore.value
    };
    const result = await saveDraftAsync(data);
    draftTips.value = `已保存：${formatListDate(result)}`;
    resolve('保存草稿成功');
  });
};

// 预览简历
const dialogPreviewVisible = ref<boolean>(false);
const previewResume = () => {
  dialogPreviewVisible.value = true;
  // router.push({
  //   path: '/resumePreview',
  //   query: {
  //     type: 'page',
  //     id: route.params.id
  //   }
  // });
};

// 关闭预览弹窗
const closePreview = () => {
  dialogPreviewVisible.value = false;
};

// 保存草稿
const saveDraft = () => {
  saveDataToLocal();
};

// 自动保存草稿
const debounced = debounce(() => {
  saveDataToLocal();
}, 5000);
watch(
  () => HJNewJsonStore.value, // JSON数据发生变化，则保存草稿
  (newval, oldVal) => {
    if (newval && oldVal.id) {
      debounced();
    }
  },
  {
    deep: true
  }
);

// 打开导出弹窗
const dialogDownloadVisible = ref<boolean>(false);
const downloadResume = () => {
  dialogDownloadVisible.value = true;
};

// 打开智能语种切换弹窗
const dialogTranslateVisible = ref<boolean>(false);
const languageSelect = () => {
  const token  = useCookie('token');
  if (!token.value) {
    openLoginDialog();
    return;
  }
  dialogTranslateVisible.value = true;
};

// 关闭翻译弹窗
const translateCancle = () => {
  dialogTranslateVisible.value = false;
};

// 关闭弹窗
const closeDownloadDialog = () => {
  dialogDownloadVisible.value = false;
};

// 打开登录弹窗
const openLoginDialog = () => {
};

// 点击下载
const downloadResumeFile = async (type: string) => {
  const data = await saveDataToLocal();
  if (data) {
    emit('generateReport', type);
    closeDownloadDialog();
  }
};

// 重置
const reset = () => {
  ElMessageBox.confirm('此操作会重置简历至初始状态，是否继续?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      emit('reset');
      draftTips.value = '';
    })
    .catch(() => { });
};

// 打开AI诊断确认弹窗
const dialogAiOptimizeVisible = ref<boolean>(false);
const aiDrawer = ref<boolean>(false);
const aiOptimize = () => {
  dialogAiOptimizeVisible.value = true;
};

// AI诊断确认弹窗取消
const aiDialogCancle = () => {
  dialogAiOptimizeVisible.value = false;
};

// AI诊断确认弹窗确认
const modelInfoObj = ref<any>({}); // 选择的模型
const updateSuccess = (modelInfo: any) => {
  dialogAiOptimizeVisible.value = false;
  aiDrawer.value = true;
  modelInfoObj.value = modelInfo;
};

// 关闭AI诊断抽屉
const closeAiDrawer = () => {
  aiDrawer.value = false;
};

defineExpose({
  saveDataToLocal
});
</script>
<style lang="scss" scopeds>
.nav-box {
  height: 50px;
  width: 100%;
  background-color: #fff;
  position: sticky;
  top: 0;
  display: flex;
  box-shadow: 0 5px 21px 0 rgb(78 78 78 / 5%);
  z-index: 20;

  .nav-left {
    display: flex;
    align-items: center;
    user-select: none;
    padding: 0 0 0 40px;

    .return-icon {
      width: 30px;
      height: 30px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
      transition: all 0.3s;

      &:hover {
        opacity: 0.8;
      }
    }

    .resume-title {
      flex-shrink: 0;

      p {
        display: flex;
        align-items: center;
        font-size: 16px;

        .el-icon {
          margin-left: 5px;
          cursor: pointer;
          margin-top: 1px;
        }
      }

      .el-input {
        width: 200px;
      }
    }

    .draft-tips-box {
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: 15px;
      flex-shrink: 0;

      .draft-tips {
        margin-right: 7px;
        font-size: 12px;
        color: #999999;
      }
    }
  }

  .nav-center {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 100%;

    .left {
      display: flex;
      height: 100%;

      .nav-center-left-box {
        height: 100%;
        display: flex;

        .icon-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #555;
          cursor: pointer;
          padding: 0 15px;
          height: 100%;
          transition: all 0.3s;

          &:hover {
            background-color: rgba($color: #74a274, $alpha: 0.1);
            color: #74a274;
          }

          .icon-tips {
            font-size: 12px;
            margin-top: 8px;
          }
        }
      }

      .draft-tips-box {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 10px;

        .draft-tips {
          font-size: 10px;
          color: #999999;
        }
      }
    }
  }

  .nav-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 50px;

    .icon-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #555;
      cursor: pointer;
      padding: 0 15px;
      height: 100%;
      transition: all 0.3s;

      &:hover {
        background-color: rgba($color: #74a274, $alpha: 0.1);
        color: #74a274;
      }

      .icon-tips {
        font-size: 12px;
        margin-top: 8px;
      }
    }

    .icon-AI-YH {
      border-radius: 50%;
      margin-right: 15px;
      background-image: linear-gradient(to top,
          #fcc5e4 0%,
          #fda34b 15%,
          #ff7882 35%,
          #c8699e 52%,
          #7046aa 71%,
          #0c1db8 87%,
          #020f75 100%);
      height: 36px;
      width: 36px;
      transition: all 0.3s;

      &:hover {
        opacity: 0.8;
      }
    }

    .ai-bot-container {
      align-items: center;
      background: linear-gradient(271deg, #f6f3ff -0.08%, #f2fdff 99.45%);
      border-radius: 24px;
      box-sizing: border-box;
      display: inline-flex;
      font-size: 14px;
      height: 32px;
      margin-right: 15px;
      overflow: hidden;
      padding: 6px 8px;
      user-select: none;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }

      .ai-bot-text {
        -webkit-text-fill-color: transparent;
        background: linear-gradient(271deg, #4734f4 0.3%, #4c79ff 99.35%);
        -webkit-background-clip: text;
        background-clip: text;
        font-family: PingFang SC;
        font-size: 14px;
        line-height: 20px;
        margin-left: 4px;
      }
    }

    .ai-optimize-box {
      img {
        border: 2px solid #91adff;
        border-radius: 50%;
      }
    }

    .icon-download {
      background-color: rgba($color: #74a274, $alpha: 1);
      color: #fff;

      &:hover {
        background-color: rgba($color: #74a274, $alpha: 0.9);
        color: #fff;
      }
    }
  }
}
</style>
