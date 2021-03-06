import Vue from 'vue'
import VueRouter from 'vue-router'

import systemRoutes from './modules/system'

import { refreshToken } from '@/api/system'
import { setJwtToken } from '@/lib/utils'

import store from '@/store/index'

//导入NProgress进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

// NavigationDuplicated: Avoided redundant navigation to current location: "/home/personal".
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...systemRoutes], // ... 代表在数组后面再加上sysRoutes这个数组
})
// to代表到哪去、from代表从哪来、next()是一个函数表示用户下一部路由动作
// 用户每换一个界面或组件，更新一次令牌。（这个操作还可以优化，比如：多长时间窗口内，不做更新令牌的操作）
// NProgress是页面跳转是出现在浏览器顶部的进度条
router.beforeEach((to, from, next) => {
  NProgress.start() //第一行
  refreshToken().then((res) => {
    // 没有获得新的token==null，
    // 表示旧的token已经失效，需要重新登录
    if (res.data == null && to.name !== 'login') {
      next({ name: 'login' }) // 去登录界面
      setJwtToken('') // 清空token
    } else {
      // 否则去你想去的界面，并把新的token保存起来
      // 进入前先加载配置
      // 执行了action之后，进入then方法（返回了Promise并且resolve()）。也就是或异步数据加载完成之后才next()到路由对应的组件。
      store.dispatch('loadSysConfig').then(_ => {
        next()
      })
      setJwtToken(res.data)
      // next()
    }
  })
})

// 不管是通过浏览器输入地址、还是点击“菜单”，最终都提现到路由发生了改变。
// 所以我选择全局路由回调函数afterEach，该回调方法在路由跳转完成之后被调用。
// 同时解决了tab切换了路由还没有切换的问题，即：路由跳转完成之后才显示Tab导航项。
// 因为vue官方明确建议：使用action去做异步操作，所以commit换成dispatch。
router.afterEach((to) => {
  // store.commit('addTab', to.path)
  store.dispatch('addTab', to.path)
  NProgress.done() //最后一样
})

export default router
