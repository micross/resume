<template>
  <div :style="boxStyle">
    <!-- 模块标题 -->
    <slot name="module-title"></slot>
    <div :style="userInfoBlock">
      <!-- 基本资料 -->
      <hj-user-base-info-3 :module="module"></hj-user-base-info-3>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';
  import hjUserBaseInfo3 from '../components/hj-user-base-info-3.vue';
import type { ResumeComponent } from '~/lib';
  const props = defineProps<{
    module: ResumeComponent;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);
  // 信息模块样式
  const userInfoBlock = useGetCustomStyle(props.module, 'userInfoBlock');
</script>
