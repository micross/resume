<template>
  <TooltipProvider size="small" :locale="zhCn">
    <ClientOnly>
      <NavBar bg-color="#fff" font-color="green" position="sticky" icon-color="green"></NavBar>
      <div class="person-box">
        <!-- 头部背景 -->
        <div class="bgc-img">
          <img src="@/assets/images/person-bgc.png" alt="" srcset="" />
        </div>
        <!-- 个人菜单卡片 -->
        <LeftCard />

        <!-- 右侧路由区域 -->
        <div class="right-content-box">
          <div class="menu-title">
            <!-- 菜单标题 -->
            <ContentTitle v-if="showTitle" :title="(route.meta.title as string)"></ContentTitle>
          </div>
          <div class="router-box">
            <slot />
          </div>
        </div>
      </div>
    </ClientOnly>
  </TooltipProvider>
</template>
<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import LeftCard from '~/components/profile/LeftCard.vue';

const route = useRoute();
const showTitle = computed(() => {
  return route.meta.showTitle;
});
</script>
<style lang="scss" scoped>
.person-box {
  width: 1250px;
  min-height: 300px;
  margin: 0px auto;
  box-shadow: 0 5px 21px 0 rgb(78 78 78 / 5%);
  background-color: #fff;
  border-radius: 0 0 5px 5px;
  position: relative;
  z-index: 0;
  padding: 50px 50px;
  box-sizing: border-box;
  display: flex;

  .bgc-img {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;

    img {
      width: 100%;
      height: 280px;
    }
  }
}

.right-content-box {
  flex: 1;
  min-height: 300px;
  margin: 270px 0 0px 30px;
  box-sizing: border-box;

  .router-box {
    padding: 0 0 20px 0;
  }
}
</style>