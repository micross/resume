import type { SearchParameters } from 'ofetch'
import type { NitroFetchRequest } from 'nitropack'

export const useAPI = {
  get: <T>(url: NitroFetchRequest, params?: SearchParameters) => {
    return useNuxtApp().$api<T>(url, { method: 'get', params })
  },

  post: <T>(url: NitroFetchRequest, body?: RequestInit['body'] | Record<string, any>) => {
    return useNuxtApp().$api<T>(url, { method: 'post', body })
  },

  patch: <T>(url: NitroFetchRequest, body?: RequestInit['body'] | Record<string, any>) => {
    return useNuxtApp().$api<T>(url, { method: 'patch', body })
  },

  put: <T>(url: NitroFetchRequest, body?: RequestInit['body'] | Record<string, any>) => {
    return useNuxtApp().$api<T>(url, { method: 'put', body })
  },

  delete: <T>(url: NitroFetchRequest, body?: RequestInit['body'] | Record<string, any>) => {
    return useNuxtApp().$api<T>(url, { method: 'delete', body })
  },
}