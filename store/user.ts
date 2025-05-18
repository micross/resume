import { getUserIntegralTotalAsync } from '~/composables/api/integral';
import { defineStore } from 'pinia';
import type { Me } from '~/lib/schema/user';

declare type Nullable<T> = T | null;

export interface UserState {
  user: Nullable<Me>;
};

// 用户信息
export const useUserInfoStore = defineStore('userInfoStore', () => {

  const user = ref({
    user: null
  } as UserState);

  const setUser = (u: Me | null) => {
    user.value.user = u
  };

  // 用户简币
  const userIntegralInfo = ref<any>(0);

  function saveIntegralInfo(integalInfo: any) {
    userIntegralInfo.value = integalInfo;
  }

  // 查询用户当前用户简币信息
  async function getUserIntegralTotal() {
    const data = await getUserIntegralTotalAsync();
      saveIntegralInfo(data.data);
  }
  return {
    user,
    setUser,
    userIntegralInfo,
    saveIntegralInfo,
    getUserIntegralTotal
  };
});
