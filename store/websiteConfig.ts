import { getWebsiteConfigAsync } from '~/composables/api/websiteConfig';
import { defineStore } from 'pinia';

export const useWebsiteConfigStore = defineStore('websiteConfig', () => {
  const websiteConfig = reactive<{
    open_sign: boolean;
    open_comment: boolean;
    open_person_in: boolean;
    open_get_source_code: boolean;
    open_sign_in: boolean;
    open_business: boolean;
    open_sponsor: boolean;
    open_membership: boolean;
    open_homne_menu: boolean;
  }>({
    open_sign: true,
    open_comment: true,
    open_person_in: true,
    open_get_source_code: true,
    open_sign_in: true,
    open_business: true,
    open_sponsor: true,
    open_membership: true,
    open_homne_menu: true
  });

  function saveWebsiteConfig(websiteConfigData: any) {
    // websiteConfig.open_comment = websiteConfigData.open_comment;
    // websiteConfig.open_sign = websiteConfigData.open_sign;
    // websiteConfig.open_person_in = websiteConfigData.open_person_in;
    // websiteConfig.open_get_source_code = websiteConfigData.open_get_source_code;
    // websiteConfig.open_sign_in = websiteConfigData.open_sign_in;
    // websiteConfig.open_business = websiteConfigData.open_business;
    // websiteConfig.open_sponsor = websiteConfigData.open_sponsor;
    // websiteConfig.open_membership = websiteConfigData.open_membership;
    // websiteConfig.open_homne_menu = websiteConfigData.open_homne_menu;
  }
  // 查询网站配置信息
  async function getWebsiteConfig() {
    const data = await getWebsiteConfigAsync();
    saveWebsiteConfig(data);
  }
  return {
    getWebsiteConfig,
    websiteConfig
  };
});
