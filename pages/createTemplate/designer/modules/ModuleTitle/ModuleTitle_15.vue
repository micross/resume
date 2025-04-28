<template>
  <div class="module-title-15" :style="moduleTitleStyle">
    <hj-h1-1 :title="module.title" :style="moduleTitleFontStyle"></hj-h1-1>
  </div>
</template>
<script lang="ts" setup>
  import HjH11 from '../components/hj-h1-1.vue';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';
import type { ResumeComponent } from '~/lib';

  const props = defineProps<{
    module: ResumeComponent;
  }>();

  // 返回模块整体样式
  const moduleTitleStyle: any = useGetCustomStyle(props.module, 'moduleTitle');
  // 返回标题字体样式
  const moduleTitleFontStyle = useGetCustomStyle(props.module, 'moduleTitleFont');
</script>
