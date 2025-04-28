<template>
  <div class="font-color-editor-box">
    <el-form-item label="背景颜色">
      <ColorPickerCustom v-model="module.css.background"></ColorPickerCustom>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import { useModuleWithStyle } from './useModuleWithStyle';

  const props = defineProps<{
    id?: string;
    customCssProp?: string; // 有值，则代表是自定义样式属性设置
  }>();

  const { module } = useModuleWithStyle(props.id, props.customCssProp);
</script>
