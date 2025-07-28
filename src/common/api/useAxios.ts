// src/composables/useAxios.ts
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ref } from 'vue'

// 기본 axios 인스턴스 생성
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8282/api',
  timeout: 10000, // 10초 타임아웃 설정
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Composable 함수 정의
export function useAxios() {
  const globalStore = useGlobalStore()
  const error = ref<unknown>(null)

  const get = async <T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
    globalStore.isLoading = true
    error.value = null
    try {
      const response: AxiosResponse<T> = await instance.get(url, config)
      return response.data
    } catch (err) {
      error.value = err
      throw err
    } finally {
      globalStore.isLoading = false
    }
  }

  const post = async <T = any>(
    url: string,
    data?: any,
    config: AxiosRequestConfig = {},
  ): Promise<T> => {
    globalStore.isLoading = true
    error.value = null
    try {
      const response: AxiosResponse<T> = await instance.post(url, data, config)
      return response.data
    } catch (err) {
      error.value = err
      throw err
    } finally {
      globalStore.isLoading = false
    }
  }

  const put = async <T = any>(
    url: string,
    data?: any,
    config: AxiosRequestConfig = {},
  ): Promise<T> => {
    globalStore.isLoading = true
    error.value = null
    try {
      const response: AxiosResponse<T> = await instance.put(url, data, config)
      return response.data
    } catch (err) {
      error.value = err
      throw err
    } finally {
      globalStore.isLoading = false
    }
  }

  const patch = async <T = any>(
    url: string,
    data?: any,
    config: AxiosRequestConfig = {},
  ): Promise<T> => {
    globalStore.isLoading = true
    error.value = null
    try {
      const response: AxiosResponse<T> = await instance.patch(url, data, config)
      return response.data
    } catch (err) {
      error.value = err
      throw err
    } finally {
      globalStore.isLoading = false
    }
  }

  const del = async <T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
    globalStore.isLoading = true
    error.value = null
    try {
      const response: AxiosResponse<T> = await instance.delete(url, config)
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
  }
}
