import type { DirectiveBinding } from 'vue';
import { useWebsiteConfigStore } from '~/store/websiteConfig';

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.directive('config', {
    mounted(el, binding: DirectiveBinding) {
      nextTick(() => {
        const configStore: any = useWebsiteConfigStore().websiteConfig;
        const configKey = binding.arg;
        if (!configKey || !configStore[configKey]) {
          el.style.display = 'none';
        }
      });
    },
    updated(el, binding: DirectiveBinding) {
      nextTick(() => {
        const configStore: any = useWebsiteConfigStore().websiteConfig;
        const configKey = binding.arg;
        if (!configKey || !configStore[configKey]) {
          el.style.display = 'none';
        } else {
          el.style.display = '';
        }
      });
    }
  });
});
