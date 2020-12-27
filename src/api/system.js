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

//-------------------------- org ---------------------------------

// 组织机构树形列表接口
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

//=====================api接口管理接口开始========================
//完整接口树形列表接口
export const getApiTree = (apiQueryForm) => {
  return jwtServerInstance.request({
    url: '/sysapi/tree',
    method: 'post',
    data: qs.stringify({
      apiNameLike: apiQueryForm.name,
      apiStatus: apiQueryForm.status,
    }),
  })
}

//更新sys_api的一条数据记录
export const updateApi = (apiForm) => {
  return jwtServerInstance.request({
    url: '/sysapi/update',
    method: 'post',
    data: apiForm,
  })
}

//新增一条sys_api数据记录
export const addApi = (apiForm) => {
  return jwtServerInstance.request({
    url: '/sysapi/add',
    method: 'post',
    data: apiForm,
  })
}

//删除一条sys_api数据记录
export const deleteApi = (apiForm) => {
  return jwtServerInstance.request({
    url: '/sysapi/delete',
    method: 'post',
    data: apiForm,
  })
}

//获取api树形结构数据（带勾选节点和默认展开节点）
export const getApiCheckedTree = (roleId) => {
  return jwtServerInstance.request({
    url: '/sysapi/checkedtree',
    method: 'post',
    data: qs.stringify({
      roleId: roleId,
    }),
  })
}

//保存api树勾选节点(checkedId是一个数字型数组)
export const saveApiCheckedKeys = (roleId, checkedIds) => {
  return jwtServerInstance.request({
    url: '/sysapi/savekeys',
    method: 'post',
    data: {
      roleId: roleId,
      checkedIds: checkedIds,
    },
  })
}

// =====================menu菜单管理接口开始========================
// 完整菜单树形列表接口
export const getMenuTree = (menuQueryForm) => {
  return jwtServerInstance.request({
    url: '/sysmenu/tree',
    method: 'post',
    data: qs.stringify({
      menuNameLike: menuQueryForm.name,
      menuStatus: menuQueryForm.status,
    }),
  })
}

//更新菜单的一条数据记录
export const updateMenu = (menuForm) => {
  return jwtServerInstance.request({
    url: '/sysmenu/update',
    method: 'post',
    data: menuForm,
  })
}

//新增一条菜单数据记录
export const addMenu = (menuForm) => {
  return jwtServerInstance.request({
    url: '/sysmenu/add',
    method: 'post',
    data: menuForm,
  })
}

//删除一条菜单数据记录
export const deleteMenu = (menuForm) => {
  return jwtServerInstance.request({
    url: '/sysmenu/delete',
    method: 'post',
    data: menuForm,
  })
}

//获取菜单树形结构数据（带勾选节点和默认展开节点）
export const getMenuCheckedTree = (roleId) => {
  return jwtServerInstance.request({
    url: '/sysmenu/checkedtree',
    method: 'post',
    data: qs.stringify({
      //RequestParam
      roleId: roleId,
    }),
  })
}

//保存菜单树勾选节点(checkedIds是一个数字型数组)
export const saveMenuCheckedKeys = (roleId, checkedIds) => {
  return jwtServerInstance.request({
    url: '/sysmenu/savekeys',
    method: 'post',
    data: {
      //RequestBody
      roleId: roleId,
      checkedIds: checkedIds,
    },
  })
}

//根据登录用户名加载该用户可以访问的菜单
export const getMenuTreeByUsername = () => {
  return jwtServerInstance.request({
    url:'/sysmenu/tree/user',
    method:'post',
    data:qs.stringify({
      username: getTokenUser()  //从JWT中获取用户名
    })
  })
}

//=====================role 角色管理接口开始========================
//角色列表查询接口
export const getRoles = (roleLike) => {
  return jwtServerInstance.request({
    url: '/sysrole/query',
    method: 'post',
    data: qs.stringify({
      roleLike: roleLike,
    }),
  })
}

//更新sys_role的一条数据记录
export const updateRole = (roleForm) => {
  return jwtServerInstance.request({
    url: '/sysrole/update',
    method: 'post',
    data: roleForm,
  })
}

//新增一条sys_api数据记录
export const addRole = (roleForm) => {
  return jwtServerInstance.request({
    url: '/sysrole/add',
    method: 'post',
    data: roleForm,
  })
}

//删除一条sys_role数据记录
export const deleteRole = (roleId) => {
  return jwtServerInstance.request({
    url: '/sysrole/delete',
    method: 'post',
    data: qs.stringify({
      roleId: roleId,
    }),
  })
}


//=====================user 用户管理接口开始========================
//用户列表查询接口，userQueryform和pagination作为参数(上文)
export const getUsers = (queryform, pagination) => {
  return jwtServerInstance.request({
    url:'/sysuser/query',
    method:'post',
    data:qs.stringify({
      orgId: queryform.orgId,
      username: queryform.username,
      phone: queryform.phone,
      email: queryform.email,
      enabled: queryform.enabled,
      createStartTime: queryform.timeRange[0],
      createEndTime: queryform.timeRange[1],
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })
  })
}

//更新sys_user的一条数据记录
export const updateUser = (userForm) => {
  return jwtServerInstance.request({
    url:'/sysuser/update',
    method:'post',
    data:userForm
  })
}

//新增一条sys_user数据记录
export const addUser = (userForm) => {
  return jwtServerInstance.request({
    url:'/sysuser/add',
    method:'post',
    data:userForm
  })
}

//删除一条sys_user数据记录
export const deleteUser = (userId) => {
  return jwtServerInstance.request({
    url:'/sysuser/delete',
    method:'post',
    data:qs.stringify({
      userId:userId
    })
  })
}

//获取被勾选的角色和所有角色列表
export const getCheckedRoles = (userId) => {
  return jwtServerInstance.request({
    url:'/sysrole/checkedroles',
    method:'post',
    data:qs.stringify({
      userId:userId
    })
  })
}
//保存用户角色(实际是用户管理的功能)
export const saveCheckedUserRoles = (userId,checkedIds) => {
  return jwtServerInstance.request({
    url:'/sysrole/savekeys',
    method:'post',
    data:{
      userId:userId,
      checkedIds:checkedIds
    }
  })
}

//重置用户密码
export const resetUserPwd = (userId) => {
  return jwtServerInstance.request({
    url:'/sysuser/pwd/reset',
    method:'post',
    data:qs.stringify({
      userId:userId
    })
  })
}

//判断当前用户是否仍在使用默认密码，没做修改
export const pwdIsDefault = () => {
  return jwtServerInstance.request({
    url:'/sysuser/pwd/isdefault',
    method:'post',
    data:qs.stringify({
      username:getTokenUser()
    })
  })
}

//修改密码
export const changeUserPwd = (oldPass,newPass) => {
  return jwtServerInstance.request({
    url:'/sysuser/pwd/change',
    method:'post',
    data:qs.stringify({
      username:getTokenUser(),
      oldPass:oldPass,
      newPass:newPass
    })
  })
}

// ==================系统配置====================================
//全局配置参数管理
export const getAllSysConfig = () => {
  return jwtServerInstance.request({
    url:'/sysconfig/all',
    method:'post'
  })
}

//刷新数据库全局配置到服务端内存
//并再次加载全局配置参数到前端
export const refreshSysConfig = () => {
  return jwtServerInstance.request({
    url:'/sysconfig/refresh',
    method:'post'
  })
}


//参数配置列表查询接口
export const getConfigs = (configLike) => {
  return jwtServerInstance.request({
    url:'/sysconfig/query',
    method:'post',
    data:qs.stringify({
      configLike:configLike
    })
  })
}

//更新sys_role的一条数据记录
export const updateConfig = (configForm) => {
  return jwtServerInstance.request({
    url:'/sysconfig/update',
    method:'post',
    data:configForm
  })
}

//新增一条sys_role数据记录
export const addConfig = (configForm) => {
  return jwtServerInstance.request({
    url:'/sysconfig/add',
    method:'post',
    data:configForm
  })
}

//删除一条sys_role数据记录
export const deleteConfig = (configId) => {
  return jwtServerInstance.request({
    url:'/sysconfig/delete',
    method:'post',
    data:qs.stringify({
      configId:configId
    })
  })
}


//=====================数据字典管理========================
//查询所有数据字典项
export const getAllSysDict = () => {
  return jwtServerInstance.request({
    url:'/sysdict/all',
    method:'post'
  })
}

//参数配置列表查询接口
export const getDicts = (dictLike) => {
  return jwtServerInstance.request({
    url:'/sysdict/query',
    method:'post',
    data:qs.stringify({
      dictLike:dictLike
    })
  })
}

//更新sys_dict的一条数据记录
export const updateDict = (dictForm) => {
  return jwtServerInstance.request({
    url:'/sysdict/update',
    method:'post',
    data:dictForm
  })
}

//新增一条sys_dict数据记录
export const addDict = (dictForm) => {
  return jwtServerInstance.request({
    url:'/sysdict/add',
    method:'post',
    data:dictForm
  })
}

//删除一条sys_config数据记录
export const deleteDict = (dictId) => {
  return jwtServerInstance.request({
    url:'/sysdict/delete',
    method:'post',
    data:qs.stringify({
      id:dictId
    })
  })
}