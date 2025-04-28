

// 查询AI模型列表
export const aiModelListAsync: any = async (params: any) => {
  const response = await useAPI.get(`/ai/getModelList`, params);
  return response;
};

// 新增模型
export const addModelAsync: any = async (data: any) => {
  const response = await useAPI.post(`/ai/addModel`, data);
  return response;
};

// 修改模型
export const updateModelAsync: any = async (data: any) => {
  const response = await useAPI.post(`/ai/updateIntegralPayConfig`, data);
  return response;
};

// 删除模型
export const deleteModelAsync: any = async (id: string) => {
  const response = await useAPI.delete(`/ai/deleteModel/${id}`);
  return response;
};

// AI润色
export const polishTextAsync: any = async (data: any) => {
  const response = await useAPI.post(`/ai/polishText`, data);
  return response;
};

// AI创作
export const createTextAsync: any = async (data: any) => {
  const response = await useAPI.post(`/ai/createText`, data);
  return response;
};

// AI翻译
export const translateTextAsync: any = async (data: any) => {
  const response = await useAPI.post(`/ai/translate`, data);
  return response;
};

// 取消AI请求
export const cancleAiTranslateTextAsync: any = () => {
  //return http.cancelRequest('/huajian/ai/translateText');
};

// 流式AI润色
export const polishTextStreamAsync: any = (
  data: any,
  onMessage: (chunk: string | object) => void,
  onError: (error: any) => void,
  onComplete?: () => void // 新增 onComplete 回调
) => {
  return useNuxtApp().$streamRequest(
    '/ai/polish-text',
    data,
    onMessage,
    onError,
    onComplete // 传递 onComplete 回调
  );
};

// 取消流式AI润色
export const cancelPolishTextStreamAsync: any = (controller: AbortController) => {
  controller.abort(); // 取消请求
};

// AI创作（流式传输）
export const createTextStreamAsync: any = (
  data: any,
  onMessage: (chunk: string | object) => void,
  onError: (error: any) => void,
  onComplete?: () => void // 新增 onComplete 回调
) => {
  return useNuxtApp().$streamRequest(
    '/ai/create-text',
    data,
    onMessage,
    onError,
    onComplete // 传递 onComplete 回调
  );
};

// 取消流式AI创作
export const cancelCreateTextStreamAsync: any = (controller: AbortController) => {
  controller.abort(); // 取消请求
};

// 查询简历创作模型列表
export const getCreateModelListAsync: any = async() => {
  const response = await useAPI.get(`/ai/models`);
  return response;
};

// 查询AI简历优化需要的简币数量
export const getOptimizeResumeIntegralAsync: any = async () => {
  const response = await useAPI.get(`/ai/getOptimizeResumeIntegral`);
  return response;
};

// 查询AI简历智能生成需要的简币数量
export const getGenerateResumeIntegralAsync: any = async () => {
  const response = await useAPI.get(`/ai/getGenerateResumeIntegral`);
  return response;
};

// 查询AI简历优化支持的模型列表
export const getOptimizeResumeModelListAsync: any = async () => {
  const response = await useAPI.get(`/ai/getOptimizeResumeModelList`);
  return response;
};

// 查询AI简历智能生成支持的模型列表
export const getGenerateResumeModelListAsync: any = async () => {
  const response = await useAPI.get(`/ai/getGenerateResumeModelList`);
  return response;
};

// 流式传输AI简历优化文本
export const optimizeResumeStreamAsync: any = (
  data: any,
  onMessage: (chunk: string | object) => void,
  onError: (error: any) => void,
  onComplete?: () => void
) => {
  return useNuxtApp().$streamRequest(
    '/ai/optimizeResumeStream',
    data,
    onMessage,
    onError,
    onComplete
  );
};

// 取消流式传输AI简历优化文本
export const cancelOptimizeResumeStreamAsync: any = (controller: AbortController) => {
  controller.abort(); // 取消请求
};

// 查询用户AI简历诊断列表
export const getAiOptimizeLogsListAsync: any = (params: any) => {
  // return http.request({
  //   url: '/huajian/ai/getAiOptimizeLogsList',
  //   method: 'get',
  //   params: params
  // });
};

// AI生成简历（流式传输）
export const generateResumeStreamAsync: any = (
  data: any, // 生成简历的参数
  onMessage: (chunk: string | object) => void, // 流式数据回调
  onError: (error: any) => void, // 错误回调
  onComplete?: () => void // 完成回调
) => {
  return useNuxtApp().$streamRequest(
    '/ai/generateResumeStream', // 后端接口路径
    data, // 请求参数
    onMessage, // 流式数据回调
    onError, // 错误回调
    onComplete // 完成回调
  );
};

// 取消流式传输AI生成简历
export const cancelGenerateResumeStreamAsync: any = (controller: AbortController) => {
  controller.abort(); // 取消请求
};
