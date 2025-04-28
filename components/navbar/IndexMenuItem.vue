<template>
  <ElSubMenu
    v-if="item.children && item.children.length > 0"
    popper-class="navbar-popper-box"
    :index="keyIndex"
    :show-timeout="0"
    :hide-timeout="100"
  >
    <template #title>
      <span>{{ item.title }}</span>
    </template>
    <template v-for="(child, index) in item.children" :key="index">
      <index-menu-item :item="child" :key-index="item.name + index" />
    </template>
  </ElSubMenu>
  <ElMenuItem v-else :index="item.path">{{ item.title }}</ElMenuItem>
</template>

<script lang="ts" setup>
  interface MenuItem {
    name: string;
    path: string;
    title: string;
    children?: MenuItem[];
  }

  defineProps({
    item: {
      type: Object as () => MenuItem,
      required: true
    },
    keyIndex: {
      type: String,
      required: true
    }
  });
</script>
