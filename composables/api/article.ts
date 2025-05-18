// 查询文章分类列表
export const getArticleCategoryListAsync: any = async () => {
  const response = await useAPI.get(`/resume/article/getArticleCategoryList`);
  return response.data.value;
};


// 查询单条文章信息
export const getArticleInfoAsync: any = async (id: string) => {
  const response = await useAPI.get(`/resume/article/getArticleInfo/${id}`);
  return response.data.value;
};


// 用户查询文章列表
export const userGetArticleListAsync: any = async (params: any) => {
  const response = await useAPI.get(`/resume/article/userGetArticleList`, params);
  return response.data.value;
};

// 查询部署文章详情
export const userGetArticleDetailAsync: any = async (params: any) => {
  const response = await useAPI.get(`/resume/article/userGetArticleDetail`, params);
  return response.data.value;
};
