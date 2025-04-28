/**
 * @description 复制当前模块
 */

import { getUuid } from '@/utils/common';
import { cloneDeep } from 'lodash'; // 深拷贝
import { useResumeJsonNewStore } from '~/store/resume';

// 复制当前模块
export const useCopyModel = (modelItem: any) => {
  console.log('modelItem', modelItem);
  const { resumeJsonNewStore } = useResumeJsonNewStore();
  const index = resumeJsonNewStore.COMPONENTS.findIndex((item) => item.keyId === modelItem.keyId); // 需要复制的模块的索引
  const deepItem = cloneDeep(modelItem);
  deepItem.keyId = getUuid();
  resumeJsonNewStore.COMPONENTS.splice(index, 0, deepItem);
  console.log('最新的resumeJsonNewStore', resumeJsonNewStore.COMPONENTS);
};
