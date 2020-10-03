import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import FirstPage from '@/views/system/FirstPage'

const menuRouter = [
  { path: '', redirect: 'firstpage' },
  // 首页
  {
    name: 'firstpage',
    path: 'firstpage',
    component: FirstPage, //这里需要先import组件，代码省略
  },
  {
    name: 'sysuser',
    path: 'sysuser',
    component: () => import('@/views/system/SystemUser.vue'),
  },
  {
    name: 'sysrole',
    path: 'sysrole',
    component: () => import('@/views/system/SystemRole.vue'),
  },
  {
    name: 'personal',
    path: 'personal',
    component: () => import('@/views/system/PersonalCenter.vue'),
  },
  {
    name: 'sysorg',
    path: 'sysorg',
    component: () => import('@/views/system/SystemOrg.vue'),
  },
]

export default [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    // name: 'home',
    component: Home,
    children: [...menuRouter],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
]
