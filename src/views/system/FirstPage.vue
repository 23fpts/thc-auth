<template>
  <div class="firstPage">
    firstPage
  </div>
</template>

<script>
import {pwdIsDefault} from '@/api/system'
export default {
  name: "FirstPage",
  created:function(){
    pwdIsDefault().then(res => {
      console.log(res)
      if(res.success && res.data){//表示正在使用默认密码
        this.$confirm("您仍在使用系统初始化密码，建议您去修改", '提示', {
          confirmButtonText: '现在就去',
          cancelButtonText: '以后再说',
          type: 'warning'
        }).then(_ => { //现在就去
          this.$router.push({name:"personal"})  //路由到个人中心修改密码
        });
      }
    })
  }
}
</script>
