<template>
  <ElConfigProvider size="small" :locale="zhCn">
    <ClientOnly>
      <slot />
    </ClientOnly>
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { ElConfigProvider } from 'element-plus';
</script>