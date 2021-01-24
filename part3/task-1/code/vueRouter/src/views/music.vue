<style scoped>
.music-view {
  margin-top: 30px;
}
</style>
<template>
  <section class="music">
    <el-button-group>
      <el-button type="primary" icon="el-icon-edit">
        <router-link to="/music/list">音乐列表</router-link>
      </el-button>
      <el-button type="primary" icon="el-icon-share">
        <router-link to="/music/detail">音乐详情</router-link>
      </el-button>
    </el-button-group>
    <!-- <section class="music-view">
      <router-view></router-view>
    </section> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>