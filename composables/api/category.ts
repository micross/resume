

// 查询分类列表
export const getCategoryListAsync: any = async() => {
  const response = await useAPI.get(`/resume/common/getCategoryList`);
  return response.data.value;
};
