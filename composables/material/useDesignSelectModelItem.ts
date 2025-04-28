
import { storeToRefs } from 'pinia';
import { useResumeJsonNewStore, useSelectMaterialStore } from '~/store/resume';

// 获取选中的组件数据
const useDesignSelectModelItem = () => {
  // 选中的模块
  const { cptKeyId } = storeToRefs(useSelectMaterialStore());
  const { resumeJsonNewStore } = storeToRefs(useResumeJsonNewStore());
  const modelItem = reactive(
    resumeJsonNewStore.value.COMPONENTS.find((item) => item.keyId === cptKeyId.value)
  ); // 通过keyId获取选中的模块

  return {
    modelItem
  };
};
export default useDesignSelectModelItem;
