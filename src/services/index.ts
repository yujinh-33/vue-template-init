import YRequest from './request'
import { URL, TIMEOUT } from './config'

export const yRequest = new YRequest({
  baseURL: URL,
  timeout: TIMEOUT,
})
