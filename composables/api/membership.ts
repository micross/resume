

// 查询用户会员信息
export const getUserMembershipAsync: any = async () => {
  const response = await useAPI.get(`/memberships/getUserMembership`);
  return response;
};