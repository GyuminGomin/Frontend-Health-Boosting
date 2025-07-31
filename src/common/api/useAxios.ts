// src/composables/useAxios.ts
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ref, toRaw } from 'vue'

// 기본 axios 인스턴스 생성
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8282/api',
  timeout: 10000, // 10초 타임아웃 설정
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export function useAxios() {
  const globalStore = useGlobalStore()
  const error = ref<unknown>(null)

  // 공통 요청 처리
  const handleRequest = async <T = any>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: any,
    config: AxiosRequestConfig & { form?: Record<string, any> } = {},
  ): Promise<T> => {
    globalStore.isLoading = true
    error.value = null

    // form -> queryParams 처리
    // config에서 form1, form2처럼 전달된 모든 "form"을 params로 병합
    const anyConfig = config as any
    for (const key in config) {
      if (key.startsWith('form') && typeof anyConfig[key] === 'object') {
        const rawForm = toRaw(anyConfig[key])
        config.params = { ...(config.params || {}), ...rawForm }
        delete anyConfig[key] // 병합 후 제거
      }
    }

    try {
      const response: AxiosResponse<T> = await instance.request({
        method,
        url,
        data,
        ...config,
      })
      return response.data
    } catch (err) {
      error.value = err
      throw err
    } finally {
      globalStore.isLoading = false
    }
  }

  /**
   * 사용 예시
   *
   * get, delete
   * form : reactive
   * - await get('/user/list', { form1, form2, headers, ... })
   *
   * post, put, patch
   * - await post('/user/login', { form1, form2 }, { headers, ...})
   */

  const get = <T = any>(
    url: string,
    config: AxiosRequestConfig & { form?: Record<string, any> } = {},
  ) => handleRequest<T>('get', url, undefined, config)

  const post = <T = any>(url: string, data?: any, config: AxiosRequestConfig = {}) =>
    handleRequest<T>('post', url, data, config)

  const put = <T = any>(url: string, data?: any, config: AxiosRequestConfig = {}) =>
    handleRequest<T>('put', url, data, config)

  const patch = <T = any>(url: string, data?: any, config: AxiosRequestConfig = {}) =>
    handleRequest<T>('patch', url, data, config)

  const del = <T = any>(
    url: string,
    config: AxiosRequestConfig & { form?: Record<string, any> } = {},
  ) => handleRequest<T>('delete', url, undefined, config)

  /**
   * 사용 예시
   * await postMultipart('/signup/image-regist', {
   *   form1,
   *   form2
   * }, {
   *   image1: fileInput.value?.files?.[0] || null
   * }, {
   *   headers ...
   * })
   * @param url 백엔드 API 요청경로
   * @param formMap reactive 폼
   * @param fileMap image 파일
   * @param config
   * @returns
   */
  // 여러 개의 폼 객체(form1, form2) + 이미지 포함 전송용
  const postMultipart = async <T = any>(
    url: string,
    formMap: Record<string, any>, // ex: { form1: formDataObj1, form2: formDataObj2 }
    fileMap?: Record<string, File | null>,
    config: AxiosRequestConfig = {},
  ): Promise<T> => {
    globalStore.isLoading = true
    error.value = null

    const multiFormData = new FormData()

    for (const formKey in formMap) {
      const raw = toRaw(formMap[formKey])
      const jsonBlob = new Blob([JSON.stringify(raw)], {
        type: 'application/json',
      })
      multiFormData.append(formKey, jsonBlob)
    }

    if (fileMap) {
      for (const key in fileMap) {
        const file = fileMap[key]
        if (file) {
          multiFormData.append(key, file)
        }
      }
    }

    try {
      const response: AxiosResponse<T> = await instance.post(url, multiFormData, {
        ...config,
        headers: {
          ...(config.headers || {}),
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (err) {
      error.value = err
      throw err
    } finally {
      globalStore.isLoading = false
    }
  }

  return {
    error,
    get,
    post,
    put,
    patch,
    del,
    postMultipart,
  }
}
