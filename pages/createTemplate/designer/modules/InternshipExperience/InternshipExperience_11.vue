<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <slot name="module-title"></slot>
    <!-- 实习经验列表 -->
    <template v-for="(item, index) in module.dataSource.list.value" :key="index">
      <hj-internship-experience1
        :module="module"
        :data-source-item="item"
        :data-source-index="index"
      ></hj-internship-experience1>
    </template>
  </div>
</template>
<script setup lang="ts">
  import type { ResumeComponent } from '~/lib';
import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import hjInternshipExperience1 from '../components/hj-internship-experience-1.vue';
  const props = defineProps<{
    module: ResumeComponent;
  }>();
  const boxStyle = useGetBoxStyle(props);
</script>
