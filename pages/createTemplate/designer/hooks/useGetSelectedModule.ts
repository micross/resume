
import { storeToRefs } from 'pinia';
import { useCreateTemplateStore } from '~/store/createTemplate';

export const useGetSelectedModule = (id: any) => {
  const { HJNewJsonStore } = storeToRefs(useCreateTemplateStore());
  for (let i = 0; i < HJNewJsonStore.value.componentsTree.length; i++) {
    if (id === HJNewJsonStore.value.componentsTree[i].id) {
      return HJNewJsonStore.value.componentsTree[i];
    }
  }
  return null;
};
