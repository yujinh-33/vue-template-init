import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { YRequestConfig } from './types'

class YRequest {
  instance: AxiosInstance

  constructor(config: YRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config) => config,
      (err) => err
    )

    this.instance.interceptors.response.use(
      (res) => res.data,
      (err) => err
    )

    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccess,
      config.interceptors?.requestFailure
    )

    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccess,
      config.interceptors?.responseFailure
    )
  }

  request<T = any>(config: YRequestConfig<T>) {
    if (config.interceptors?.requestSuccess) {
      config = config.interceptors.requestSuccess(config)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance.request<any, T>(config).then((res) => {
        if (config.interceptors?.responseSuccess) {
          res = config.interceptors.responseSuccess(res)
        }

        resolve(res)
      })
    })
  }

  get<T = any>(config: YRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: YRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: YRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: YRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default YRequest
