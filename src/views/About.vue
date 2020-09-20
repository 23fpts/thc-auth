<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="clickTest">测试</button>
  </div>
</template>

<script>
import { getHttpbinTest } from '@/api/test'
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
  },
}
</script>
