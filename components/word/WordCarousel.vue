<template>
  <div class="word-carousel-box">
    <h1 class="title">详情</h1>
    <Carousel
      class="carousel-container"
      :opts="{ loop: true }"
    >
      <CarouselContent>
        <CarouselItem v-for="(item, index) in previewUrlList" :key="index">
          <div v-viewer class="img-box">
            <img :src="item" alt="Preview image" class="carousel-image" />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="carousel-nav-button" />
      <CarouselNext class="carousel-nav-button" />
    </Carousel>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

defineProps<{
  previewUrlList: Array<any>;
}>();

// 设置自动轮播
onMounted(() => {
  const interval = setInterval(() => {
    const nextButton = document.querySelector('[data-slot="carousel-next"]') as HTMLButtonElement;
    if (nextButton && !nextButton.disabled) {
      nextButton.click();
    }
  }, 4000); // 4秒间隔，与原组件相同

  // 组件销毁时清除定时器
  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>

<style lang="scss" scoped>
.word-carousel-box {
  width: 100%;
  flex: 1;
  
  .title {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 22px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  
  .carousel-container {
    height: 700px;
    position: relative;
  }
  
  .img-box {
    width: 500px;
    height: 680px;
    box-shadow: 2px 2px 20px rgba(119, 119, 119, 0.5);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
  
  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .carousel-nav-button {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #eee;
    &:hover {
      background-color: rgba(255, 255, 255, 1);
    }
  }
}

:deep(.embla__viewport) {
  height: 700px;
}

:deep(.embla__container) {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
