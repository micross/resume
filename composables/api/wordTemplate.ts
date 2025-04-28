// 查询word分类
export const getWordCategoryListAsync: any = async () => {
  const response = await useAPI.get(`/words/categories`);
  return response;
};

// 查询word模板列表，不查询详细信息
export const getWordTemplateListAsync: any = async (params: any) => {
  const response = await useAPI.get(`/words`, params);
  return response;
};

// 查询单个word模板详细信息
export const getWordTemplateInfoAsync: any = async (id: string) => {
  const response = await useAPI.get(`/words/detail/${id}`);
  return response;
};

// 获取word模板下载链接
export const wordDownloadUrl: any = async (id: string) => {
  const response = await useAPI.get(`/words/download/${id}`);
  return response;
};

// 查询所有标签列表
export const getWordTemplateTagsListAsync: any = async () => {
  const response = await useAPI.get(`/words/tags`);
  return response;
};
