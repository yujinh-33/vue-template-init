import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface YRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YInterceptors<T>
}

export interface YInterceptors<T = AxiosResponse> {
  requestSuccess?: (config: AxiosRequestConfig) => any
  requestFailure?: (err: any) => any
  responseSuccess?: (res: T) => T
  responseFailure?: (err: any) => any
}
