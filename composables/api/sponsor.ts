// 查询赞助列表
export const getSponsorListAsync: any = async (params: any) => {
  const response = await useAPI.get(`/common/getSponsorList`, params);
  return response.data.value;
};

