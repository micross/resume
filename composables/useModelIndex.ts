import { useResumeJsonNewStore, useSelectMaterialStore } from "~/store/resume";

/**
 * @description 返回选中模块的索引
 */
export const useModelIndex = () => {
  const { resumeJsonNewStore } = useResumeJsonNewStore();
  const { cptKeyId } = useSelectMaterialStore();
  return resumeJsonNewStore.COMPONENTS.findIndex((item) => item.keyId === cptKeyId); // 选中的索引
};
