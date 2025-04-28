<template>
  <div class="my-integral-box">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleChange">
      <el-tab-pane label="我的简币" name="myIntegral">
        <div class="my-integral-info-box">
          <div class="integral-line">
            <span>可用简币：</span>
            <p>{{ useUserInfoStore().userIntegralInfo.integralTotal
              }}<img width="24" src="@/assets/images/jianB.png" alt="简币" /></p>
            <div class="get-bi-method" @click="openGetDialog">获取简币</div>
          </div>
          <!-- 邀请注册 -->
          <div class="integral-line invitation-people">
            <span>邀请有奖：</span>
            <div class="get-bi-method" @click="openInvitationDialog">立即邀请</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="购买简币" name="buyIntegral">
        <buy-integral></buy-integral>
      </el-tab-pane>
      <el-tab-pane label="简币记录" name="integralLog">
        <div v-if="!isShowSkeleton">
          <div v-if="integralList.length" class="integral-log-box">
            <ul>
              <li v-for="(item, index) in integralList" :key="index">
                <span class="time">{{ formatListDate(item.created_at) }}</span>
                <span>{{ item.subject }}</span>
                <p :class="[
                  'integral-value',
                  { 'add-integral': item.direction == 'In' },
                  { 'sub-integral': item.direction == 'Out' }
                ]">{{ getFormatIntegral(item.amount) }}
                  <img src="@/assets/images/jianB.png" alt="" />
                </p>
              </li>
            </ul>
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
      </el-tab-pane>
      <el-tab-pane label="订单信息" name="orderList">
        <order-list></order-list>
      </el-tab-pane>
    </el-tabs>

    <!-- 警告弹窗 -->
    <pay-integral-dialog :dialog-get-integral-visible="dialogGetIntegralVisible" title="如何获取简币" @cancle="cancleDialog"
      @confirm="cancleDialog"></pay-integral-dialog>

    <!-- 邀请用户弹窗 -->
    <invitation-dialog :dialog-invitation-visible="dialogInvitationVisible"
      @cancle="cancleInvitationDialog"></invitation-dialog>
  </div>
</template>
<script lang="ts" setup>
import { getUserIntegralLogsAsync } from '~/composables/api/integral';
import { formatListDate } from '@/utils/common';
import BuyIntegral from '@/components/BuyIntegral/BuyIntegral.vue';
import { useUserInfoStore } from '~/store/user';
import { ElMessage } from 'element-plus';

definePageMeta({
  layout: 'profile'
})

const activeName = ref('myIntegral');
const handleChange = () => { };

// 查询用户简币信息
const { getUserIntegralTotal } = useUserInfoStore();
const token = useCookie('token');
if (token.value) {
  getUserIntegralTotal();
}

// 查询用户简币记录
const integralList = ref<Array<any>>([]);
const page = ref<number>(1);
const limit = ref<number>(8);
const total = ref<number>(0);
const currentPage = ref<number>(1);
const isShowSkeleton = ref<boolean>(true);
const getUserIntegralLogs = async () => {
  let params = {
    page: page.value,
    limit: limit.value
  };
  const data = await getUserIntegralLogsAsync(params);
  integralList.value = data.list;
  total.value = data.total;
  // currentPage.value = data.data.data.page.currentPage;
  isShowSkeleton.value = false;
};
getUserIntegralLogs();

// 改变页码时
const handleCurrentChange = (currentPage: number) => {
  page.value = currentPage;
  getUserIntegralLogs();
};

// 返回格式化后的简币展示
const getFormatIntegral = (value: number) => {
  if (value > 0) {
    return '+' + value;
  } else {
    return value;
  }
};

// 打开获取简币弹窗
const dialogGetIntegralVisible = ref<boolean>(false);
const openGetDialog = () => {
  dialogGetIntegralVisible.value = true;
};

// 关闭弹窗
const cancleDialog = () => {
  dialogGetIntegralVisible.value = false;
};

// 打开邀请注册弹窗
const dialogInvitationVisible = ref<boolean>(false);
const openInvitationDialog = () => {
  dialogInvitationVisible.value = true;
};

// 关闭邀请注册弹窗
const cancleInvitationDialog = () => {
  dialogInvitationVisible.value = false;
};
</script>
<style lang="scss" scoped>
.my-integral-box {
  :deep(.el-tabs__content) {
    padding: 0;
  }

  .my-integral-info-box {
    padding-top: 20px;

    .integral-line {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      span {
        margin-right: 10px;
      }

      p {
        padding: 3px 10px;
        text-align: center;
        font-size: 14px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        cursor: pointer;
        -webkit-transition: all 0.2s;
        -moz-transition: all 0.2s;
        -ms-transition: all 0.2s;
        transition: all 0.2s;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-weight: 600;
        background: -webkit-linear-gradient(top, #ff0000, #00ff00);
        /*设置线性渐变*/
        /*为了支持更多的浏览器*/
        background-clip: text;
        /*背景被裁剪到文字*/
        -webkit-text-fill-color: transparent;
        /*设置文字的填充颜色*/
        letter-spacing: 1px;

        img {
          margin-left: 10px;
        }
      }

      .get-bi-method {
        font-size: 12px;
        border: 1px solid burlywood;
        padding: 2px 5px;
        border-radius: 10px;
        cursor: pointer;
        color: burlywood;
        margin-left: 5px;
        margin-top: 2px;
        transition: all 0.3s;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }

  .integral-log-box {
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #333;
        height: 50px;
        border-bottom: 1px solid #eee;

        .add-integral {
          color: green;
          letter-spacing: 2px;
        }

        .sub-integral {
          color: red;
          letter-spacing: 2px;
        }

        .integral-value {
          display: flex;
          align-items: center;
          width: 110px;
          display: flex;
          justify-content: flex-end;

          img {
            width: 24px;
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
