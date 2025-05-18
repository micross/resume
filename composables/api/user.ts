// 登录
interface ILogin {
  email: string;
  password: string;
}
export const loginAsync: any = async (data: ILogin) => {
  const response = await useAPI.post(`/auth/email_login`, data);
  return response;
};

// 注册
interface IRegister {
  name: string;
  email: string;
  password: string;
}
export const registerAsync: any = async (data: IRegister) => {
  const response = await useAPI.post(`/user/register`, data);
  return response;
};

// 发送邮箱验证码
export const sendCodeAsync: any = async (data: any) => {
  const response = await useAPI.post(`/auth/register-code`, data);
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

// 查询用户列表
export const getAllUserListAsync: any = async (params: any) => {
  const response = await useAPI.get(`/users/getAllUser`, params);
  return response;
};

// 修改用户头像
export const updateUserAvatarAsync: any = async (data: any) => {
  const response = await useAPI.put(`/users/updateAvatar`, data);
  return response;
};

// 更新用户个人信息
export const updatePersonInfoAsync: any = async (data: any) => {
  const response = await useAPI.put(`/users/updatePersonInfo`, data);
  return response;
};

// QQ登录
export const qqLoginASync: any = async (params: any) => {
  const response = await useAPI.get(`https://graph.qq.com/oauth2.0/authorize`, params);
  return response;
};

// 判断用户是否拥有管理权限
export const getUserPermissionAsync: any = async () => {
  const response = await useAPI.get(`/users/getUserPermission`);
  return response;
};
