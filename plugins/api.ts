import { ElMessage } from 'element-plus';
import type { FetchResponse } from 'ofetch'

export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie('token');

  const handleError = <T>(response: FetchResponse<T> & FetchResponse<ResponseType>) => {
    const err = (text: string) => {
      ElMessage.error(text);
    }
    if (!response._data) {
      err('请求超时，服务器无响应！')
      return
    }
    const handleMap: { [key: number]: () => void } = {
      404: () => err('服务器资源不存在'),
      500: () => err('服务器内部错误'),
      403: () => err('没有权限访问该资源'),
      401: async () => {
        err('登录状态已过期，需要重新登录')
        await nuxtApp.runWithContext(() => navigateTo('/'))
      },
    }
    handleMap[response.status] ? handleMap[response.status]() : err('未知错误！')
  }

  const api = $fetch.create({
    baseURL: useRuntimeConfig().public.apiBase,
    onRequest({ request, options, error }) {
      if (token.value) {
        options.headers.set('Authorization', `Bearer ${token.value}`)
      }
    },
    onResponse({ response }) {
      if (response.headers.get('content-disposition') && response.status === 200) {
        return response;
      }
      return response._data
    },
    async onResponseError({ response }) {
      handleError(response)
      return Promise.reject(response?._data ?? null)
    },
  });


  const streamRequest = (
    url: string,
    data: any,
    onMessage: (chunk: string | object) => void,
    onError: (error: any) => void,
    onComplete?: () => void // 新增完成回调
  ): AbortController => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`${useRuntimeConfig().public.apiBase}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`
      },
      body: JSON.stringify(data),
      signal
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (reader) {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                onComplete?.(); // 流式传输结束时触发完成回调
                break;
              }
              const chunk = decoder.decode(value);
              onMessage(chunk);
            }
          } catch (error) {
            onError(error);
          }
        }
      })
      .catch((error) => {
        onError(error);
      });

    return controller;
  };

  return {
    provide: {
      api,
      streamRequest
    }
  }
})
