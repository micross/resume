// 查询网站分享类型
export const getWebsiteTypeListAsync: any = async () => {
  const response = await useAPI.get(`/common/getWebsiteTypeList`);
  return response.data.value;
};

// 查询网站分享分类
export const getWebsiteCategoryListAsync: any = async (params: any) => {
  const response = await useAPI.get(`/common/getWebsiteCategoryList`, params);
  return response.data.value;
};

// 查询网站分享列表--分页查询
export const getWebsiteListPageAsync: any = async (params: any) => {
  const response = await useAPI.get(`/websiteShare/getWebsiteListPage`, params);
  return response.data.value;
};


// 根据网站类型查询出所有网站列表
export const getWebsiteListByTypeAsync: any = async (params: any) => {
  const response = await useAPI.get(`/common/getWebsiteListByType`, params);
  return response.data.value;
};

// 根据id查询网站详细信息
export const getWebsiteInfoAsync: any = async (params: any) => {
  const response = await useAPI.get(`/common/getWebsiteInfo/${params.id}`);
  return response.data.value;
};

// 根据网站类型和分类查询出网站列表
export const getWebsiteListByTypeAndCategoryAsync: any = async (params: any) => {
  const response = await useAPI.get(`/common/getWebsiteListByTypeAndCategory`, params);
  return response.data.value;
};


