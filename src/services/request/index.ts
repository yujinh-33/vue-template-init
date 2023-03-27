import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { OPSRequestConfig } from './types'

class OPSRequest {
  instance: AxiosInstance

  constructor(config: OPSRequestConfig) {
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

  request<T = any>(config: OPSRequestConfig<T>) {
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

  get<T = any>(config: OPSRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: OPSRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: OPSRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: OPSRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default OPSRequest
