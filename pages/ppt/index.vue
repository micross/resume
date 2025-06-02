<template>
  <div class="resume-ppt-box">
    <div class="content-box">
      <!-- 分类筛选 -->
      <category-vue v-if="categories?.length && tags?.length" :category-list="categories" :tags-list="tags"
        @get-template-list-by-cate="getTemplateListByCategory"></category-vue>
      <!-- 模板列表 -->
      <template-list-vue v-if="ppts?.length && !loadingPpts"
        :template-list="ppts"></template-list-vue>
      <!-- 暂无数据 -->
      <div v-if="!ppts?.length && !loadingPpts" class="no-data-box">
        <NoData></NoData>
      </div>
      <!-- 等待动画 -->
      <div v-if="loadingPpts" class="no-data-box">
        <common-loading></common-loading>
      </div>
      <!-- 分页组件 -->
      <Pagination v-if="ppts?.length && ppts.length < total" :total="total" :limit="limit"
        :current-page="currentPage" @handle-current-change="handleCurrentChange"></Pagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
import CategoryVue from '@/components/ppt/Category.vue';
import TemplateListVue from '~/components/ppt/PptTemplateList.vue';
import CommonLoading from '@/components/CommonLoading/CommonLoading.vue';
import { usePptCategories, usePpts, usePptTags } from '~/composables/ppt';

// 根据分类获取模板列表
const category = ref<string>();
const sort = ref<string>();
const tag = ref<string>();
const getTemplateListByCategory = async (item: any) => {
  category.value = item.category;
  tag.value = item.tag;
  sort.value = item.sort;
  page.value = 1;
  limit.value = 12;
};

// 查询分类列表
const {categories } = usePptCategories();
const {tags, loading} = usePptTags();

// 查询模板列表
const page = ref<number>(1);
const limit = ref<number>(12);
const total = ref<number>(0);
const currentPage = ref<number>(1);

const { ppts, loadingPpts } = usePpts({
  page: page.value,
  page_size: limit.value,
  // category: category.value,
  //   sort: sort.value,
  //   tag: tag.value
});

// 改变页码时
const handleCurrentChange = (currentPage: number) => {
  page.value = currentPage;
};
</script>
<style lang="scss" scoped>
.resume-ppt-box {
  width: 100%;

  .content-box {
    margin: 0 auto;
    min-height: 500px;
    padding: 20px 0;
    width: 1300px;

    .no-data-box {
      margin-top: 80px;
    }
  }
}
</style>
