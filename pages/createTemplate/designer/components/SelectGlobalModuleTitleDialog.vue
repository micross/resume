<!-- 新增文章分类弹窗 -->
<template>
  <el-dialog
    :model-value="dialogModuleTitleVisible"
    title="请选择模块标题样式"
    width="800px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
  >
    <div v-loading="isLoading" class="create-template-module-title-select-warpper">
      <div v-for="(item, index) in ModuleTitleScreenShotList" :key="index" class="img-box">
        <!-- 选中标记 -->
        <div v-if="item.cptName == selectedModuleCptName" class="current-mark-bgc"></div>
        <div v-if="item.cptName == selectedModuleCptName" class="current-mark">
          <svg-icon icon-name="icon-duigou_kuai" color="#fff" size="12px"></svg-icon>
        </div>
        <img :src="getModuleTitleImagesFile(item.img)" alt="图片" lazy @click="selectPage(item)" />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { getModuleTitleImagesFile } from '@/utils/common';
  import { cloneDeep } from 'lodash';
  import { ModuleTitleScreenShotList, moduleTitleIconList } from '../modules/ModuleTitle';
  import customCss from '../schema/customCss';
import { useCreateTemplateStore } from '~/store/createTemplate';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogModuleTitleVisible: boolean;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogModuleTitleVisible: false
  });

  const { HJNewJsonStore } = storeToRefs(useCreateTemplateStore());

  // 是否处理完毕
  const isLoading = ref<boolean>(true);

  watch(
    () => props.dialogModuleTitleVisible,
    async (newVal) => {
      if (newVal) {
        await nextTick();
        isLoading.value = false;
      }
    }
  );

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 选择模版
  const selectedModuleCptName = ref<string>(''); // 选中的组件名称
  const isTitleIcon = ref<boolean>(false);
  const selectPage = (value: any) => {
    selectedModuleCptName.value = value.cptName;
    isTitleIcon.value = value.iconfont;
    console.log('选中标题', value);
  };

  // 提交
  const submit = () => {
    HJNewJsonStore.value.componentsTree.forEach((selectModule: any) => {
      if (
        selectModule.customProps.hasOwnProperty('ModuleTitleCpt') &&
        selectModule.customProps.ModuleTitleCpt
      ) {
        // 设置模块标题的自定义属性
        selectModule.customProps.ModuleTitleCpt = selectedModuleCptName.value;

        // 添加模块标题的自定义样式
        const customCssKey: string = selectedModuleCptName.value;
        const moduleTitleCustomCssArray = customCss[customCssKey];

        // 收集不在 selectModule.customCss 中的元素，并替换已存在的元素
        const newItems: any[] = [];
        moduleTitleCustomCssArray.forEach((item2: any) => {
          const index = selectModule.customCss.findIndex((item1: any) => item1.prop === item2.prop);
          if (index === -1) {
            newItems.push(cloneDeep(item2));
          } else {
            // 如果存在，替换 selectModule.customCss 中的元素
            selectModule.customCss[index] = cloneDeep(item2);
          }
        });

        // 将不在 selectModule.customCss 中的元素整体插入到最前面
        selectModule.customCss.unshift(...newItems);
        // 判断模块标题是否带有图标
        if (isTitleIcon.value) {
          // 如果带有图标，则设置标题
          selectModule.props.title = {
            chName: selectModule.title,
            show: true,
            iconfont: moduleTitleIconList[selectModule.category].titleIcon,
            config: true // 是否支持配置
          };
        } else {
          // 如果不带有图标，则删除自定义样式中 prop 为 'moduleTitleIcon' 的项
          selectModule.customCss = selectModule.customCss.filter(
            (item: any) => item.prop !== 'moduleTitleIcon'
          );
        }
      }
    });

    cancle();
  };
</script>
<style lang="scss">
  .create-template-module-title-select-warpper {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr); /* 每行展示5个图片 */
    gap: 16px; /* 设置行间距和水平间距 */
    min-height: 400px;
    .img-box {
      display: flex;
      width: 100%;
      height: auto;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: rgba(99, 100, 99, 0.2) 0px 0px 10px;
      position: relative;
      &:hover {
        box-shadow: rgba(99, 100, 99, 0.5) 0px 0px 10px;
      }
      .current-mark-bgc {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        right: 0;
        top: 0;
        border: 15px solid;
        border-color: #2ddd9d #2ddd9d transparent transparent;
        z-index: 10;
      }
      // 标记当前模板
      .current-mark {
        position: absolute;
        right: 3px;
        top: 0px;
        z-index: 11;
      }
      img {
        width: 100%;
        height: 100%;
      }
      .module-title-component-name {
        position: absolute;
        bottom: 0;
        right: 0px;
        font-size: 10px;
        background: #ff9971;
        color: #fff;
        padding: 2px 6px;
        border-radius: 8px 0 0 0;
      }
    }
  }
</style>
