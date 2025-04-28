<template>
  <div class="person-menu-box">
    <el-menu :default-active="route.name" class="el-menu-vertical-demo">
      <ElMenuItem v-for="(item, index) in menuList" :key="index" :index="item.index">
        <NuxtLink :to="item.path">
          <svg-icon :icon-name="item.iconfont" class="iconfont" :color="getIconColor(item.index)"
            size="22px"></svg-icon>
          <span>{{ item.title }}</span>
        </NuxtLink>
      </ElMenuItem>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
// 菜单列表
const menuList = reactive<Array<any>>([
  {
    index: 'PersonDetail',
    iconfont: 'icon-jibenziliao',
    title: '个人信息',
    path: '/profile'
  },
  {
    index: 'PersonIntegral',
    iconfont: 'icon-jifen',
    title: '我的资产',
    path: '/profile/points'
  },
  {
    index: 'AccountSetting',
    iconfont: 'icon-shezhi',
    title: '账号设置',
    path: '/profile/setting'
  },
  {
    index: 'MyResume',
    iconfont: 'icon-xiangmujingli-04',
    title: '我的简历',
    path: '/profile/resume'
  }
]);

const route = useRoute();
const router = useRouter();
// 返回图标颜色
const currentIndex = ref<any>(route.name); // 选中的菜单index
const getIconColor = (index: number) => {
  return currentIndex.value === index ? '#2cbd99' : '#303133';
};

</script>
<style lang="scss" scoped>
.person-menu-box {
  padding: 30px 0 10px 0;

  .iconfont {
    margin-right: 15px;
  }
}
</style>
