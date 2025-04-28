

// 查询用户相关数据
export const getUserPanelAsync: any = async () => {
  const response = await useAPI.get(`/panel/userPanel`);
  return response.data.value;
};

