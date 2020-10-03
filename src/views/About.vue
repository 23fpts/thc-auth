<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="clickTest">测试</button>
    <button @click="clickTest2">测试2</button>
  </div>
</template>

<script>
import { getHttpbinTest, jwtLoginTest } from '@/api/test'
export default {
  methods: {
    clickTest() {
      getHttpbinTest('hello')
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //
    clickTest2() {
      jwtLoginTest({
        username: 'admin',
        password: '123456',
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
