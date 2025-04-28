<template>
  <div class="template-card-list-box">
    <div v-for="(item, index) in templateList" :key="index" class="card-box-item">
      <NuxtLink :to="`/resume/${item.id}`">
        <TemplateCardNew :card-data="item"> </TemplateCardNew>
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ITempList } from '@/template/type';
import TemplateCardNew from '@/components/TemplateCardNew/TemplateCardNew.vue';

defineProps<{
  templateList: Array<ITempList>;
}>();

</script>
<style lang="scss" scoped>
.template-card-list-box {
  display: flex;
  flex-wrap: wrap;
  padding: 30px 0 0 0;

  .card-box-item {
    &:not(:nth-child(4n)) {
      margin-right: 33px;
    }
  }
}
</style>
