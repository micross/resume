<template>
  <div :style="boxStyle">
    <!-- 姓名 -->
    <hj-name-1 v-if="module.props.name.show" :module="module"></hj-name-1>
    <!-- 一句话简介 -->
    <hj-abstract-1 v-if="module.props.abstract.show" :module="module"></hj-abstract-1>
  </div>
</template>
<script setup lang="ts">
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import hjName1 from '../components/hj-name-1.vue';
  import hjAbstract1 from '../components/hj-abstract-1.vue';
import type { ResumeComponent } from '~/lib';
  const props = defineProps<{
    module: ResumeComponent;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);
</script>
