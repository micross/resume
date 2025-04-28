// 获取专属邀请码
export const getInviteCodeAsync: any = async () => {
  const response = await useAPI.get(`/invitations/getInviteCode`);
  return response.data.value;
};
