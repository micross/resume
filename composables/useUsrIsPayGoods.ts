import { getUserIsPayGoodsAsync } from '~/composables/api/integral';
import { ElMessage } from 'element-plus';

/**
 * @description 返回用户是否支付该资源
 */
export const useUserIsPayGoods = async (id: any) => {
  return new Promise(async (resolve, reject) => {
    const isPay = ref<boolean>(false);
    const token = useState('token').value; // 判断是否登录
    if (!token) {
      return isPay.value;
    } else {
      const params = {
        integralPayGoodsId: id
      };
      const data = await getUserIsPayGoodsAsync(params);
      if (data.data.status === 200) {
        isPay.value = data.data.data;
        resolve(isPay.value);
      } else {
        ElMessage.error(data.data.message);
        resolve(false);
      }
      reject(false);
    }
  });
};
