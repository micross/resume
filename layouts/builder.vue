<template>
  <ElConfigProvider size="small" :locale="zhCn">
    <ClientOnly>
      <slot />
    </ClientOnly>
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { useWebsiteConfigStore } from '~/store/websiteConfig';
import { ElConfigProvider } from 'element-plus';

// 查询网站配置
const { getWebsiteConfig } = useWebsiteConfigStore();
getWebsiteConfig();
</script>