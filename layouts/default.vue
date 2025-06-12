<script lang="ts" setup>
useServerSeoMeta({
  title: '红黄-一款免费开源的简历制作神器',
  description:
    '红黄-开源简历制作神器！免费制作一份精美的简历！内置两款设计器、快速设计、简历、封面、海报均可免费制作，支持一键导出高清PDF、JSON数据等。',
  keywords: '简历 开源 设计器 制作 PDF 高清简历 免费开源'
});
</script>

<template>
  <TooltipProvider size="small">
      <NavBar bg-color="#fff" font-color="green" position="sticky" icon-color="green"></NavBar>
      <slot />
  </TooltipProvider>
</template>