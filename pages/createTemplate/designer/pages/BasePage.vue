<template>
  <draggable
    class="page-box"
    :list="HJNewJsonStore.componentsTree"
    animation="500"
    group="custom"
    :sort="true"
    item-key="id"
    :style="pageStyle"
    :disabled="preview"
    ghost-class="page-ghost"
    @drop="handleDrop"
  >
    <template #item="{ element }">
      <div :ref="(el) => getDataModuleRef(el, element)" class="create-template-elemet">
        <module-box :module="element" :preview="preview"></module-box>
      </div>
    </template>
  </draggable>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import draggable from 'vuedraggable';

  import ModuleBox from '../components/ModuleBox.vue';
  import { useGetPageStyle } from '../hooks/useGetPageStyle';
  import type { ComponentPublicInstance } from 'vue';
import { useCreateTemplateStore } from '~/store/createTemplate';
import type { ResumeComponent } from '~/lib';

  defineProps<{
    preview: boolean;
  }>();

  const { HJNewJsonStore, selectedModuleId } = storeToRefs(useCreateTemplateStore());
  console.log(HJNewJsonStore.value.componentsTree)

  // 返回页面样式
  const pageStyle = useGetPageStyle();

  const handleDrop = (event: any) => {
    event.dataTransfer?.getData('cptData');
    console.log('drop', event.dataTransfer?.getData('cptData'));
  };

  // 监听selectedModuleId变化
  watch(
    () => selectedModuleId.value,
    (newVal) => {
      // 如果选中了模块
      if (newVal && moduleDataConfigRefList[newVal]) {
        setTimeout(() => {
          moduleDataConfigRefList[newVal].el.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          }); // 该模块显示在可视区域内
        }, 0);
      }
    },
    {
      deep: true
    }
  );

  // 通过ref获取元素
  const moduleDataConfigRefList = reactive<any>({});
  const getDataModuleRef = (el: ComponentPublicInstance | null | Element, moduleItem: ResumeComponent) => {
    if (el) {
      moduleDataConfigRefList[moduleItem.id] = {
        id: moduleItem.id,
        el: el
      };
    }
  };
</script>
<style lang="scss" scoped>
  .create-template-elemet {
    width: 100%;
  }
</style>
<style lang="scss">
  .page-ghost {
    img {
      width: 100% !important;
    }
    .module-component-name {
      display: none !important;
    }
  }
</style>
