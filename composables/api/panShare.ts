// 查询网盘资源分类列表
export const panShareCategroyListAsync: any = async() => {
  const response = await useAPI.get(`/common/panShareCategroyList`);
  return response.data.value;
};

// 查询所有标签列表
export const getPanShareTagsListAsync: any = async () => {
  const response = await useAPI.get(`/common/getPanShareTagsList`);
  return response.data.value;
};

// 查询网盘分享列表，不查询详细信息
export const getPanShareListAsync: any = async (params: any) => {
  const response = await useAPI.get(`/common/getPanShareList`, params);
  return response.data.value;
};


// 用户查询单个网盘资源，不带下载链接
export const getPanShareDetailByIdAsync: any = async (params: any) => {
  const response = await useAPI.get(`/common/getPanShareDetailById/${params.id}`, params);
  return response.data.value;
};

// 获取网盘资源下载链接
export const panShareDownloadUrlAsync: any = async (id: string) => {
  const response = await useAPI.get(`/panShare/panShareDownloadUrl/${id}`);
  return response.data.value;
};
