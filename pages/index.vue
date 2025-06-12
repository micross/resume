<template>
  <div ref="indexRef">
    <!-- 项目介绍栏 -->
    <div ref="introduceRef">
      <ProjectIntroduce @free-make="freeMake" @see-more="seeMore" @webcode="webcode"></ProjectIntroduce>
    </div>
    <!-- 模板选择 -->
    <TemplateSelect ref="templeTef"></TemplateSelect>
    <!-- 根据用途挑选简历 -->
    <SelectTemplateByUse></SelectTemplateByUse>
    <!-- 简历功能介绍 -->
    <ResumeFunctionIntroduce></ResumeFunctionIntroduce>
    <!-- 网站开源信息 -->
    <WebsiteOpenSource></WebsiteOpenSource>

    <!-- 网站相关数据 -->
    <WebData></WebData>
    <!-- footer -->
    <FooterCom></FooterCom>
  </div>

  <!-- 公告弹窗 -->
  <NoticeDialog :dialog-notice-visible="dialogNoticeVisible" @cancle="noticeCancle"></NoticeDialog>
</template>

<script setup lang="ts">
import ProjectIntroduce from '@/components/index/IndexProduct.vue';
import TemplateSelect from '@/components/index/TemplateSelect.vue';
import FooterCom from '@/components/FooterCom/FooterCom.vue';
import WebData from '@/components/index/WebData.vue';
import NoticeDialog from '@/components/NoticeDialog/NoticeDialog.vue';
import SelectTemplateByUse from '@/components/index/SelectTemplateByUse.vue';
import ResumeFunctionIntroduce from '@/components/index/ResumeFunctionIntroduce.vue';
import WebsiteOpenSource from '@/components/index/WebsiteOpenSource.vue';


const dialogNoticeVisible = ref<boolean>(false);
const readNotice = useState('readNotice').value;
if (readNotice == '1') {
  dialogNoticeVisible.value = false;
} else {
  dialogNoticeVisible.value = false;
}

const noticeCancle = () => {
  dialogNoticeVisible.value = false;
};


// 点击免费制作
const freeMake = () => {
  router.push('/resume');
};

// 下滑
const templeTef = ref<any>(null);
const seeMore = () => {
  templeTef.value.scrollIntoView();
};


// 点击成为赞助者
const router = useRouter();
const webcode = () => {
  router.push('/webcode');
};
</script>
