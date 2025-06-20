<!-- 首页标题栏 - 使用Shadcn UI重构 -->
<template>
  <div :class="['nav-bar-box', { 'background-nav': props.bgColor ? true : false }]">
    <logo-com :icon-color="iconColor ? iconColor : '#fff'" :font-color="fontColor ? fontColor : '#fff'"></logo-com>
    <div v-config:open_homne_menu class="center">
      <div class="navigation-menu-wrapper">
        <NavigationMenu :default-value="route.path">
          <NavigationMenuList>
            <template v-for="(item, index) in indexMenuList" :key="index">
              <!-- 只显示启用中的 -->
              <NavigationMenuItem>
                <NavigationMenuLink  :href="item.path" :active="route.path === item.path">
                  {{ item.title }}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </template>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
    <!-- 右侧功能区 -->
    <div class="right">
      <!-- 开通会员 -->
      <div v-config:open_membership class="membership-box" @click="toMembership">
        <div v-if="!membershipInfo.hasMembership" class="content-box">开通会员 </div>
        <div v-else-if="membershipInfo.hasMembership && membershipInfo.daysRemaining > 0" class="content-box">
          <img src="@/assets/images/membership.svg" alt="会员" title="会员" width="20" />
          <span v-if="membershipInfo.type === 'lifetime'">永久会员</span>
          <span v-else>还剩{{ membershipInfo.daysRemaining }}天到期</span>
        </div>
        <!-- 已过期 -->
        <div v-else class="content-box expiredDays">
          <span>已过期{{ membershipInfo.expiredDays }}天</span>
        </div>
      </div>
      <!-- 简币 -->
      <div v-config:open_get_source_code class="jb-num-box" @click="toMyIntegral">
        <div class="content">
          <img width="22" src="@/assets/images/jianB.png" alt="简币" title="简币 - 您的专属虚拟货币" />
          <span>{{ useUserInfoStore().userIntegralInfo.integralTotal || 0 }}</span>
        </div>
      </div>
      <!-- 登录注册以及用户展示区域 -->
      <div class="user-box">
        <div v-if="!useUserInfoStore().user" class="logon-register-box">
          <NuxtLink to="/auth/login">
            <Button  size="sm" class="login-btn">登录</Button>
          </NuxtLink>
          <NuxtLink to="/auth/register">
            <Button size="sm" class="register-btn">注册</Button>
          </NuxtLink>
        </div>
        <div v-else :class="[
          'user-avatar-box',
          { 'user-avatar-box-vip': membershipInfo.hasMembership && !membershipInfo.isExpired }
        ]">
          <!-- vip图标 -->
          <div v-if="membershipInfo.hasMembership && !membershipInfo.isExpired" class="user-vip-icon">
            <img src="@/assets/images/membership.svg" alt="会员" title="会员" width="18" />
          </div>
          <Tooltip>
            <TooltipTrigger>
              <Avatar 
                v-if="useUserInfoStore().user.avatar" 
                :src="useUserInfoStore().user.avatar" 
                :size="45" 
                :alt="useUserInfoStore().user.name" 
                class="cursor-pointer"
              />
              <Avatar 
                v-else 
                :size="45" 
                :fallback="useUserInfoStore().user.name" 
                class="cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent>
              <div class="dropdown-menu">
                <div class="dropdown-item" @click="toPerson">个人中心</div>
                <div class="dropdown-item" @click="toMyIntegral">我的资产</div>
                <div class="dropdown-item" @click="loginout">退出登录</div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMembershipStore } from '~/store/membership';
import { useUserInfoStore } from '~/store/user';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList} from '@/components/ui/navigation-menu';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface IBgcColor {
  bgColor?: string;
  fontColor?: string;
  position?: string;
  iconColor?: string;
}
const route = useRoute();
const props = withDefaults(defineProps<IBgcColor>(), {
  bgColor: '',
  fontColor: '',
  iconColor: '#fff',
  position: 'fixed'
});

const indexMenuList = [{
  name: '在线制作',
  path: '/resume',
  title: '在线制作',
}, {
  name: '简历模板',
  path: '/word',
  title: '简历模板',
}, {
  name: 'PPT模板',
  path: '/ppt',
  title: 'PPT模板',
}, {
  name: '源码获取',
  path: '/webcode',
  title: '源码获取',
}
];

// 获取用户会员信息
const { membershipInfo } = storeToRefs(useMembershipStore());

const nameColor = computed(() => {
  return props.fontColor ? '#2ddd9d' : 'green';
});

const router = useRouter();

// 跳转至个人中心页
const toPerson = () => {
  router.push('/profile');
};

// 跳转至开通会员
const toMembership = () => {
  router.push('/membership');
};

// 跳转至我的资产
const toMyIntegral = () => {
  router.push('/profile/points');
};

// 退出登录
const { setUser } = useUserInfoStore();
const { saveIntegralInfo } = useUserInfoStore();
const { saveMembershipInfo } = useMembershipStore();
const loginout = () => {
  saveIntegralInfo(''); // 清除用户简币信息
  saveMembershipInfo(''); // 清除会员信息
  setUser(null);
  router.push('/');
};

</script>
<style lang="scss" scoped>
.background-nav {
  // 增强毛玻璃效果
  backdrop-filter: blur(16px); // 增加模糊强度
  -webkit-backdrop-filter: blur(12px); // Safari 和其他 WebKit 浏览器
  background-color: rgba(255, 255, 255, 0.5); // 半透明背景（浅色）

  // 备用背景颜色（如果浏览器不支持毛玻璃效果）
  @supports not (backdrop-filter: blur(12px)) {
    background-color: v-bind('props.bgColor');
  }
}

.nav-bar-box {
  display: flex;
  height: 65px;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  user-select: none;
  padding: 0 30px;
  position: v-bind('props.position');
  top: 0;
  transition: all 0.3s;

  .center {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 2vw;

    .navigation-menu-wrapper {
      
      :deep(.navigation-menu-list) {
        display: flex;
        background-color: transparent;
      }

      :deep(.navigation-menu-item) {
        display: flex;
        align-items: center;
      }

      :deep(.navigation-menu-link) {
        display: flex;
        align-items: center;
        padding: 0 15px;
        letter-spacing: 3px;
        font-size: 16px;
        font-weight: 550;
        border-bottom: 4px solid transparent;
        transition: all 0.3s;
        // 渐变字体
        background: linear-gradient(45deg, #2ddd9d, #137c56);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;

        &:hover {
          border-color: #2ddd9d;
          background-color: rgba(#ccc, 0.1);
        }

        &.active {
          border-bottom: 4px solid #2ddd9d !important;
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;

    .membership-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 10px;
      height: 28px;
      cursor: pointer;
      transition: all 0.3s;
      flex-shrink: 0;

      &:hover {
        opacity: 0.9;
      }

      .content-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        height: 100%;
        background-color: #83ffd1;
        border-radius: 15px;
        font-size: 13px;

        span {
          font-size: 12px;
          letter-spacing: 1px;
          color: #617745;
          margin: 2px 0 0 4px;
        }

        .svg-icon {
          margin-right: 5px;
        }
      }

      .expiredDays {
        background-color: #3b7962;

        span {
          color: rgb(237, 218, 218);
        }
      }
    }

    .jb-num-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 10px;
      height: 28px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        opacity: 0.9;
      }

      .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        height: 100%;
        background-color: #83ffd1;
        border-radius: 15px;

        span {
          margin-left: 5px;
          font-size: 12px;
          letter-spacing: 1px;
          color: #617745;
          margin-top: 2px;
        }

        img {
          margin-right: 5px;
        }
      }
    }

    .user-box {
      display: flex;

      .logon-register-box {
        display: flex;

        .login-btn,
        .register-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 30px;
          width: 65px;
          background-color: #2ddd9d;
          color: #fff;
          border: none;
        }

        .register-btn {
          margin-left: 15px;
        }
      }

      .user-avatar-box {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 15px;
        cursor: pointer;
        position: relative;
        right: -7px;
        bottom: 0;
        z-index: 1;

        .user-vip-icon {
          position: absolute;
          right: 13px;
          top: -12px;
          z-index: 2;
        }

        .name-content {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: v-bind('nameColor');
          background-color: v-bind('iconColor');
        }
      }

      .user-avatar-box-vip {
        position: relative;
        width: 45px;
        /* 同步实际头像尺寸 */
        height: 45px;
        border-radius: 50%;
        background: #fff;
      }

      .user-avatar-box-vip::before {
        content: '';
        position: absolute;
        top: -1px;
        /* 超细边框偏移量 */
        left: -1px;
        right: -1px;
        bottom: -1px;
        background: linear-gradient(45deg, #ffd700 25%, #ffaa00 50%, #ffd700 75%);
        background-size: 200% 100%;
        /* 优化小尺寸渐变效果 */
        border-radius: 50%;
        animation: vip-glow 4s linear infinite;
        /* 减慢动画速度 */
        z-index: -1;
      }

      .user-avatar-box-vip::after {
        content: '';
        position: absolute;
        top: 0;
        /* 贴合主容器 */
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        box-shadow: 0 0 3px rgba(255, 215, 0, 0.3);
        /* 微型发光 */
        animation: vip-shine 2s ease-in-out infinite;
      }

      @keyframes vip-glow {
        0% {
          background-position: 200% 50%;
          transform: rotate(0deg);
        }

        100% {
          background-position: -200% 50%;
          transform: rotate(360deg);
        }
      }

      @keyframes vip-shine {

        0%,
        100% {
          opacity: 0.6;
          box-shadow: 0 0 2px #ffd70033;
        }

        50% {
          opacity: 1;
          box-shadow: 0 0 4px #ffd70066;
        }
      }
    }
  }
}

// 下拉菜单样式
.dropdown-menu {
  min-width: 120px;
  padding: 8px 0;
  
  .dropdown-item {
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: rgba(#ccc, 0.1);
    }
  }
}
</style>
