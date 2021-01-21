<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button @click="onClick">走你</el-button>
  </div>
</template>
<script>
export default {
  name: 'About',
  methods: {
    onClick() {
      console.log('About：', this)
    }
  },
}
</script>
