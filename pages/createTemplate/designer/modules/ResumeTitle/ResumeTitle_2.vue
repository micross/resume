<template>
  <div class="resume-title-box" :style="boxStyle">
    <div v-show="module.props.title" :style="inlineBlock">
      <hj-p-1 :p="module.dataSource.title.value"></hj-p-1>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import HjP1 from '../components/hj-p-1.vue';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';
import type { ResumeComponent } from '~/lib';
  const props = defineProps<{
    module: ResumeComponent;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);

  // 返回自定义样式prop = inlineBlock
  const inlineBlock = useGetCustomStyle(props.module, 'inlineBlock');
</script>
