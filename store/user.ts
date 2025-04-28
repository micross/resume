import { getUserIntegralTotalAsync } from '~/composables/api/integral';
import { getUserInfoAsync } from '~/composables/api/user';
import { defineStore } from 'pinia';
import { useMembershipStore } from './membership';
import { ElMessage } from 'element-plus';

// 用户信息
export const useUserInfoStore = defineStore('userInfoStore', () => {
  const userInfo = ref<any>(
    useState('userInfo').value ? JSON.parse(useState('userInfo').value as string) : ''
  );
  // 用户简币
  const userIntegralInfo = ref<any>(0);

  function saveUserInfo(userInfoObj: any) {
    userInfo.value = userInfoObj;
    useState('userInfo').value = JSON.stringify(userInfo.value);
  }

  function saveIntegralInfo(integalInfo: any) {
    userIntegralInfo.value = integalInfo;
  }

  // 查询用户信息
  async function getAndUpdateUserInfo() {
    const data = await getUserInfoAsync();
    console.log(data);
    saveUserInfo(data);
    // 查保存用户会员信息
    const { saveMembershipInfo } = useMembershipStore();
    //saveMembershipInfo(data.membershipInfo);
  }

  // 查询用户当前用户简币信息
  async function getUserIntegralTotal() {
    const data = await getUserIntegralTotalAsync();
      saveIntegralInfo(data.data);
  }
  return {
    userInfo,
    userIntegralInfo,
    saveUserInfo,
    saveIntegralInfo,
    getAndUpdateUserInfo,
    getUserIntegralTotal
  };
});
