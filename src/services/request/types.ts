import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface OPSRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: OPSInterceptors<T>
}

export interface OPSInterceptors<T = AxiosResponse> {
  requestSuccess?: (config: AxiosRequestConfig) => any
  requestFailure?: (err: any) => any
  responseSuccess?: (res: T) => T
  responseFailure?: (err: any) => any
}
