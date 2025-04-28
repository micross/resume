// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-04-28',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', '@element-plus/nuxt', 'nuxt-lucide-icons'],
  css: [
    'element-plus/theme-chalk/el-scrollbar.css' // 必须引入样式
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      extensions: ['.vue']
    },
  ],
  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:5800',
      maxUserResume: 4,
      isEmailVerify: true,
      aiModel: 'glm-4-flash',
      mostIntegralComment: 5
    }
  },
  lucide: {
    namePrefix: 'Icon'
  },
  app: {
    head: {
      title: '红黄简历 | 开源免费AI简历生成器 | 智能诊断+极速导出 | PDF/JSON/Word多格式支持',
      meta: [
        {
          name: 'keywords',
          content: '开源免费AI简历生成器,AI简历生成,免费简历制作工具,PDF简历导出,JSON简历模板,deepseek简历优化,AI智能润色简历,AI简历诊断'
        },
        {
          name: 'description',
          content: '红黄简历：开源免费AI简历生成器，一键导出高清PDF/JSON格式，AI智能润色，AI智能简历诊断，快速生成专业简历模板，100%免费！'
        }
      ],
      script: [
				{ src: '/iconfont/iconfont.js', type: "text/javascript" }
			]
    }
  },
  nitro: {
    preset: 'bun'
  }
})