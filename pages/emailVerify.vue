<template>
  <div class="email-verify-box">
    <div v-if="!isValid" class="icon-box">
      <svg-icon icon-name="icon-guanbi" color="red" size="100px"></svg-icon>
    </div>
    <div v-else class="icon-box">
      <svg-icon icon-name="icon-icon" color="#00c091" size="100px"></svg-icon>
    </div>
    <div v-if="!isValid" class="goEmail">
      <p>您还需要验证您的电子邮箱才可正常使用！</p>
    </div>
    <div v-else class="goEmail">
      <p>您的邮箱已经验证通过啦！</p>
    </div>
    <!-- 重新发送验证链接 -->
    <div v-if="!isValid" class="resend-email">
      <el-button class="resend-email-btn" :loading="isLoading" @click="resendEmail">{{
        sendText
      }}</el-button>
      <!-- <p @click="resendEmail"></p> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { getUserInfoAsync, resendVerificationAsync } from '~/composables/api/user';
  import { ElMessage } from 'element-plus';
  const route = useRoute();
  let email: string = route.query.email as string;
  // 查询邮箱是否验证通过
  const isValid = ref<boolean>(false);
  const getUserInfo = async () => {
    const data = await getUserInfoAsync();
      isValid.value = data.email_verified_at !== null;
  };
  getUserInfo();

  // 重新发送邮件验证链接
  const sendText = ref<string>('重新发送邮件');
  const isLoading = ref<boolean>(false);
  const resendEmail = async () => {
    sendText.value = '发送中';
    isLoading.value = true;
    const data = await resendVerificationAsync(email);
    if (data.status === 200) {
      ElMessage({
        message: '发送成功',
        type: 'success'
      });
      sendText.value = '重新发送邮件';
      isLoading.value = false;
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      });
      sendText.value = '重新发送邮件';
      isLoading.value = false;
    }
  };

</script>
<style lang="scss" scoped>
  .email-verify-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 30px;
    .goEmail {
      display: flex;
      margin-top: 20px;
      font-size: 20px;
      a {
        text-decoration: none;
        color: #00c091;
        border-bottom: 1px solid transparent;
        &:hover {
          color: #049571;
          border-bottom: 1px solid #049571;
        }
      }
    }

    .resend-email {
      margin: 20px 0;
      .resend-email-btn {
        color: #00c091;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 16px;
        border-bottom: 1px solid transparent;
        border: none;
        background: none;
        &:hover {
          color: #049571;
          border-bottom: 1px solid #049571;
        }
      }
    }
  }
</style>
