import { jwtServerInstance } from './index'
import { getTokenUser } from '@/lib/utils'
// 用于处理requestParam
import qs from 'qs'

//获取用户信息接口(个人中心)
export const getUserInfo = () => {
  return jwtServerInstance.request({
    url: '/sysuser/info',
    method: 'get',
    params: {
      username: getTokenUser(),
    },
  })
}

//JWT登录认证接口
export const login = (userName, passWord) => {
  return jwtServerInstance.request({
    url: '/authentication',
    method: 'post',
    data: {
      username: userName,
      password: passWord,
    },
  })
}

//JWT令牌刷新接口
export const refreshToken = () => {
  return jwtServerInstance.request({
    url: '/refreshtoken',
    method: 'get',
  })
}

//组织机构树形列表接口
export const getOrgTree = (orgQueryForm) => {
  return jwtServerInstance.request({
    url: '/sysorg/tree',
    method: 'post',
    data: qs.stringify({
      username: getTokenUser(),
      orgNameLike: orgQueryForm.name,
      orgStatus: orgQueryForm.status,
    }),
  })
}
