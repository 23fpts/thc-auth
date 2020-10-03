<template>
  <div class="login">
    <el-form class="login-form">
      <h3 class="title">thc</h3>

      <!-- 错误展示 -->
      <el-alert
        :title="loginForm.errorMsg"
        type="error"
        v-show="loginForm.errorVisible"
      >
      </el-alert>

      <el-form-item>
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
        >
        </el-input>
      </el-form-item>

      <el-form-item style="width:100%;">
        <el-button
          @click="userpwdLogin"
          size="medium"
          type="primary"
          style="width:100%;"
        >
          <span>登 录</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/system'
import { setJwtToken } from '@/lib/utils'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        errorMsg: '',
        errorVisible: false,
      },
    }
  },
  created() {},
  methods: {
    userpwdLogin() {
      login(this.loginForm.username, this.loginForm.password)
        .then((res) => {
          console.log(res)
          // 取得响应的令牌
          setJwtToken(res.data)
          // this.$router.push({ name: 'home' })
          // 那就是当配置了默认子路由的情况下，父路由配置不能有name属性，
          this.$router.push('home')
        })
        .catch((err) => {
          console.log(err)
          this.loginForm.errorMsg = err.message
          this.loginForm.errorVisible = true
        })
    },
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  //   background-image: url("../assets/img/login-bg.jpg");
  background-color: aqua;
  background-size: cover;
}
.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
}
</style>
