<template>
  <div class="footer-box">
    <!-- 相关推荐 -->
    <div class="recommend">
      <!-- 联系我 -->
      <div v-viewer class="contact-me">
        <div v-for="(item, index) in vxQunList" :key="index" class="add-wechat">
          <img :src="item.qr_code" :alt="`${item.name} 二维码`" :title="`扫描二维码添加 ${item.name}`" loading="lazy" />
          <h3>{{ item.name }}</h3>
        </div>
      </div>
      <!-- 关于我 -->
      <div class="about-me">
        <h2>社交平台</h2>
        <h3>
          <a href="https://space.bilibili.com/1616001263" target="_blank"
            rel="noopener noreferrer">哔哩哔哩</a>
        </h3>
        <h3>
          <a href="https://juejin.cn/user/2905353175184557" target="_blank" rel="noopener noreferrer">稀土掘金</a>
        </h3>
        <h3>
          <a href="https://www.zhihu.com/people/tinlike" target="_blank" rel="noopener noreferrer">个人知乎</a>
        </h3>
      </div>
      <!-- 友情链接 -->
      <div class="links">
        <div class="links-box">
          <h2>友情链接</h2>
          <h2 class="apply-links" @click="applyLinks">申请友链</h2>
        </div>
        <div class="links-box">
          <template v-for="(item, index) in links" :key="index">
            <p>
              <a :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.name }}</a>
            </p>
          </template>
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="line"></div>
    <!-- 版权声明 -->
    <div class="copyright-notice">
      <p>Copyright © 2025 红黄简历 All Rights Reserved.</p>
    </div>
    <!-- 备案号 -->
    <div class="icp-record-number">
      <p>
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">粤ICP备19123943号</a>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useLinks } from '~/composables/links';
import add_friend from '~/assets/images/add_friend.png';


// 查询微信微信群列表
const vxQunList = ref<any>([
  {
    name: '添加微信',
    qr_code: add_friend
  },
  {
    name: '关注公众号',
    qr_code: add_friend
  },
  {
    name: '用户交流群',
    qr_code: add_friend
  }
]);


const { links, loading } = useLinks();

</script>
<style lang="scss" scoped>
.footer-box {
  width: 100%;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0;

  .recommend {
    display: flex;
    padding: 20px 0;

    width: 100%;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
      color: #a3a5a7;
      font-size: 16px;
      padding-bottom: 10px;
      letter-spacing: 1px;
      font-weight: 500;
    }

    .contact-me {
      display: flex;

      img {
        width: 105px;
        height: 105px;
      }

      h3 {
        font-size: 14px;
        color: #fff;
        margin-top: 10px;
      }

      .add-wechat {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 40px;
        cursor: pointer;
        user-select: none;
      }

      .concern-zhihu {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        user-select: none;
      }
    }

    .about-me {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding-top: 30px;
      margin-right: 40px;

      h3 {
        color: #fff;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 10px;
        font-size: 14px;

        a {
          color: inherit;
          text-decoration: none;
          letter-spacing: 2px;
          transition: all 0.3s;

          &:hover {
            color: rgb(123, 238, 123);
          }
        }
      }
    }

    .links {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding-top: 30px;

      .links-box {
        display: flex;
        flex-wrap: wrap;
        max-width: 200px;

        h2 {
          margin-right: 38px;
        }

        p {
          color: #fff;
          display: flex;
          justify-content: flex-start;
          font-size: 14px;
          box-sizing: border-box;
          flex-shrink: 0;

          a {
            color: inherit;
            text-decoration: none;
            letter-spacing: 2px;
            transition: all 0.3s;
            flex-shrink: 0;
            margin: 0 20px 10px 0;

            &:hover {
              color: rgb(123, 238, 123);
            }
          }
        }

        .apply-links {
          cursor: pointer;
          transition: all 0.3s;
          margin-right: 0;

          &:hover {
            color: rgb(123, 238, 123);
          }
        }
      }
    }
  }

  .line {
    height: 1px;
    width: 650px;
    background-color: #5b5b5b;
  }

  .copyright-notice {
    margin: 15px 0;

    p {
      color: #757c88;
      font-size: 12px;
    }
  }

  .icp-record-number {
    display: flex;

    p {
      color: #757c88;
      font-size: 12px;
      display: flex;
      align-items: center;
      margin: 0 10px;

      a {
        color: inherit;
        text-decoration: none;
        letter-spacing: 2px;
        transition: all 0.3s;

        &:hover {
          color: rgb(123, 238, 123);
        }
      }
    }
  }
}
</style>
