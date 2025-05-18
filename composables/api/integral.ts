// 查询用户简币
export const getUserIntegralTotalAsync: any = async () => {
  const response = await useAPI.get(`/resume/integral/getUserIntegralTotal`);
  return response;
};

// 添加用户简币信息
export const addIntegralLogAsync: any = async (data: any) => {
  const response = await useAPI.post(`/resume/integral/addIntegralLog`, data);
  return response;
};

// 查询用户简币日志
export const getUserIntegralLogsAsync: any = async (params: any) => {
  const response = await useAPI.get(`/resume/point-logs`, params);
  return response;
};

// 用户消费简币
export const payIntegralLogAsync: any = async (data: any) => {
  const response = await useAPI.post(`/resume/integral/payIntegralLog`, data);
  return response;
};

// 查询用户是否消费过该资源
export const getUserIsPayGoodsAsync: any = async (params: any) => {
  const response = await useAPI.get(`/resume/integral/getUserIsPayGoods`, params);
  return response;
};


// 获取支付二维码
export const aliPayAsync: any = async (data: any) => {
  const response = await useAPI.post(`/resume/members/orders`, data);
  return response;
};

// 查询订单状态
export const tradeQueryAsync: any = async(id: any) => {
  const response = await useAPI.get(`/resume/orders/${id}`);
  return response;
};

// 用户查询个人支付订单
export const getUserOrderListAsync: any = async (params: any) => {
  const response = await useAPI.get(`/resume/orders`, params);
  return response;
};
