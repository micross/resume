<template>
  <div class="my-resume-new">
    <div v-if="!isShowSkeleton">
      <div v-if="legoCreateList.length" class="create-list-box">
        <template v-for="(item, index) in legoCreateList" :key="index">
          <ResumeCard :card-data="item" type="new" @to-design="toDesign" @delete="deleteUserCreate">
          </ResumeCard>
        </template>
      </div>

      <!-- 无数据页 -->
      <template v-else>
        <div class="audit-no-data-box">
          <NoData width="200px" height="200px"></NoData>
        </div>
      </template>
    </div>
    <el-skeleton v-else :rows="5" animated />

    <!-- 分页组件 -->
    <Pagination v-if="total > limit" :limit="limit" :total="total" :current-page="currentPage"
      @handle-current-change="handleCurrentChange"></Pagination>
  </div>
</template>
<script lang="ts" setup>
import { deleteUserResumeAsync, getMyResumeListAsync } from '~/composables/api/createTemplate';

definePageMeta({
  layout: 'profile'
})

// 查询个人简历列表
const legoCreateList = ref<Array<any>>([]);
const page = ref<number>(1);
const limit = ref<number>(6);
const total = ref<number>(0);
const currentPage = ref<number>(1);
const isShowSkeleton = ref<boolean>(false);
const getUserTemplateList = async () => {
  let params = {
    page: page.value,
    limit: limit.value
  };
  const data = await getMyResumeListAsync(params);
    legoCreateList.value = data.list;
    legoCreateList.value.map((item: any) => {
      item.previewUrl = item.template_cover;
    });
    total.value = data.total;
    //currentPage.value = data.data.data.page.currentPage;
    isShowSkeleton.value = false;
};
getUserTemplateList();

// 改变页码时
const handleCurrentChange = (currentPage: number) => {
  page.value = currentPage;
  getUserTemplateList();
};

// 点击删除创作
const deleteUserCreate = async (id: string) => {
  let params = {
    id: id
  };
  const data = await deleteUserResumeAsync(params);
  if (data.data.status === 200) {
    ElMessage.success('删除成功');
    getUserTemplateList();
  } else {
    ElMessage.error(data.data.message);
  }
};

// 去设计
const toDesign = () => { };
</script>
<style lang="scss" scoped>
.my-resume-new {
  .create-list-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    & :last-child:nth-child(3n - 1) {
      margin-right: calc(260px + 15px);
    }
  }
}
</style>
