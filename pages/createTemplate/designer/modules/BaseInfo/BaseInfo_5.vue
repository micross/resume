<template>
  <div :style="boxStyle">
    <div :style="userInfoBlock">
      <!-- 头像 -->
      <hj-avatar-2 v-if="module.props.avatar.show" :module="module"></hj-avatar-2>
      <div>
        <!-- 姓名 -->
        <hj-name-1 v-if="module.props.name.show" :module="module"></hj-name-1>
        <!-- 一句话简介 -->
        <hj-abstract-1 v-if="module.props.abstract.show" :module="module"></hj-abstract-1>
      </div>
    </div>
    <!-- 基本资料 -->
    <hj-user-base-info-1 :module="module"></hj-user-base-info-1>
  </div>
</template>
<script lang="ts" setup>
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';
  // 子组件
  import hjAvatar2 from '../components/hj-avatar-2.vue';
  import hjName1 from '../components/hj-name-1.vue';
  import hjAbstract1 from '../components/hj-abstract-1.vue';
  import hjUserBaseInfo1 from '../components/hj-user-base-info-1.vue';
import type { ResumeComponent } from '~/lib';
  const props = defineProps<{
    module: ResumeComponent;
  }>();

  // 返回样式
  const boxStyle = useGetBoxStyle(props);
  console.log('baseinfo样式', boxStyle);

  // 信息模块样式
  const userInfoBlock: any = useGetCustomStyle(props.module, 'userInfoBlock');
  console.log('信息模块样式', userInfoBlock);
</script>
