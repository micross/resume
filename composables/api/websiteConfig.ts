
// 查询网站配置
export const getWebsiteConfigAsync: any = async () => {
  const response = await useAPI.get(`/resume/feature/flags`);
  return response.data;
};
