<template>
  <div :style="boxStyle">
    <div :style="topStyle">
      <div :style="topLeft">
        <h1 :style="name">{{ module.dataSource.name.value }}</h1>
        <p v-dompurify-html="module.dataSource.abstract.value" :style="abstract"></p>
      </div>
      <div :style="topRight">
        <div :style="iconBox">
          <svg-icon
            icon-name="icon-education-1-copy"
            class-name="icon"
            color="#fff"
            size="22px"
          ></svg-icon>
        </div>
        <div :style="iconBox">
          <svg-icon icon-name="icon-rongyu" class-name="icon" color="#fff" size="22px"></svg-icon>
        </div>
        <div :style="iconBox">
          <svg-icon
            icon-name="icon-ziwopingjia"
            class-name="icon"
            color="#fff"
            size="22px"
          ></svg-icon>
        </div>
      </div>
    </div>
    <div :style="bottomStyle">
      <div :style="bottomLeftStyle"></div>
      <div :style="bottomRightStyle"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useGetBoxStyle } from '../../hooks/useGetStyle';
  import { useGetCustomStyle } from '../../hooks/useGetCustomStyle';
import type { ResumeComponent } from '~/lib';

  const props = defineProps<{
    module: ResumeComponent;
  }>();

  // 返回整体样式
  const boxStyle = useGetBoxStyle(props);

  // 返回上部分样式
  const topStyle = useGetCustomStyle(props.module, 'topStyle');

  // 返回上部分左侧样式
  const topLeft = useGetCustomStyle(props.module, 'topLeft');

  // 返回上部分右侧样式
  const topRight = useGetCustomStyle(props.module, 'topRight');

  // 返回姓名样式
  const name = useGetCustomStyle(props.module, 'name');

  // 返回简介样式
  const abstract = useGetCustomStyle(props.module, 'abstract');

  // 返回图标盒子样式
  const iconBox = useGetCustomStyle(props.module, 'iconBox');

  // 返回底部样式
  const bottomStyle = useGetCustomStyle(props.module, 'bottomStyle');

  // 返回底部左侧样式
  const bottomLeft: any = useGetCustomStyle(props.module, 'bottomLeft');

  // 返回底部右侧样式
  const bottomRight = useGetCustomStyle(props.module, 'bottomRight');

  // 返回底部左侧背景色
  const bottomLeftStyle = computed(() => {
    if (bottomLeft?.value?.background || bottomLeft?.value?.backgroundColor) {
      let color = bottomLeft?.value?.background || bottomLeft?.value?.backgroundColor;
      bottomLeft.value.backgroundColor = '';
      return {
        ...bottomLeft.value,
        background: `linear-gradient(-45deg, transparent 20px, ${color} 0) top right`
      };
    } else {
      return {
        ...bottomLeft.value,
        background: 'linear-gradient(-45deg, transparent 20px, #254665 0) top right'
      };
    }
  });

  // 返回底部右侧背景色
  const bottomRightStyle = computed(() => {
    if (bottomRight?.value?.background || bottomRight?.value?.backgroundColor) {
      let color = bottomRight?.value?.background || bottomRight?.value?.backgroundColor;
      bottomRight.value.backgroundColor = '';
      return {
        ...bottomRight.value,
        background: `linear-gradient(135deg, transparent 18px, ${color} 0) top left`
      };
    } else {
      return {
        ...bottomRight.value,
        background: 'linear-gradient(135deg, transparent 18px, #74a274 0) top left'
      };
    }
  });
</script>
