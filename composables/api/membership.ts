// 查询会员列表
export const getMembershipListAsync: any = async (params: any) => {
  const response = await useAPI.get(`/memberships/getMembershipList`, params);
  return response;
};

// 查询用户会员信息
export const getUserMembershipAsync: any = async () => {
  const response = await useAPI.get(`/memberships/getUserMembership`);
  return response;
};