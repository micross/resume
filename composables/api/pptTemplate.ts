// 查询ppt分类
export const getPPTCategoryListAsync: any = async () => {
  const response = await useAPI.get(`/ppts/categories`);
  return response;
};

// 查询ppt模板列表，不查询详细信息
export const getPPTTemplateListAsync: any = async (params: any) => {
  const response = await useAPI.get(`/ppts`, params);
  return response;
};

// 查询单个ppt模板详细信息
export const getPPTTemplateInfoAsync: any = async(id: string) => {
  const response = await useAPI.get(`/ppts/detail/${id}`);
  return response;
};

// 获取ppt模板下载链接
export const pptDownloadUrl: any = async (id: string) => {
  const response = await useAPI.get(`/ppts/download/${id}`);
  return response;
};

// 查询所有标签列表
export const getPPTTemplateTagsListAsync: any = async () => {
  const response = await useAPI.get(`/ppts/tags`);
  return response;
};
