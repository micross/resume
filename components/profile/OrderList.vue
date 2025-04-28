<template>
  <div class="order-list-table-box">
    <el-table :data="tableData" style="width: 100%" show-overflow-tooltip>
      <el-table-column prop="out_trade_no" label="订单号" :width="150" />
      <el-table-column prop="trade_status" label="订单状态">
        <template #default="scope">
          <el-tag :type="tradeStatusTags[scope.row.trade_status].tag || 'danger'" size="default">{{
            tradeStatusTags[scope.row.trade_status].desc || '-'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="订单金额" />
      <el-table-column prop="pay_amount" label="实付金额" />
      <el-table-column prop="subject" label="交易描述" />
      <el-table-column prop="created_at" label="创建日期" :width="180">
        <template #default="scope">
          <div>
            {{ formatListDate(scope.row.created_at) }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-box">
      <!-- 分页组件 -->
      <Pagination
        :total="total"
        :limit="limit"
        :current-page="currentPage"
        @handle-current-change="handleCurrentChange"
      ></Pagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { getUserOrderListAsync } from '~/composables/api/integral';
  import { formatListDate } from '@/utils/common';

  // 订单状态对应tags
  const tradeStatusTags: any = {
    WAIT_BUYER_PAY: {
      tag: 'info',
      desc: '待支付'
    },
    TRADE_CLOSED: {
      tag: 'danger',
      desc: '交易关闭'
    },
    TRADE_SUCCESS: {
      tag: 'success',
      desc: '交易成功'
    },
    TRADE_FINISHED: {
      tag: 'warning',
      desc: '交易结束'
    }
  };

  // 查询订单列表
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  let tableData = ref<any>([]);
  const getUserOrderList = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getUserOrderListAsync(params);
      tableData.value = data.list;
      total.value = data.total;
      currentPage.value = 1;
      console.log('tableData', tableData);
  };
  getUserOrderList();

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getUserOrderList();
  };
</script>
<style lang="scss" scoped>
  .order-list-table-box {
    .page-box {
      display: flex;
      justify-content: flex-end;
      height: 70px;
      align-items: center;
    }
  }
</style>
