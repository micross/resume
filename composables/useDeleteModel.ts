/**
 * @description 删除或关闭当前模块
 */

import { useResumeJsonNewStore } from "~/store/resume";

// 删除当前模块
export const useDeleteModel = (modelItem: any) => {
  const { resumeJsonNewStore } = useResumeJsonNewStore();
  const index = resumeJsonNewStore.COMPONENTS.findIndex((item) => item.keyId === modelItem.keyId); // 需要复制的模块的索引
  let sum = 0; // 是否有相同的模块
  resumeJsonNewStore.COMPONENTS.forEach((item) => {
    if (item.model === modelItem.model) {
      sum++;
    }
  });
  if (sum > 1) {
    resumeJsonNewStore.COMPONENTS.splice(index, 1);
  } else {
    resumeJsonNewStore.COMPONENTS[index].show = false;
  }
};
