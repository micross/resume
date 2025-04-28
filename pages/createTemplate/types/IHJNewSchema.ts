

// 模块列表类型
interface IModulesList {
  [key: string]: {
    id: string;
    moduleChName: string;
    category: string;
    icon: string;
    props: Record<string, any>;
    dataSource: Record<string, any>;
    css: Record<string, any>;
    list: Array<any>;
  };
}

interface ISetterMap {
  [propName: string]: any;
}


export type {IModulesList, ISetterMap };
