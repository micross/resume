<template>
  <div class="resume-word-box">
    <div class="content-box">
      <!-- 分类筛选 -->
      <category-vue :category-list="categoryList" :tags-list="tagsList"
        @get-template-list-by-cate="getTemplateListByCategory"></category-vue>
      <!-- 模板列表 -->
      <template-list-vue v-if="templateList.length && !isShowSkeleton"
        :template-list="templateList"></template-list-vue>
      <!-- 暂无数据 -->
      <div v-if="!templateList.length && !isShowSkeleton" class="no-data-box">
        <NoData></NoData>
      </div>
      <!-- 等待动画 -->
      <div v-if="isShowSkeleton" class="no-data-box">
        <common-loading></common-loading>
      </div>
      <!-- 分页组件 -->
      <Pagination v-if="templateList.length && templateList.length < total" :total="total" :limit="limit"
        :current-page="currentPage" @handle-current-change="handleCurrentChange"></Pagination>
    </div>
    <!-- 回到顶部 -->
    <el-backtop :right="50" :bottom="80" />
  </div>
</template>
<script lang="ts" setup>
import {
  getWordCategoryListAsync,
  getWordTemplateListAsync,
  getWordTemplateTagsListAsync
} from '~/composables/api/wordTemplate';
import CategoryVue from '@/components/word/WordCategory.vue';
import TemplateListVue from '@/components/word/WordList.vue';
import CommonLoading from '@/components/CommonLoading/CommonLoading.vue';

useHead({
  title: 'Word简历模版下载',
  meta: [
    {
      name: 'description',
      content: '提供海量、精美的Word简历模版'
    }
  ]
});

// 是否显示骨架
const isShowSkeleton = ref<boolean>(true);

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
  getTemplateList();
};

// 查询分类列表
const categoryList = ref<any>([]);
const getCategoryList = async () => {
  const data = await getWordCategoryListAsync();
  categoryList.value = data.map((item: any) => {
    return {
      category_label: item.name,
      category_value: item.id
    };
  });
  // 添加全部选项
  categoryList.value.unshift({
    category_label: '全部',
    category_value: ''
  });
};
getCategoryList();

// 查询标签列表
const tagsList = ref<any>([]);
const getWordTemplateTagsList = async () => {
  const data = await getWordTemplateTagsListAsync();
    tagsList.value = data;
};
getWordTemplateTagsList();

// 查询模板列表
const page = ref<number>(1);
const limit = ref<number>(12);
const total = ref<number>(0);
const currentPage = ref<number>(1);
const templateList = ref<any>([]);
const getTemplateList = async () => {
  isShowSkeleton.value = true;
  let params = {
    page: page.value,
    limit: limit.value,
    category: category.value,
    sort: sort.value,
    tag: tag.value
  };
  const data = await getWordTemplateListAsync(params);
    templateList.value = data.list;
    total.value = data.total;
   // currentPage.value = data.data.page.currentPage;
    isShowSkeleton.value = false;
};
getTemplateList();

// 改变页码时
const handleCurrentChange = (currentPage: number) => {
  page.value = currentPage;
  getTemplateList();
};
</script>
<style lang="scss" scoped>
.resume-word-box {
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
