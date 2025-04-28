
// 查询网站配置
export const getWebsiteConfigAsync: any = async () => {
  const response = await useAPI.get(`/feature/flags`);
  return response.data;
};
