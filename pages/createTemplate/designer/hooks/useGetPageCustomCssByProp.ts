import { storeToRefs } from 'pinia';
import { useCreateTemplateStore } from '~/store/createTemplate';

// 通过prop，查询自定义样式的css
export const useGetPageCustomCssByProp = (prop: string) => {
  const { HJNewJsonStore } = storeToRefs(useCreateTemplateStore());
  for (let i = 0; i < HJNewJsonStore.value.customCss.length; i++) {
    const element = HJNewJsonStore.value.customCss[i];
    if (prop === element.prop) {
      return element;
    }
  }
  return null;
};
