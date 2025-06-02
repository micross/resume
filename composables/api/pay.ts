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

