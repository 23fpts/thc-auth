// menuList是我们自己造的菜单数据，之前我们把它在LayoutMenu里面写死的。
// 现在我们把它挪到state里面来，因为menuList数据被多个组件使用，并且需要异步加载。
const state = {
  // 存放{ route: 路由路径, name: tab显示名称}对象数组
  maintabs: [{ route: '/home/firstpage', name: '首页', closable: false }],
  // 当前被激活显示的那个Tab内容对应的route activeRoute用来表示多个tab，哪一个处于激活显示状态。用router来做唯一标识。
  activeRoute: '/home/firstpage',
  menuList: [
    {
      name: '非菜单路由,但是需要显示Tab,请定义在这里',
      children: [{ name: '个人中心', path: '/home/personal' }],
    },
    {
      id: 1,
      name: '系统管理',
      path: '/system',
      icon: 'el-icon-lock',
      children: [
        { id: 3, name: '用户管理', path: '/home/sysuser' },
        { id: 4, name: '角色管理', path: '/home/sysrole' },
        { id: 6, name: '组织管理', path: '/home/sysorg' },
        { id: 7, name: '菜单管理', path: '/home/sysmenu' },
      ],
    },
    {
      id: 2,
      name: '订单管理',
      path: '/order',
      icon: 'el-icon-eleme',
      children: [{ id: 5, name: '订单详情', path: '/home/order' }],
    },
  ],
  addTabName: '',
}

// mutations是用来修改state的。
//
const mutations = {
  // 用来设置当前激活tab的route，点击菜单的时候调用
  setActiveRoute(state, route) {
    state.activeRoute = route
  },
  // 用来向TAB中加入新的选项卡，也在点击菜单的时候调用。
  // some 是数组操作函数用来判断某个数组中是否包含某个元素。如果包含了就不再重复添加。
  addTab(state, route) {
    let isAlreadyIn = state.maintabs.some((item) => item.route === route)
    this.commit('findMenuNameByRoute', route)
    // 一般情况下setActiveRote和add是一起用所以写在一起了
    state.activeRoute = route
    if (!isAlreadyIn && state.addTabName !== '') {
      state.maintabs.push({ route: route, name: state.addTabName })
    }
  },
  // 在用户点击TAB的‘x’号时候触发，但是首页是不能被关闭的。
  // filter函数式数组过滤函数，过滤掉被关闭的那一项，剩下的就是应该保留的TAB。
  // 并设置activeRoute为maintabs的最后一个标签页的route。
  removeTab(state, route) {
    if (route !== '/home/firstpage') {
      state.maintabs = state.maintabs.filter((item) => item.route !== route)
      state.activeRoute = state.maintabs[state.maintabs.length - 1].route
    }
  },
  // 根据route路径在menuList中查找它的名字。
  // 比如：根据"/home/sysuser"找到的就是“用户管理”。
  // 并把它保存在addTabName ，因为mutation是函数不能有返回值。
  // 我们的菜单与TAB导航协调配合的唯一标识就是route路径，所以四个mutations的参数都是route路径
  findMenuNameByRoute(state, route) {
    let findOne
    for (let i in state.menuList) {
      let tmpArr = state.menuList[i].children.filter(
        (item) => item.path === route
      )
      if (tmpArr.length > 0) {
        findOne = tmpArr[0]
        break
      }
    }
    state.addTabName = findOne ? findOne.name : ''
  },
}
export default {
  state,
  mutations,
}
