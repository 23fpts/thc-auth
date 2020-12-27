// 内部定义与“系统管理状态”相关的状态管理代码。最后导出。
//getAllSysDict是数据字典api接口
import { getAllSysConfig, refreshSysConfig, getAllSysDict } from '@/api/system'
//后面会用到axios.all,所以引入
import axios from 'axios'

const state = {
  sysconfig: [], //全局参数配置对象
  sysdict: [], //新加入的数据字典对象数据
}
const actions = {
  loadSysConfig({ state }) {
    //加载全局配置参数(异步操作，在action里面定义)
    //返回一个promise，方便调用该方法之后的下一步操作（参看下文调用时机选择）
    return new Promise((resolve, reject) => {
      //没加载过才加载，已经加载过就不加载了
      //也就说只有登录，或者浏览器页面刷新时才重新加载全局配置
      if (state.sysconfig.length <= 0 || state.sysdict.length <= 0) {
        // getAllSysConfig().then((res) => {
        //   state.sysconfig = res.data
        // })
        axios.all([getAllSysConfig(), getAllSysDict()]).then(
          axios.spread(function(res1, res2) {
            // 两个请求都执行完成后，进入该函数
            state.sysconfig = res1.data
            state.sysdict = res2.data
          })
        )
      }
      resolve() //表示回调promise的then方法。
    })
  },
  refreshConfig({ state }) {
    //return Promise方便使用then方法，进行用户信息提示
    return new Promise((resolve, reject) => {
      refreshSysConfig().then((res) => {
        console.log(res.data)
        state.sysconfig = res.data
        resolve() // 表示执行后续Promise的then方法
      })
    })
  },
}
const mutations = {}
const getters = {
  // 根据paramKey获取paramValue，工具方法
  getSysConfigItem: (state) => (paramKey) => {
    return state.sysconfig.find((item) => item.paramKey === paramKey).paramValue
  },
  //根据groupCode和itemValue查找itemName
  getSysDictName:(state) => (groupCode, itemValue) => {
    return state.sysdict
      .find(item => {
        return (item.groupCode === groupCode   //groupCode一致
        && item.itemValue === String(itemValue))   //itemValue一致
      }).itemName
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
}
