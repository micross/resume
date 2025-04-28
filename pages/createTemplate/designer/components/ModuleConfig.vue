<!-- 模块属性配置面板 -->
<template>
  <div class="right-setter-box">
    <DataConfig v-if="HJNewJsonStore.componentsTree.length"></DataConfig>
    <!-- 没有选中组件时展示 -->
    <div v-else class="no-data">
      <no-data width="40%" height="auto"></no-data>
      <p>请先选中一个模块，进行数据配置吧~</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useCreateTemplateStore } from '~/store/createTemplate';
import DataConfig from './DataConfig.vue'; // 数据配置

const { HJNewJsonStore } = storeToRefs(useCreateTemplateStore());
</script>
<style lang="scss" scoped>
.right-setter-box {
  background-color: #fff;
  height: 100%;
  width: 100%;

  .no-data {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      font-size: 16px;
      letter-spacing: 1px;
      color: #2cbd99;
    }
  }
}
</style>
