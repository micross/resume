

// 查询分类列表
export const getCategoryListAsync: any = async() => {
  const response = await useAPI.get(`/common/getCategoryList`);
  return response.data.value;
};
