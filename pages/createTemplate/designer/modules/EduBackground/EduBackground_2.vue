<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <slot name="module-title"></slot>
    <!-- 教育背景列表 -->
    <template v-for="(item, index) in module.dataSource.list.value" :key="index">
      <hj-edu-background-2
        :module="module"
        :data-source-item="item"
        :data-source-index="index"
      ></hj-edu-background-2>
    </template>
  </div>
</template>
<script setup lang="ts">
  import type { ResumeComponent } from '~/lib';
import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import hjEduBackground2 from '../components/hj-edu-background-2.vue';

  const props = defineProps<{
    module: ResumeComponent;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);

  console.log('教育背景列表', props.module.dataSource);
</script>
<style lang="scss" scoped></style>
