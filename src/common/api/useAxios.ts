// src/composables/useAxios.ts
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import Swal from 'sweetalert2'
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

  // Swal 중복 방지
  const showError = async (title: string, message: string) => {
    await Swal.fire({
      icon: 'error',
      title,
      text: message,
    })
  }

  // 공통 요청 처리
  const handleRequest = async <T = any>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    data?: any,
    config: AxiosRequestConfig & { form?: Record<string, any> } = {},
  ): Promise<T | undefined> => {
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

      // 백엔드에서 RuntimeException 발생
      if (response.data && (response.data as any).error) {
        await Swal.fire({
          icon: 'info',
          title: '알림',
          text: (response.data as any).message,
        })
        return
        // 상위로 에러를 보내서 핸들링을 하고 싶다면 생성
        // throw new Error((response.data as any).message)
      }

      return response.data
    } catch (err: any) {
      if (err.response) {
        const status = err.response?.status
        const message = err.response?.data?.message || '서버 오류가 발생했습니다.'
        const currentEnv = import.meta.env.VITE_ENV || 'prod'

        if (status === 400) {
          await showError('잘못된 요청', message)
        } else if (status === 401) {
          await showError('인증실패', '로그인 정보가 유효하지 않습니다. 다시 로그인해 주세요.')

          // 인증 실패 시, 로그아웃 처리 및 로그인 페이지 이동
          // globalStore.logout()
          // router.push('/login')
        } else if (status === 403) {
          await showError('권한 없음', '해당 기능을 사용할 권한이 없습니다.')
        } else if (status >= 500) {
          if (currentEnv === 'dev') {
            await showError('서버 오류', message)
          } else {
            await showError(
              '서버 오류',
              '서버에서 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
            )
          }
        } else if (err.code === 'ECONNABORTED') {
          await showError('네트워크 지연', '서버 연결이 지연되고 있습니다. 다시 시도해주세요.')
        } else if (!err.response) {
          await showError('서버 연결 실패', '서버에 연결할 수 없습니다.')
        }
      }
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
