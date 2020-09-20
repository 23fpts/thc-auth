import { httpBinInstance } from './index'

export const getHttpBinTest = (param) => {
  return httpBinInstance.request({
    url: '/get?param=' + param,
  })
}
