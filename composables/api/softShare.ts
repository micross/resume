// 查询软件列表
export const getSoftShareListAsync: any = async (params: any) => {
  const response = await useAPI.get(`/softShare/getSoftShareList`, params);
  return response.data.value;
};

// 查询软件分类
export const getSoftCategoryListAsync: any = async () => {
  const response = await useAPI.get(`/common/getSoftCategoryList`);
  return response.data.value;
};

// 用户查询软件列表
export const getSoftShareCardListAsync: any = async(params: any) => {
  const response = await useAPI.get(`/common/getSoftShareCardList`, params);
  return response.data.value;
};

// 用户查询单个软件资源，不带下载链接
export const getSoftDetailByIdAsync: any = async (params: any) => {
  const response = await useAPI.get(`/common/getSoftDetailById/${params.id}`);
  return response.data.value;
};

// 获取软件下载链接
export const softDownloadUrl: any = async(id: string) => {
  const response = await useAPI.get(`/softShare/softDownloadUrl/${id}`);
  return response.data.value;
};
