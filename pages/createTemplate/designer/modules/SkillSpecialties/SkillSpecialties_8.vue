<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <slot name="module-title"></slot>
    <!-- 技能特长列表 -->
    <hj-skill-specialties-1 :module="module"></hj-skill-specialties-1>
  </div>
</template>
<script setup lang="ts">
  import type { ResumeComponent } from '~/lib';
import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import hjSkillSpecialties1 from '../components/hj-skill-specialties-1.vue';
  const props = defineProps<{
    module: ResumeComponent;
  }>();
  // 返回样式
  const boxStyle = useGetBoxStyle(props);
</script>
