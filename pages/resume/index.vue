<template>
  <div class="resume-list-box">
    <div class="content-box">
      <!-- 分类列表 -->
      <CategoryList ref="categoryDom" @category-change="categoryChange"></CategoryList>
      <!-- 模板列表 -->
      <TemplateList v-if="templates && !loading" :template-list="templates"></TemplateList>
      <!-- 暂无数据 -->
      <div v-if="!templates && !loading" class="no-data-box">
        <NoData />
      </div>
      <!-- 等待动画 -->
      <div v-if="loading" class="no-data-box">
        <CommonLoading />
      </div>
      <!-- 分页组件 -->
      <Pagination v-if="templates && templates.length < total" :total="total" :limit="limit"
        :current-page="currentPage" @handle-current-change="handleCurrentChange"></Pagination>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { useTemplates } from '~/composables/templates';
useHead({
  meta: [
    {
      name: 'description',
      content: '提供海量、精美的在线制作简历模版'
    }
  ]
});

const categoryDom = ref<any>(null);

// 查询模板列表
const page = ref<number>(1);
const limit = ref<number>(12);
const total = ref<number>(0);
const currentPage = ref<number>(1);
const templateList = ref<any>([]);

let params = {
    page: page.value,
    limit: limit.value,
    templateStatus: 1,
   // ...categoryDom.value.filterValue
  };

const { templates, loading } = useTemplates();

// 分类发生变化
const categoryChange = () => {
  page.value = 1;
  templateList.value = [];
};

onMounted(() => {
});

// 改变页码时
const handleCurrentChange = (currentPage: number) => {
  page.value = currentPage;
};
</script>
<style lang="scss" scoped>
.resume-list-box {
  width: 100%;

  .content-box {
    width: 1300px;
    margin: 0 auto;
    padding-bottom: 30px;
  }
}
</style>
