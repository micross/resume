
// 用户申请友链
export const applyLinksAsync: any = async (data: any) => {
  const response = await useAPI.post(`/resume/links/applyLinks`, data);
  return response.data.value;
};
