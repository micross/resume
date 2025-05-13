<template>
  <div class="register-box">
    <div class="form-box">
      <h1>注册账号</h1>
      <el-form ref="registerRuleFormRef" :model="registerForm" :rules="registerRules" label-width="0" size="large">
        <el-form-item prop="name">
          <el-input v-model="registerForm.name" type="text" maxlength="16" class="forms_field-input" placeholder="昵称" @keyup.enter="handleRegister(registerRuleFormRef)" />
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" type="email" class="forms_field-input" maxlength="40" placeholder="电子邮箱" @keyup.enter="handleRegister(registerRuleFormRef)" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" type="password" class="forms_field-input" placeholder="密码" @keyup.enter="handleRegister(registerRuleFormRef)" />
        </el-form-item>
        <el-form-item prop="surePassword">
          <el-input v-model="registerForm.surePassword" type="password" class="forms_field-input" placeholder="确认密码" @keyup.enter="handleRegister(registerRuleFormRef)" />
        </el-form-item>
        <div class="form-actions">
          <span></span>
          <el-link type="primary" @click="toLogin">已有账号？立即登录</el-link>
        </div>
        <el-form-item>
          <el-button type="primary" class="submit-btn" :loading="isRegisterLoading" @click="handleRegister(registerRuleFormRef)">注 册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { registerAsync } from '~/composables/api/user';

const router = useRouter();

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

// 确认密码的自定义规则
const surePassValidator = (rule: any, value: string, callback: Function) => {
  if (!value) {
    callback(new Error('请再次确认密码'));
  } else if (registerForm.password !== value) {
    callback(new Error('两次输入密码不一致'));
  } else {
    callback();
  }
};

// 密码校验规则
const passwordValidator = (rule: any, value: string, callback: Function) => {
  let pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
  if (!value) {
    callback(new Error('密码不能为空'));
  } else if (!pwdRegex.test(value)) {
    callback(new Error('密码中必须包含字母、数字,至少8个字符'));
  } else {
    callback();
  }
};

// 注册表单数据
interface IRegisterForm {
  name: string;
  email: string;
  password: string;
  surePassword: string;
}

const registerForm = reactive<IRegisterForm>({
  name: '', // 昵称
  email: '', // 注册邮箱
  password: '', // 密码
  surePassword: '', // 确认密码
});

const registerRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入用户名', trigger: 'change' }],
  email: [{ required: true, validator: emailValidator, trigger: 'change' }],
  password: [
    {
      required: true,
      validator: passwordValidator,
      trigger: 'change'
    }
  ],
  surePassword: [{ required: true, validator: surePassValidator, trigger: 'change' }],
});

// 注册
const registerRuleFormRef = ref<FormInstance>();
const isRegisterLoading = ref<boolean>(false);

const handleRegister = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      isRegisterLoading.value = true;
      let params = {
        name: registerForm.name,
        email: registerForm.email,
        username: registerForm.email,
        password: registerForm.password,
      };
      const data = await registerAsync(params);
      isRegisterLoading.value = false;
      ElMessage({
        message: '注册成功',
        type: 'success'
      });
      router.push('/auth/login');
    }
  });
};

// 跳转到登录页面
const toLogin = () => {
  router.push('/auth/login');
};
</script>

<style lang="scss" scoped>
.register-box {
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