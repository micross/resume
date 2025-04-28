import { useLoadingStore } from './loading';
import { useResumeJsonNewStore, useSelectMaterialStore } from './resume';
import { useUuidStore } from './uuid';
import { useUserInfoStore } from './user';
import { useRefreshStore } from './refresh';
import { useWebsiteConfigStore } from './websiteConfig';
import { useMembershipStore } from './membership';
import { useCreateTemplateStore } from './createTemplate';

export interface IAppStore {
  useLoadingStore: ReturnType<typeof useLoadingStore>;
  useUuidStore: ReturnType<typeof useUuidStore>;
  useSelectMaterialStore: ReturnType<typeof useSelectMaterialStore>;
  useResumeJsonNewStore: ReturnType<typeof useResumeJsonNewStore>;
  useUserInfoStore: ReturnType<typeof useUserInfoStore>;
  useRefreshStore: ReturnType<typeof useRefreshStore>;
  useWebsiteConfigStore: ReturnType<typeof useWebsiteConfigStore>;
  useMembershipStore: ReturnType<typeof useMembershipStore>;
  useCreateTemplateStore: ReturnType<typeof useCreateTemplateStore>;
}

