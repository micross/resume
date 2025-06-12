<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { useLoadingStore } from '~/store/loading';
import { ElConfigProvider } from 'element-plus';

useServerSeoMeta({
  title: '红黄-一款免费开源的简历制作神器',
  description:
    '红黄-开源简历制作神器！免费制作一份精美的简历！内置两款设计器、快速设计、简历、封面、海报均可免费制作，支持一键导出高清PDF、JSON数据等。',
  keywords: '简历 开源 设计器 制作 PDF 高清简历 免费开源'
});

const { isLoading } = storeToRefs(useLoadingStore());
</script>

<template>
  <ElConfigProvider size="small" :locale="zhCn">
      <NavBar bg-color="#fff" font-color="green" position="sticky" icon-color="green"></NavBar>
      <slot />
      <LoadingCom v-show="isLoading"></LoadingCom>
  </ElConfigProvider>
</template>