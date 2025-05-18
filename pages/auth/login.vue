<template>
  <div class="login-box">
    <div class="form-box">
      <h1>登录</h1>
      <el-form ref="loginRuleFormRef" :model="loginForm" :rules="loginRules" label-width="0" size="large">
        <el-form-item prop="identifier">
          <el-input v-model="loginForm.identifier" type="email" class="forms_field-input" maxlength="40" placeholder="电子邮箱" @keyup.enter="handleLogin(loginRuleFormRef)" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" class="forms_field-input" placeholder="密码" @keyup.enter="handleLogin(loginRuleFormRef)" />
        </el-form-item>
        <div class="form-actions">
          <NuxtLink type="primary" to="/forget-password">忘记密码？</NuxtLink>
          <NuxtLink type="primary" to="/auth/register">注册账号</NuxtLink>
        </div>
        <el-form-item>
          <el-button type="primary" class="submit-btn" :loading="loading" @click="handleLogin(loginRuleFormRef)">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { useLogin } from '~/composables/auth';
import { useMe } from '~/composables/users';
import { useUserInfoStore } from '~/store/user';
const router = useRouter();

// 登录数据
interface IForm {
  identifier: string;
  password: string;
}

// 邮箱自定义校验规则
const emailValidator = (rule: any, value: string, callback: Function) => {
  if (!value) {
    callback(new Error('邮箱不能为空'));
  } else {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(value)) {
      callback();
    } else {
      callback(new Error('邮件格式错误'));
    }
  }
};

const loginForm = reactive<IForm>({
  identifier: '',
  password: ''
});

const loginRules = reactive<FormRules>({
  identifier: [{ required: true, validator: emailValidator, trigger: 'change' }],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change'
    }
  ]
});

// 登录
const { login, loading } = useLogin();
const loginRuleFormRef = ref<FormInstance>();

const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await login(loginForm);
      ElMessage({
        message: '登录成功',
        type: 'success'
      });
      router.push('/');
    }
  });
};

</script>

<style lang="scss" scoped>
.login-box {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
  padding: 20px;
  
  .form-box {
    width: 400px;
    padding: 40px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    h1 {
      text-align: center;
      margin-bottom: 30px;
      font-weight: bold;
      color: #333;
    }

    .form-actions {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .submit-btn {
      width: 100%;
      padding: 12px 0;
    }
  }
}
</style>