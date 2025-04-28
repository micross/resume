

// 查询所需要的简币数
export const getIntegralPayNumberAsync: any = async (params: any) => {
  const response = await useAPI.get(`/common/getIntegralPayNumber`, params);
  return response;
};
