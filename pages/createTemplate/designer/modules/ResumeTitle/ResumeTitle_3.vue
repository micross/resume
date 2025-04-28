<template>
  <div class="resume-title-box" :style="boxStyle">
    <div v-show="module.props.title" class="content-box">
      <hj-p-1 :p="module.dataSource.title.value"></hj-p-1>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import type { ResumeComponent } from '~/lib';
import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import HjP1 from '../components/hj-p-1.vue';
  const props = defineProps<{
    module: ResumeComponent;
  }>();
  // 返回样式
  const boxStyle = useGetBoxStyle(props);
</script>
<style lang="scss" scoped>
  .resume-title-box {
    .content-box {
      display: flex;
      height: 100%;
      align-items: center;
    }
  }
</style>
