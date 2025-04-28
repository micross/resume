<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import '@/style/normalize.css';
import 'element-plus/es/components/message-box/style/index';
// element-plus部分组件样式
import 'element-plus/theme-chalk/src/message.scss';
import '@/style/article/github-markdown-light.css'; // 文章样式
</script>
