<template>
  <el-dialog :model-value="dialogGetIntegralVisible" class="get-integral-dialog-box" width="850px" :show-close="true"
    :close-on-click-modal="true" :before-close="handleBeforeClose" append-to-body>
    <!-- 标题 -->
    <template #header>
      <div class="get-integral-header-box">
        <template v-if="title">
          {{ title }}
        </template>
        <template v-else>
          确定消费{{ Math.abs(payNumber) }}个<img width="22" src="@/assets/images/jianB.png" alt="简币" />{{ placeholder }}？
        </template>
      </div>
    </template>
    <div class="get-integral-content-box">
      <!-- 当前简币数量 -->
      <div class="content-box">
        <h1 class="title">您当前简币数量</h1>
        <div class="content">
          <p class="jb-num">{{ formatNumberWithCommas(useUserInfoStore().userIntegralInfo.integralTotal) }}
            <img width="22" src="@/assets/images/jianB.png" alt="简币" />
          </p>
        </div>
        <!-- <div class="get-bi-method" @click="openGetDialog">获取简币</div> -->
      </div>
      <!-- 获取简币方式 -->
      <div class="content-box">
        <h1 class="title">获取简币方式</h1>
        <div class="content">
          <div class="table">
            <ul>
              <li>
                <div class="top">
                  <h1>邀请注册</h1>
                  <div class="circle">20 <img width="16" src="@/assets/images/jianB.png" alt="简币" /></div>
                </div>
                <div class="bottom">
                  <p class="content-desc">每邀请一位新用户注册红黄简历，您将获得+20个简币（新用户注册时填写您的专属邀请码）</p>
                  <div class="attendance-box">
                    <div class="button" @click="getInviteCode">获取专属邀请码</div>
                  </div>
                </div>
              </li>

              <li>
                <div class="top">
                  <h1>点Star</h1>
                  <div class="circle">20 <img width="16" src="@/assets/images/jianB.png" alt="简币" /></div>
                </div>
                <div class="bottom">
                  <p class="content-desc">给红黄简历项目点Star，添加小编微信，凭点赞截图获取+20（入口在首页开源信息栏目）</p>
                  <div class="attendance-box" @click="toGithub">
                    <div class="button"> 去点Star </div>
                  </div>
                </div>
              </li>

              <li>
                <div class="top">
                  <h1>直接购买</h1>
                  <div class="circle">∞ <img width="16" src="@/assets/images/jianB.png" alt="简币" /></div>
                </div>
                <div class="bottom">
                  <p class="content-desc">直接购买简币！9.9元得+99个简币，合计1毛钱一个简币</p>
                  <div class="attendance-box" @click="toPayIntegral">
                    <div class="button"> 去购买 </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 无限制下载方式 -->
      <div class="content-box">
        <h1 class="title">网站所有内容无限制下载方式（强烈推荐！）</h1>
        <div class="content-member-box">
          <div class="card" @click="toMembership">
            <div class="card-text">
              <div class="portada">
                <p>无限制下载</p>
              </div>
              <div class="title-total">
                <h2>开通会员（9.9￥）</h2>

                <div class="desc">无论开通哪一种会员，你都将无限制的下载网站内的任意内容，包括软件、简历、模板、导出PDF等所有资源！</div>
                <div class="actions"> 立即前往>> </div>
              </div>
            </div>
          </div>
          <div class="card" @click="toWebCode">
            <div class="card-text">
              <div class="portada">
                <p>私有化部署</p>
              </div>
              <div class="title-total">
                <h2>购买源码</h2>

                <div class="desc">购买源码后，你可以将红黄简历官网部署为个人网站，同时你将拥有红黄简历网站内的所有资源，以及开源作者的贴心指导！</div>
                <div class="actions"> 立即前往>> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹窗底部 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-tooltip :content="confirmTip" :disabled="!confirmTip" placement="top">
          <el-button type="primary" :disabled="confirmDisabled" @click="confirmDialog">{{
            btnText
            }}</el-button>
        </el-tooltip>
      </span>
    </template>
  </el-dialog>

  <!-- 购买简币弹窗 -->
  <buy-integral-dialog :dialog-buy-integral-visible="dialogBuyIntegralVisible"
    @cancle="handlePayIntegralCancle"></buy-integral-dialog>

  <!-- 邀请用户弹窗 -->
  <invitation-dialog :dialog-invitation-visible="dialogInvitationVisible"
    @cancle="cancleInvitationDialog"></invitation-dialog>
</template>
<script lang="ts" setup>
import { addIntegralLogAsync } from '~/composables/api/integral';
import { formatNumberWithCommas } from '@/utils/common';
import { ElMessage } from 'element-plus';
import { useUserInfoStore } from '~/store/user';

const emit = defineEmits(['cancle', 'confirm']);
interface TDialog {
  dialogGetIntegralVisible: boolean;
  payNumber?: number;
  placeholder?: string;
  title?: string;
  confirmDisabled?: boolean;
  btnText?: string;
  confirmTip?: string;
}
withDefaults(defineProps<TDialog>(), {
  dialogGetIntegralVisible: false,
  payNumber: 0,
  placeholder: '下载该模板',
  title: '',
  confirmDisabled: false,
  btnText: '确认',
  confirmTip: ''
});

const router = useRouter();

// 关闭前回调
const handleBeforeClose = () => {
  emit('cancle');
};

// 确定弹窗
const confirmDialog = () => {
  emit('confirm');
  emit('cancle');
};

// 取消弹窗
const cancle = () => {
  emit('cancle');
};

// 去github
const toGithub = () => {
  window.open('https://github.com/Hacker233/resume-design', '_blank');
};

// 充值
const dialogBuyIntegralVisible = ref<boolean>(false);
const toPayIntegral = () => {
  dialogBuyIntegralVisible.value = true;
};
// 关闭充值弹窗
const handlePayIntegralCancle = () => {
  dialogBuyIntegralVisible.value = false;
};

// 跳转至开通会员
const toMembership = () => {
  router.push('/membership');
};

// 跳转至源码
const toWebCode = () => {
  router.push('/webcode');
};

// 获取专属邀请码
const dialogInvitationVisible = ref<boolean>(false);
const getInviteCode = async () => {
  dialogInvitationVisible.value = true;
};

// 关闭邀请弹窗
const cancleInvitationDialog = () => {
  dialogInvitationVisible.value = false;
};
</script>
<style lang="scss">
.get-integral-dialog-box {
  .get-integral-header-box {
    display: flex;
    align-items: center;
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 600;

    img {
      margin: 0 1px;
    }
  }

  .el-dialog__body {
    padding: 0 20px;
  }

  .get-integral-content-box {
    padding: 20px 0;

    .content-box {
      font-size: 12px;
      color: #777777;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-bottom: none;

      p {
        height: 40px;
        font-size: 14px;
        display: flex;
        align-items: center;
        color: #fb8444;

        img {
          margin-left: 5px;
        }
      }

      .jb-num {
        font-size: 20px;
        font-weight: 600;
        background: -webkit-linear-gradient(top, #ff0000, #00ff00);
        /*设置线性渐变*/
        /*为了支持更多的浏览器*/
        background-clip: text;
        /*背景被裁剪到文字*/
        -webkit-text-fill-color: transparent;
        /*设置文字的填充颜色*/
        letter-spacing: 1px;
      }
    }

    .title {
      font-size: 16px;
      color: #009a74;
      position: relative;
      height: 20px;
      display: flex;
      align-items: center;
      margin-left: 10px;
      letter-spacing: 1px;

      &::before {
        content: '';
        position: absolute;
        height: 10px;
        width: 3px;
        background-color: #009a74;
        left: -10px;
      }
    }

    .content {
      width: 100%;
      padding: 10px 10px;

      .table {
        background-color: #ffffff;
        display: flex;
        width: 100%;
        height: 280px;
        width: 100%;
        margin: 10px 0 15px 0;

        ul {
          display: flex;
          width: 100%;
          justify-content: space-between;
        }
      }

      ul li {
        float: left;
        text-align: center;
        border-left: 1px solid #dddcd8;
        border-bottom: 1px solid #dddcd8;
        list-style: none;
        flex: 1;

        &:last-child {
          border-right: 1px solid #dddcd8;

          .top {
            background: linear-gradient(45deg, #ededee 0%, #58b5e1 70%);
          }
        }

        &:first-child {
          .top {
            background: linear-gradient(45deg,
                #e0f3fa 0%,
                #d8f0fc 50%,
                #b8e2f6 51%,
                #b6dffd 100%);
          }
        }

        &:nth-child(2) {
          .top {
            background: linear-gradient(45deg, #fcfff4 0%, #e9e9ce 100%);
          }
        }

        &:nth-child(3) {
          .top {
            background: linear-gradient(45deg, #b4e391 0%, #61c419 50%, #b4e391 100%);
          }
        }
      }

      .top {
        background-color: #eae9e4;
        height: 60px;
        display: flex;
        justify-content: center;
        position: relative;

        h1 {
          padding-top: 20px;
          font-size: 15px;
        }
      }

      .circle {
        position: absolute;
        left: 50%;
        bottom: -35px;
        transform: translate(-50%, 0);
        width: 50px;
        height: 50px;
        border-radius: 40px;
        font-size: 15px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #989a8f;
        letter-spacing: 2px;
      }

      .bottom {
        margin-top: 50px;
        padding: 0 15px;
        display: flex;
        height: 150px;
        flex-direction: column;
        justify-content: space-between;

        .content-desc {
          font-size: 14px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          letter-spacing: 1px;
          text-align: justify;
          line-height: 20px;

          img {
            margin: 0;
          }
        }
      }

      .attendance-box {
        width: 100%;
        height: 40px;
        user-select: none;

        .button {
          cursor: pointer;
          height: 100%;
          padding: 5px 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          align-items: center;
          border: 1px solid green;
          text-align: center;
          color: green;
          letter-spacing: 1px;
          font-size: 14px;
          border-radius: 3px;
          cursor: pointer;
          -webkit-transition: all 0.2s;
          -moz-transition: all 0.2s;
          -ms-transition: all 0.2s;
          transition: all 0.2s;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          transition: all 0.3s;

          &:hover {
            opacity: 0.7;
          }
        }

        .have-attend {
          height: 100%;
          border: 1px solid #a0a0a0;
          color: #a0a0a0;
          padding: 5px 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          align-items: center;
          text-align: center;
          letter-spacing: 4px;
          font-size: 14px;
          border-radius: 3px;
          cursor: pointer;
        }
      }
    }

    .content-member-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 15px;

      .card {
        height: 135px;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0px 2px 8px rgba(34, 35, 58, 0.3);
        flex: 1;
        margin: 10px;
        display: flex;
        flex-direction: row;
        border-radius: 25px;
        position: relative;
        user-select: none;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          opacity: 0.9;
        }
      }

      .card h2 {
        margin: 0;
        margin-bottom: 5px;
      }

      .card .desc {
        font-size: 12px;
        line-height: 18px;
        text-align: justify;
      }

      .card .actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #8bc34a;
        cursor: pointer;
        transition: 0.5s;

        &:hover {
          color: #4caf50;
        }
      }

      .card-text {
        display: grid;
        grid-template-columns: 1fr 2fr;
      }

      .title-total {
        padding: 15px 20px 10px 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      path {
        fill: white;
      }

      .img-portada {
        width: 100%;
      }

      .portada {
        width: 100%;
        height: 135px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url(../../assets//images/private_bgc.jpg);

        p {
          font-size: 20px;
          font-weight: bold;
          color: #fff;
          letter-spacing: 3px;
          writing-mode: vertical-rl;
          text-orientation: upright;
          width: 100%;
          height: 100%;
          backdrop-filter: blur(1px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      button {
        border: none;
        background: none;
        font-size: 24px;
        color: #8bc34a;
        cursor: pointer;
        transition: 0.5s;

        &:hover {
          color: #4caf50;
          transform: rotate(22deg);
        }
      }
    }
  }
}
</style>
