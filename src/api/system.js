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

//更新组织机构的一条数据记录
export const updateOrg = (orgForm) => {
  return jwtServerInstance.request({
    url: '/sysorg/update',
    method: 'post',
    data: orgForm,
  })
}

//新增一条组织机构数据记录
export const addOrg = (orgForm) => {
  return jwtServerInstance.request({
    url: '/sysorg/add',
    method: 'post',
    data: orgForm,
  })
}

//删除一条组织机构数据记录
export const deleteOrg = (orgForm) => {
  return jwtServerInstance.request({
    url: '/sysorg/delete',
    method: 'post',
    data: orgForm,
  })
}
