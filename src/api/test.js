import { httpBinInstance } from './index'

export const getHttpbinTest = (param) => {
  return httpBinInstance.request({
    url: '/get?param=' + param,
  })
}
