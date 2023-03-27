import OPSRequest from './request'
import { URL, TIMEOUT } from './config'

export const yRequest = new OPSRequest({
  baseURL: URL,
  timeout: TIMEOUT,
})
