
// 查询单个word模板详细信息
export const getWordTemplateInfoAsync: any = async (id: string) => {
  const response = await useAPI.get(`/resume/words/detail/${id}`);
  return response;
};

// 获取word模板下载链接
export const wordDownloadUrl: any = async (id: string) => {
  const response = await useAPI.get(`/resume/words/download/${id}`);
  return response;
};