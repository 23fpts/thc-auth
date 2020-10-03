<template>
  <el-menu
    class="el-menu-vertical"
    :default-active="$store.state.maintabs.activeRoute"
    :unique-opened="uniqueOpened"
    :collapse="isMenuCollapse"
  >
    <div class="menu-top">
      <!-- <img src="../../assets/logo.png" style="height: 60px;"> -->
      <div class="sys-name">thc</div>
    </div>
    <template v-for="menu in menuList">
      <el-submenu :index="menu.path" :key="menu.id" v-if="menu.id">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.name }}</span>
        </template>

        <router-link
          v-for="item in menu.children"
          :key="item.id"
          :to="item.path"
        >
          <el-menu-item :index="item.path" :key="item.id">
            <i :class="item.icon"></i>
            {{ item.name }}
          </el-menu-item>
        </router-link>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
//这一行表示将vuex中的所有mutations映射过来
// import { mapMutations } from 'vuex'
export default {
  name: 'layout-menu',
  computed: {
    menuList() {
      return this.$store.state.maintabs.menuList
    },
  },
  data() {
    return {
      uniqueOpened: true,
      //   menuList: [
      //     {
      //       id: 1,
      //       name: '系统管理',
      //       path: '/system',
      //       icon: 'el-icon-lock',
      //       children: [
      //         { id: 3, name: '用户管理', path: '/home/sysuser' },
      //         { id: 4, name: '角色管理', path: '/home/sysrole' },
      //       ],
      //     },
      //     {
      //       id: 2,
      //       name: '订单管理',
      //       path: '/order',
      //       icon: 'el-icon-eleme',
      //       children: [{ id: 5, name: '订单详情', path: '/home/order' }],
      //     },
      //   ],
    }
  },
  methods: {
    //从映射中引入，setActiveRoute和addTab这两个mutations函数。（上文定义的）
    // ...mapMutations(['setActiveRoute', 'addTab']),
    // showTab(name, path) {
    //   this.setActiveRoute(path)
    //   this.addTab(path)
    // },
  },
  //   预留了一个props接收父组件的数据，用于控制“展开”与“收起”状态，是Boolean类型。
  props: {
    isMenuCollapse: {
      type: Boolean,
    },
  },
}
</script>

<style>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
