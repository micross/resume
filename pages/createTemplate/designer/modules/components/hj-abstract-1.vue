<template>
  <p v-dompurify-html="module.dataSource.abstract.value" :style="abstract"></p>
</template>
<script lang="ts" setup>
  import type { ResumeComponent } from '~/lib';
import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';

  const props = defineProps<{
    module: ResumeComponent;
  }>();

  // 简介样式
  const abstract = useGetCustomStyle(props.module, 'abstract');
</script>
