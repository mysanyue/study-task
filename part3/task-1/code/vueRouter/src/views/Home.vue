<template>
  <div class="home">
    <h1>这里是首页</h1>
    <img alt="Vue logo" src="../assets/logo.png">
    <el-button @click="onClick">打印console.log</el-button>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    return {
      name: '李斯'
    }
  },
  methods: {
    onClick() {
      this.chart = Promise.reject('Error')
      console.log('window.vm: ', window.vm)
      console.log('Home：', this)
    }
  },
  components: {
    HelloWorld
  }
}
</script>
