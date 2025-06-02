interface IRegister {
  name: string;
  email: string;
  password: string;
}
export const registerAsync: any = async (data: IRegister) => {
  const response = await useAPI.post(`/user/register`, data);
  return response;
};

// 重新发送邮件链接
export const resendVerificationAsync: any = async (email: string) => {
  const response = await useAPI.get(`/auth/email/resend-verification/${email}`);
  return response;
};

// 忘记密码-发送忘记密码邮件
export const forgetPasswordAsync: any = async (email: string) => {
  const response = await useAPI.get(`/auth/email/forgot-password/${email}`);
  return response;
};

// 重置密码
export const resetPasswordAsync: any = async (data: any) => {
  const response = await useAPI.post(`/auth/email/reset-password`, data);
  return response;
};

// 修改用户头像
export const updateUserAvatarAsync: any = async (data: any) => {
  const response = await useAPI.put(`/resume/users/updateAvatar`, data);
  return response;
};

// 更新用户个人信息
export const updatePersonInfoAsync: any = async (data: any) => {
  const response = await useAPI.put(`/resume/users/updatePersonInfo`, data);
  return response;
};
