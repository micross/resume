<template>
  <div class="font-color-editor-box">
    <el-form-item label="字体颜色">
      <ColorPickerCustom v-model="module.css.color"></ColorPickerCustom>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import { useModuleWithStyle } from './useModuleWithStyle';

  const props = defineProps<{
    id?: string;
    customCssProp?: string;
  }>();

  // 选中的module
  const { module } = useModuleWithStyle(props.id, props.customCssProp);
</script>
