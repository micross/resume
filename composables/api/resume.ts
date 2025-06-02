

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