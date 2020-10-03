<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人中心</span>
      </div>
      <el-row style="margin: 5px">
        <el-col :span="12">用户名：</el-col>
        <el-col :span="12">{{ username }}</el-col>
      </el-row>
      <el-row style="margin: 5px">
        <el-col :span="12">电 话： </el-col>
        <el-col :span="12">{{ phone }}</el-col>
      </el-row>
      <el-row style="margin: 5px">
        <el-col :span="12">email：</el-col>
        <el-col :span="12">{{ email }}</el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/system' // 获取用户信息
export default {
  name: 'PersonalCenter',
  data() {
    return {
      username: '',
      phone: '',
      email: '',
    }
  },
  // 在路由跳转之前就将数据加载完成:beforeRouteEnter 。
  // 可以有效避免由于页面渲染快于数据加载导致的页面闪烁空白的问题。
  beforeRouteEnter(to, from, next) {
    getUserInfo().then((res) => {
      next((vm) => vm.setData(res))
    })
  },
  methods: {
    setData(userinfo) {
      if (userinfo.success) {
        this.username = userinfo.data.username
        this.phone = userinfo.data.phone
        this.email = userinfo.data.email
      }
    },
  },
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin: 20px;
  width: 300px;
}
</style>
