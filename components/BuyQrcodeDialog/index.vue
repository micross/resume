<template>
  <!-- 二维码付费弹窗 -->
  <el-dialog class="pay-qrcode-dialog" :model-value="dialogQrcodeVisible" width="400px" :show-close="false"
    :close-on-click-modal="false" :append-to-body="false" @open="handleOpen" @close="handleClose">
    <div class="qrcode-box" v-if="props.memberType">
      <h3>支付宝支付</h3>
      <div v-loading="loading" class="qrcode-wrapper">
        <qrcode-vue :value="qrCodeLink" :size="220" level="H" foreground="#00c091" />
        <!-- 二维码失效遮罩层 -->
        <div v-if="orderIsFail" class="qrcode-fail">订单已失效</div>
      </div>
      <p>订单金额：{{ props.memberType?.price }} ￥</p>
      <div class="countdown-box">
        <span v-if="!orderIsFail">
          （请使用支付宝在3分钟内完成支付：<span v-if="m < 10">0</span>{{ m }}:<span v-if="s < 10">0</span>{{ s }}）
        </span>
        <span v-else>（订单已失效）</span>
      </div>
    </div>
    <template #footer>
      <el-button class="cancel-order" @click="cancelOrder">取消订单</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { aliPayAsync, tradeQueryAsync } from '~/composables/api/integral';
import { ElMessage } from 'element-plus';
import QrcodeVue from 'qrcode.vue';
import { useUserInfoStore } from '~/store/user';
import type { MemberType } from '~/lib/schema/member';

const emit = defineEmits(['update:modelValue', 'paySuccess', 'cancel']);

interface TDialog {
  modelValue: boolean;
  orderType: number;
  memberType: MemberType | null;
}

const props = withDefaults(defineProps<TDialog>(), {
  modelValue: false,
  memberType: null,
  orderType: 1, // 订单类型： 1-充值简币 2-充值会员
});

// 双向绑定 modelValue
const dialogQrcodeVisible = ref(props.modelValue);
watch(
  () => props.modelValue,
  (newVal) => {
    dialogQrcodeVisible.value = newVal;
    if (newVal) {
      loading.value = true;
      outTradeNo.value = '';
      orderIsFail.value = false;
    }
  }
);
watch(dialogQrcodeVisible, (newVal) => {
  emit('update:modelValue', newVal);
});

// 获取充值二维码
const orderIsFail = ref<boolean>(false);
const outTradeNo = ref<string>(''); // 商户订单号
const loading = ref<boolean>(true);
const getOrderQrcode = async () => {
  const params = {
    member_type_id: props.memberType?.id,
    order_type: 2,
    channel: 'alipay'
  };
  const data = await aliPayAsync(params);
  qrCodeLink.value = data.qr_code;
  outTradeNo.value = data.out_trade_no;
  dialogQrcodeVisible.value = true;
  loading.value = false;
};

// 二维码链接
const qrCodeLink = ref<string>('');

// 取消订单
const cancelOrder = () => {
  closeDialog();
};

// 关闭弹窗逻辑
const closeDialog = () => {
  dialogQrcodeVisible.value = false;
  if (orderTime) {
    clearInterval(orderTime);
  }
  if (settime) {
    clearInterval(settime);
  }
  emit('cancel');
};

// 弹窗关闭回调
const handleClose = () => {
  closeDialog();
};

// 弹窗打开回调
let orderTime: any = '';
const handleOpen = () => {
  orderIsFail.value = false;
  getOrderQrcode();
  countdown(); // 倒计时
  orderTime = setInterval(() => {
    getOrderInfo();
  }, 3000);
};

// 倒计时
const m = ref<number>(2); // 设置分
const s = ref<number>(59); // 设置秒
let settime: any = '';
const countdown = () => {
  m.value = 2;
  s.value = 59;
  settime = setInterval(() => {
    s.value = s.value - 1;
    // 秒为0
    if (s.value == 0) {
      if (m.value > 0) {
        m.value = m.value - 1;
        s.value = 60;
      } else {
        // 倒计时结束
        orderIsFail.value = true;
        clearInterval(settime);
        if (orderTime) {
          clearInterval(orderTime);
        }
      }
    }
  }, 1000);
};

// 轮询查询订单信息
const { getUserIntegralTotal } = useUserInfoStore();
const getOrderInfo = async () => {
  const orderInfo = await tradeQueryAsync(outTradeNo.value);
  if (orderInfo.trade_status === 'WAIT_BUYER_PAY') {
    // 交易创建，等待买家付款
    return;
  } else if (orderInfo.trade_status === 'TRADE_CLOSED') {
    // 未付款交易超时关闭，或支付完成后全额退款
    if (orderTime) {
      clearInterval(orderTime);
      orderIsFail.value = true;
    }
  } else if (orderInfo.trade_status === 'TRADE_FINISHED') {
    // 交易结束，不可退款
    if (orderTime) {
      clearInterval(orderTime);
      orderIsFail.value = true;
    }
  } else if (orderInfo.trade_status === 'TRADE_SUCCESS') {
    // 支付成功
    dialogQrcodeVisible.value = false;
    outTradeNo.value = '';
    if (orderTime) {
      clearInterval(orderTime);
    }
    ElMessage.success('支付成功');
    emit('paySuccess');
    // 查询用简币信息
    getUserIntegralTotal();
  }
};

// 销毁
onBeforeUnmount(() => {
  if (settime) {
    clearInterval(settime);
  }
});
</script>

<style lang="scss" scoped>
.qrcode-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;

  .qrcode-wrapper {
    position: relative;
    width: 220px;
    height: 220px;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 15px;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }

    .qrcode-fail {
      width: 100%;
      height: 100%;
      font-size: 16px;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      backdrop-filter: blur(2px);
      border-radius: 10px;
      color: #ff4d4f;
    }
  }
}

.countdown-box {
  font-size: 14px;
  color: #e6a23c;
  margin-top: 15px;
  font-weight: bold;
}

.cancel-order {
  width: 100%;
  height: 45px;
  font-size: 18px;
  letter-spacing: 1px;
  background-color: #f56c6c;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff7875;
  }
}
</style>
<style lang="scss">
// 弹窗样式
.pay-qrcode-dialog {
  .el-dialog__header {
    display: none;
  }
}
</style>
