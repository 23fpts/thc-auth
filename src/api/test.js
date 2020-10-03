import { httpBinInstance, jwtLogin } from './index'

export const getHttpbinTest = (param) => {
  return httpBinInstance.request({
    url: '/get?param=' + param,
  })
}

export const jwtLoginTest = (param) => {
  return jwtLogin.request({
    method: 'post',
    url: '/authentication',
    data: param,
  })
}
