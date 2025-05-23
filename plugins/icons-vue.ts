// 注册所有 @element-plus/icons-vue 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export default defineNuxtPlugin((nuxtApp) => {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        nuxtApp.vueApp.component(key, component);
    }
});

