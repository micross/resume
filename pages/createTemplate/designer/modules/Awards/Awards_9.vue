<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <slot name="module-title"></slot>
    <!-- 教育背景列表 -->
    <template v-for="(item, index) in module.dataSource.list.value" :key="index">
      <hj-awards-3
        :module="module"
        :data-source-item="item"
        :data-source-index="index"
      ></hj-awards-3>
    </template>
  </div>
</template>
<script setup lang="ts">
  import type { ResumeComponent } from '~/lib';
import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import hjAwards3 from '../components/hj-awards-3.vue';

  const props = defineProps<{
    module: ResumeComponent;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);

  console.log('教育背景列表', props.module.dataSource);
</script>
<style lang="scss" scoped></style>
