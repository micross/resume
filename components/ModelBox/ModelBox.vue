<template>
  <div
    v-if="item.show && item.style"
    :ref="(el) => setRefItem(el, item.model, item.keyId)"
    :class="[
      'model-box',
      { 'is-have-border': item.keyId === useSelectMaterialStore().cptKeyId }
    ]"
    @click="selectModel(item.model, item.cptTitle, item.keyId)"
    @mouseover="modelHover(item.keyId)"
    @mouseleave="modelMouseleave"
  >
    <!-- 模块操作区域 -->
    <div v-show="hoverCurrentId === item.keyId" class="edit-box">
      <el-tooltip class="box-item" effect="dark" content="复制当前模块">
        <div class="copy" @click="useCopyModel(item)">
          <IconPlus icon-name="icon-jia" class-name="icon" color="#fff" :size="16"></IconPlus>
        </div>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="删除当前模块">
        <div class="delete" @click.stop="useDeleteModel(item)">
          <IconDelete
            icon-name="icon-shanchu"
            class-name="icon icon-shanchu"
            color="#fff"
            :size="18"
          ></IconDelete>
        </div>
      </el-tooltip>
    </div>
    <!-- 模块标题 -->
    <slot name="model-title"></slot>
    <component
      :is="components[item.model]"
      v-if="item.style"
      :model-data="item.data"
      :model-style="item.style"
    ></component>
  </div>
</template>
<script lang="ts" setup>
  import { type ComponentPublicInstance, reactive, ref, watch } from 'vue';
  import { useCopyModel } from '~/composables/useCopyModel';
  import { useDeleteModel } from '~/composables/useDeleteModel';
  import { storeToRefs } from 'pinia';
  import type { IMATERIALITEM } from '@/interface/material';
import { useSelectMaterialStore } from '~/store/resume';
import { IconDelete, IconPlus } from '#components';

  const props = defineProps<{
    item: IMATERIALITEM;
    components: any;
  }>();
  // 锚点定位
  const { cptKeyId } = storeToRefs(useSelectMaterialStore());
  watch(
    () => cptKeyId.value,
    (newVal) => {
      // 如果选中了模块
      if (newVal && modelObj[newVal]) {
        modelObj[newVal].el.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 该模块显示在可视区域内
      }
    },
    {
      deep: true
    }
  );

  // 鼠标移入模块
  const hoverCurrentId = ref<string>('');
  const modelHover = (keyId: string) => {
    hoverCurrentId.value = keyId;
  };

  // 鼠标移出模块
  const modelMouseleave = () => {
    hoverCurrentId.value = '';
  };

  // 模块ref
  const modelObj = reactive<any>({});
  const setRefItem = (
    el: ComponentPublicInstance | null | Element,
    model: string,
    keyId: string
  ) => {
    if (el) {
      modelObj[keyId] = {
        keyId: keyId,
        el: el
      };
    }
  };

  // 点击模块
  const { updateSelectModel } = useSelectMaterialStore();
  const selectModel = (model: string, title: string, keyId: string) => {
    let optionsName: string = props.item.cptOptionsName;
    // 更新store
    updateSelectModel(model, optionsName, title, keyId);
  };
</script>
<style lang="scss" scoped>
  .model-box {
    border: 1px dashed transparent;
    transition: all 0.3s;
    position: relative;
    &:hover {
      border-color: #7ec97e !important;
      cursor: pointer;
    }
    .edit-box {
      position: absolute;
      right: 0px;
      top: -35px;
      display: flex;
      .copy,
      .delete {
        width: 35px;
        height: 35px;
        background-color: #00c091;
        border-radius: 3px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: rgba(#00c091, 0.8);
        }
      }
      .delete {
        margin-left: 6px;
      }
    }
  }
  .is-have-border {
    border-color: #7ec97e;
  }
</style>
