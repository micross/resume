// 发布为线上简历
export const publishOnlineResumeAsync: any = async (data: any) => {
  const response = await useAPI.post(`/userresume/publishOnline`, data);
  return response.data.value;
};

// 查询用户的在线简历
export const getOnlineResumeAsync: any = async (id: string) => {
  const response = await useAPI.get(`/common/getOnlineResume/${id}`);
  return response.data.value;
};

// 更新在线简历设置
export const updateOnlineResumeAsync: any = async (data: any) => {
  const response = await useAPI.put(`/userresume/updateOnlineResume`, data);
  return response.data.value;
};
