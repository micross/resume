// 更新在线简历设置
export const updateOnlineResumeAsync: any = async (data: any) => {
  const response = await useAPI.put(`/userresume/updateOnlineResume`, data);
  return response;
};
