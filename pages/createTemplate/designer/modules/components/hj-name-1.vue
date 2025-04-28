<template>
  <h1 v-dompurify-html="module.dataSource.name.value" :style="name"></h1>
</template>
<script lang="ts" setup>
  import type { ResumeComponent } from '~/lib';
import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';

  const props = defineProps<{
    module: ResumeComponent;
  }>();

  // 姓名样式
  const name = useGetCustomStyle(props.module, 'name');
</script>
