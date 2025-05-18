
// 保存草稿
export const saveDraftAsync: any = async (data: any) => {
  const response = await useAPI.post(`/resume/user-templates`, data);
  return response;
};

// 根据模版id查询用户简历
export const getUsertemplateAsync: any = async (id: string) => {
  const response = await useAPI.get(`/resume/user-templates/${id}`);
  return response;
};

// 用户分页查询个人简历列表
export const getMyResumeListAsync: any = async (params: any) => {
  const response = await useAPI.get(`/resume/user-templates`, params);
  return response;
};

// 删除个人简历
export const deleteUserResumeAsync: any = async (params: { id: any }) => {
  const response = await useAPI.delete(`/resume/createUserTemplate/deleteUserResume/${params.id}`);
  return response;
};
