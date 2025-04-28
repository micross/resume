

// 查询付费列表
export const getPaystatsListAsync: any = async (params: any) => {
  const response = await useAPI.get(`/paystats/getPaystatsList`, params);
  return response;
};

// 查询用户是否付费过，即是否有查看权限
export const userIsPayCodeAsync: any = async () => {
  const response = await useAPI.get(`/paystats/userIsPayCode`);
  return response;
};

// 获取微信支付页面地址
export const getPayURLAsync: any = async (data: any) => {
  const response = await useAPI.get(`/yiPay/getPayURL`, data);
  return response;
};

// 微信支付查询订单信息
export const wxtradeQueryAsync: any = async (params: any) => {
  const response = await useAPI.get(`/yiPay/tradeQuery`, params);
  return response;
};

