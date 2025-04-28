import type { ResumeComponent } from "~/lib";


// 通过prop，查询自定义样式的css
export const useGetCustomCssByProp = (prop: string, module: ResumeComponent) => {
  for (let i = 0; i < module.customCss.length; i++) {
    const element = module.customCss[i];
    if (prop === element.prop) {
      return element;
    }
  }
  return null;
};
