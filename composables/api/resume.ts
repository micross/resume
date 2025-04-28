// 查询模板列表
export const getTemplateListAsync: any = async (params: any) => {
  const response = await useAPI.get(`/common/getTemplateList`, params);
  return response.data.value;
};

// 查询单个简历数据-有草稿则会返回草稿
export const getTemplateInfoAsync: any = async (id: string) => {
  const response = await useAPI.get(`/resume/template/${id}`);
  return response.data.value;
};

// 查询单个简历模板数据
export const getResetTemplateInfoAsync: any = async (id: string) => {
  const response = await useAPI.get(`/resume/templateReset/${id}`);
  return response.data.value;
};

// 保存用户简历
export const updateUserresumeAsync: any = async (data: any) => {
  const response = await useAPI.post(`/userresume/template`, data);
  return response.data.value;
};

// 查询用户简历列表
export const getUserResumeListAsync: any = async (params: any) => {
  const response = await useAPI.get(`/userresume/templateList`, params);
  return response.data.value;
};

// 查询模板列表全部数据
export const getResumeListAllAsync: any = async (params: any) => {
  const response = await useAPI.get(`/resume/templateListAll`, params);
  return response.data.value;
};

// 用户删除自己的简历
export const deleteUserResumeAsync: any = async (id: string) => {
  const response = await useAPI.delete(`/userresume/deleteResume/${id}`);
  return response.data.value;
};

// 导出为pdf
export const getResumePdfAsync: any = async (params: any) => {
  const response = await useAPI.get(`/pdf/getPdf`, params);
  return response.data.value;
};

// 导出为PNG
export const getPNGAsync: any = async (params: any) => {
  const response = await useAPI.get(`/pdf/getPNG`, params);
  return response.data.value;
};


// 用户查询自己贡献的模板列表
export const getMyContributeTemplateListAsync: any = async (params: any) => {
  const response = await useAPI.get(`/resume/getMyContributeTemplateList`, params);
  return response.data.value;
};
