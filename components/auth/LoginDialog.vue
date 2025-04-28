<template>
  <div>
    <el-button class="login-btn" type="primary" @click="dialogVisible=true">登录</el-button>

    <el-dialog :append-to-body="true" v-model="dialogVisible" width="768px" :show-close="false" :before-close="handleClose"
      class="login-dialog-box">
      <div class="login-dialog-form-box">
        <!-- 关闭按钮 -->
        <div class="close-loding-dialog-box" @click="handleClose">
          <IconX icon-name="icon-guanbi2" color="#ccc" :size="18"></IconX>
        </div>
        <div :class="['container', { 'right-panel-active': isSignUp }]">
          <!-- 登录界面 -->
          <div class="form-container sign-in-container">
            <h1>登录</h1>
            <div class="social-container"> </div>
            <el-form ref="loginRuleFormRef" class="forms_form" size="small" :model="loginForm" :rules="loginRules">
              <el-form-item prop="identifier">
                <el-input v-model="loginForm.identifier" type="email" class="forms_field-input" maxlength="40"
                  placeholder="电子邮箱" @keyup.enter="logina(loginRuleFormRef)" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" class="forms_field-input" placeholder="密码"
                  @keyup.enter="logina(loginRuleFormRef)" />
              </el-form-item>
            </el-form>
            <a href="#" @click.prevent="forgetPassword">忘记密码？</a>
            <el-button class="ghost-button forms_buttons-action" :loading="loading"
              @click="logina(loginRuleFormRef)">登 录</el-button>
          </div>
          <!-- 注册登录浮窗切换 -->
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1>欢迎回来！</h1>
                <p>已有帐号，立即登录！</p>
                <button class="ghost-button ghost" @click="signIn">立即登录</button>
              </div>
              <div class="overlay-panel overlay-right">
                <h1>你好, 猫友！</h1>
                <p v-if="websiteConfig.open_sign">还没有账号？快来注册吧！</p>
                <button v-if="websiteConfig.open_sign" class="ghost-button ghost" @click="signUp">立即注册</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { useWebsiteConfigStore } from '~/store/websiteConfig';
import { useRefreshStore } from '~/store/refresh';
import { useUserInfoStore } from '~/store/user';
import { useLogin } from '~/composables/auth';
const props = defineProps({
  isLogin: {
    type: Boolean,
    default: false
  },
  cancle: {
    type: Function,
    default: (fun: any) => fun()
  },
  confirm: {
    type: Function,
    default: (fun: any) => fun()
  }
});

const dialogVisible = ref(false);

const { websiteConfig } = useWebsiteConfigStore();
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
  email: [{ required: true, validator: emailValidator, trigger: 'change' }],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change'
    }
  ]
});

const show = ref<boolean>(true);

// 是否已经点过获取验证码了
let timer: number | null = null; // 定时器

// 取消登录
const handleClose = () => {
  show.value = false;
  props.cancle();
};

// 登录
const { setUuid } = useRefreshStore();
const { getUserIntegralTotal } = useUserInfoStore();
const { login, loading } = useLogin();
const router = useRouter();
const loginRuleFormRef = ref<FormInstance>();
const logina = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {

      await login(loginForm);
      setUuid(); // 无感刷新页面
      //getUserIntegralTotal(); // 查询简币信息
      ElMessage({
        message: '登录成功',
        type: 'success'
      });
      show.value = false;
      // 查询和更新用户信息
      const { getAndUpdateUserInfo } = useUserInfoStore();
     // getAndUpdateUserInfo();
      //props.confirm();

    } else {
    }
  });
};

// 忘记密码
const forgetPassword = async () => {
  router.push('/forgetPassword');
  show.value = false;
  props.confirm();
};

const isSignUp = ref<boolean>(!props.isLogin);
// 点击去注册
const signUp = () => {
  isSignUp.value = true;
};
// 点击去登录
const signIn = () => {
  isSignUp.value = false;
};

// qq登录
// const toQQLogin = () => {
//   window.open(
//     'oauth/index.php',
//     'TencentLogin',
//     'width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1'
//   );
// };

// 清除定时器以避免内存泄漏
onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>
<style lang="scss" scoped>
.login-dialog-form-box {
  position: relative;

  .close-loding-dialog-box {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 999;
    cursor: pointer;
  }

  h1 {
    font-weight: bold;
    margin: 0;
  }

  h2 {
    text-align: center;
  }

  p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
  }

  span {
    font-size: 12px;
  }

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 0 0 15px 0;
  }

  .ghost-button {
    border-radius: 20px;
    border: 1px solid #00c091;
    background-color: #00c091;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 18px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
  }

  .ghost-button:active {
    transform: scale(0.95);
  }

  .ghost-button:focus {
    outline: none;
  }

  .ghost-button.ghost {
    background-color: transparent;
    border-color: #ffffff;
    cursor: pointer;
    padding: 12px 45px;
  }

  .email-code-box {
    display: flex;
    height: 48px;
    align-items: center;

    .get-email-code {
      height: 40px;
      display: flex;
      padding: 0;
      width: 150px;
      margin-left: 10px;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      letter-spacing: 1px;
    }
  }

  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 550px;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 50px;

    :deep(.forms_form) {
      width: 100%;

      input {
        border: none;
        padding: 10px 12px;
        margin: 8px 0;
        width: 100%;
        font-size: 14px;
        color: #333;
      }

      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
      }

      .el-form-item {
        margin-bottom: 20px;
      }

      .el-input__inner {
        background-color: none !important;
      }
    }
  }

  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }

  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
    background-color: #fff;
  }

  @keyframes show {

    0%,
    49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%,
    100% {
      opacity: 1;
      z-index: 5;
    }
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }

  .container.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  .overlay {
    background: #b0db7d;
    background: linear-gradient(to bottom right, #73b722 40%, #9dc6ae 100%);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-left {
    transform: translateX(-20%);
  }

  .container.right-panel-active .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    right: 0;
    transform: translateX(0);
  }

  .container.right-panel-active .overlay-right {
    transform: translateX(20%);
  }

  .social-container {
    margin: 20px 0;
  }

  .social-container a {
    border: 1px solid #dddddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
    cursor: pointer;

    &:hover {
      color: #ff4b2b;
    }
  }

  .other-login-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
<style lang="scss">
.login-dialog-box {
  border-radius: 12px;

  .el-dialog__header {
    display: none !important;
  }

  .el-dialog__body {
    padding: 0 !important;
    min-height: 500px;
  }
}
</style>
